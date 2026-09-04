import { GoogleAuth } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';

const AUDIO_DIR = path.resolve('malditos_phrasal');
const OUTPUT_FILE = path.resolve('phrasal_verbs_data.json');
const TEXT_OUTPUT_FILE = path.resolve('phrasal_verbs_knowledge.txt');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function getFileId(filename) {
  const m = filename.match(/Phrasal_verbs_(\d+)\.mp3/i);
  return m ? parseInt(m[1], 10) : 0;
}

async function main() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();

  console.log(`[INIT] Project: ${projectId}`);

  // 1. Get all audio files and sort numerically
  const files = fs
    .readdirSync(AUDIO_DIR)
    .filter(f => f.toLowerCase().endsWith('.mp3'))
    .sort((a, b) => getFileId(a) - getFileId(b));

  console.log(`[INIT] Found ${files.length} audio files (ID 1 to ${getFileId(files[files.length - 1])}).`);

  // 2. Load existing progress
  const dataMap = new Map();
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
      if (Array.isArray(existing)) {
        for (const item of existing) {
          item.id = getFileId(item.file_name);
          dataMap.set(item.file_name, item);
        }
      }
      console.log(`[INIT] Loaded ${dataMap.size} previously saved files.`);
    } catch (e) {
      console.warn('[WARN] Could not parse existing output file, starting fresh.');
    }
  }

  const promptTemplate = (fileId, fileName) => `
Listen to this English audio file from a Phrasal Verbs audio course.
The track is either:
A) A bilingual drill exercise (Spanish prompt -> English sentence), OR
B) A short story, dialogue or narrative passage illustrating phrasal verbs in context.

Return a valid JSON object matching this schema:
{
  "id": ${fileId},
  "file_name": "${fileName}",
  "phrasal_verb": "the main phrasal verb or topic (e.g. 'go up', or 'climb up', or 'Story: A man walks into a bar')",
  "base_verb": "the root verb (e.g. 'go', 'climb', or null if mixed story)",
  "particle": "the preposition/particle (e.g. 'up', 'in', or null if mixed)",
  "meaning_es": "clear explanation of meaning in Spanish",
  "situation": "practical category (e.g. 'Movimiento y Lugares', 'Trabajo y Negocios', 'Viajes y Transporte', 'Vida Cotidiana', 'Relaciones y Emociones')",
  "tags_es": ["search keywords in Spanish representing ideas, synonyms or context"],
  "intro_note": "intro note or context",
  "type": "drill" or "story",
  "drills": [
    {
      "order": 1,
      "es": "Spanish prompt or Spanish translation of the sentence",
      "en": "English sentence for the student to practice speaking / shadowing"
    }
  ]
}

CRITICAL RULES:
1. The "drills" array must NEVER be empty.
2. If it is a story or narrative in English, break the story into its sequential sentences for 'en' and provide clear Spanish translations for 'es' so the student can practice shadowing sentence-by-sentence.
3. Return ONLY pure valid JSON without markdown fences.
`;

  const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-2.5-flash:generateContent`;

  let processedCount = 0;
  const pendingFiles = files.filter(f => {
    const item = dataMap.get(f);
    // Process if not present OR if previous run returned 0 drills or null verb
    return !item || !item.phrasal_verb || !item.drills || item.drills.length === 0;
  });

  console.log(`[STATUS] Total files: ${files.length} | Completed with drills: ${files.length - pendingFiles.length} | Pending to process: ${pendingFiles.length}`);

  for (let i = 0; i < pendingFiles.length; i++) {
    const file = pendingFiles[i];
    const fileId = getFileId(file);
    const filePath = path.join(AUDIO_DIR, file);

    const audioData = fs.readFileSync(filePath);
    const base64Audio = audioData.toString('base64');

    let success = false;
    let retries = 0;
    const maxRetries = 3;

    while (!success && retries < maxRetries) {
      try {
        console.log(`[${i + 1}/${pendingFiles.length}] (Audio #${fileId}) Processing ${file}...`);
        
        const res = await client.request({
          url,
          method: 'POST',
          data: {
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    inlineData: {
                      mimeType: 'audio/mp3',
                      data: base64Audio,
                    },
                  },
                  { text: promptTemplate(fileId, file) },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          },
          signal: AbortSignal.timeout(45000), // 45s timeout for longer audios
        });

        const text = res.data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(text);
        parsed.id = fileId;
        parsed.file_name = file;

        dataMap.set(file, parsed);
        success = true;
        processedCount++;

        // Save progress immediately
        const currentList = Array.from(dataMap.values()).sort((a, b) => a.id - b.id);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(currentList, null, 2), 'utf8');

        console.log(`  -> [OK] #${parsed.id} ${parsed.phrasal_verb} [${parsed.type || 'drill'}] (${parsed.drills?.length || 0} drills)`);

        // 1 second pause to respect quotas
        await sleep(1000);
      } catch (err) {
        retries++;
        const errMsg = err.response?.data?.error?.message || err.message;
        console.warn(`  [RETRY ${retries}/${maxRetries}] #${fileId} ${file}: ${errMsg}`);
        await sleep(retries * 3000);
      }
    }

    if (!success) {
      console.error(`  [FAILED] #${fileId} ${file} could not be processed after ${maxRetries} attempts.`);
    }
  }

  // Generate Knowledge text file
  const finalList = Array.from(dataMap.values()).sort((a, b) => a.id - b.id);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalList, null, 2), 'utf8');
  generateKnowledgeText(finalList, TEXT_OUTPUT_FILE);

  console.log(`\n========================================`);
  console.log(`FINISHED! Total units in database: ${finalList.length} / ${files.length}`);
  console.log(`========================================`);
}

function generateKnowledgeText(items, outPath) {
  let lines = [];
  lines.push('# REPOSITORIO MAESTRO DE PHRASAL VERBS (CONQUER ENGLISH)');
  lines.push('Este archivo contiene el índice y los ejercicios bilingües de shadowing (Español -> Inglés).');
  lines.push('Total de unidades: ' + items.length);
  lines.push('');
  lines.push('## ÍNDICE RÁPIDO');
  for (const item of items) {
    lines.push(`- #${item.id} | ${item.phrasal_verb} | ${item.meaning_es} | Situación: ${item.situation || 'General'}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('## UNIDADES DETALLADAS Y DRILLS PARA SHADOWING');
  lines.push('');

  for (const item of items) {
    lines.push(`### [UNIDAD #${item.id}] ${(item.phrasal_verb || '').toUpperCase()}`);
    if (item.base_verb) lines.push(`- Verbo base: ${item.base_verb} | Partícula: ${item.particle || ''}`);
    lines.push(`- Significado: ${item.meaning_es || ''}`);
    lines.push(`- Situación de uso: ${item.situation || 'General'}`);
    if (item.tags_es && item.tags_es.length) {
      lines.push(`- Conceptos clave (ES): ${item.tags_es.join(', ')}`);
    }
    if (item.intro_note) {
      lines.push(`- Nota: ${item.intro_note}`);
    }
    lines.push('- Drills bilingües (Español -> Inglés):');
    if (item.drills && item.drills.length) {
      for (const d of item.drills) {
        lines.push(`  ${d.order || ''}. [ES] "${d.es}" -> [EN] "${d.en}"`);
      }
    }
    lines.push('');
  }

  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Knowledge text file generated: ${outPath}`);
}

main().catch(err => {
  console.error('Fatal error in batch process:', err);
});
