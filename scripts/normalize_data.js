import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('phrasal_verbs_data.json');
const DATA_JS_FILE = path.resolve('data.js');
const KNOWLEDGE_FILE = path.resolve('phrasal_verbs_knowledge.txt');

function cleanVerb(verb) {
  if (!verb) return '';
  let v = verb.trim();
  // Remove leading 'to '
  if (v.toLowerCase().startsWith('to ')) {
    v = v.substring(3).trim();
  }
  return v;
}

function normalize() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  // Sort by id 1..306
  data.sort((a, b) => a.id - b.id);

  // First pass: clean verbs on odd items (drills)
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    item.phrasal_verb = cleanVerb(item.phrasal_verb);
  }

  // Second pass: pair items and harmonize
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const isOdd = item.id % 2 !== 0;

    if (isOdd) {
      item.type = 'drill';
      item.pair_id = item.id + 1;
      item.track_type_label = '🎯 Práctica Guiada';
    } else {
      item.type = 'story';
      item.pair_id = item.id - 1;
      item.track_type_label = '📖 Historia en Contexto';

      // Find the paired drill (item.id - 1)
      const pairedDrill = data.find(x => x.id === item.id - 1);
      if (pairedDrill) {
        // If story verb has "Story: ...", extract story title and set clean phrasal verb
        if (item.phrasal_verb.toLowerCase().startsWith('story')) {
          item.story_title = item.phrasal_verb;
          item.phrasal_verb = pairedDrill.phrasal_verb;
        }
        if (!item.base_verb) item.base_verb = pairedDrill.base_verb;
        if (!item.particle) item.particle = pairedDrill.particle;
      }
    }

    // Ensure base_verb and particle exist
    if (!item.base_verb && item.phrasal_verb) {
      const parts = item.phrasal_verb.split(' ');
      item.base_verb = parts[0];
      if (parts.length > 1) item.particle = parts[1];
    }
  }

  // Save updated JSON
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');

  // Update data.js
  fs.writeFileSync(DATA_JS_FILE, 'window.PHRASAL_DATA = ' + JSON.stringify(data) + ';', 'utf8');

  // Update phrasal_verbs_knowledge.txt
  generateKnowledgeText(data, KNOWLEDGE_FILE);

  console.log('Normalization complete! 306 items updated.');
}

function generateKnowledgeText(items, outPath) {
  let lines = [];
  lines.push('# REPOSITORIO MAESTRO DE PHRASAL VERBS (CONQUER ENGLISH)');
  lines.push('Este archivo contiene el índice y los ejercicios bilingües de shadowing (Español -> Inglés).');
  lines.push('Total de unidades: ' + items.length + ' (153 Phrasal Verbs x 2 pistas: Práctica Guiada e Historia en Contexto)');
  lines.push('');
  lines.push('## ESTRUCTURA DEL CURSO');
  lines.push('- PISTAS IMPARES (#1, #3, #5...): [PRÁCTICA] Drills guiados frase a frase con el profesor dando el disparador en español.');
  lines.push('- PISTAS PARES (#2, #4, #6...): [HISTORIA] Lectura / narración continua en contexto real aplicando el mismo phrasal verb.');
  lines.push('');
  lines.push('---');
  lines.push('## ÍNDICE RÁPIDO DE PHRASAL VERBS');
  for (let i = 0; i < items.length; i += 2) {
    const drill = items[i];
    const story = items[i + 1];
    lines.push(`- Verbo: **${drill.phrasal_verb}** | Significado: ${drill.meaning_es} | Práctica: #${drill.id} | Historia: #${story ? story.id : '-'}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('## UNIDADES DETALLADAS Y DRILLS PARA SHADOWING');
  lines.push('');

  for (const item of items) {
    const typeLabel = item.type === 'drill' ? 'PRÁCTICA GUIADA' : 'HISTORIA EN CONTEXTO';
    lines.push(`### [PISTA #${item.id}] ${item.phrasal_verb.toUpperCase()} - ${typeLabel}`);
    if (item.story_title) lines.push(`- Título: ${item.story_title}`);
    if (item.base_verb) lines.push(`- Verbo base: ${item.base_verb} | Partícula: ${item.particle || ''}`);
    lines.push(`- Significado: ${item.meaning_es || ''}`);
    if (item.formal_synonyms && item.formal_synonyms.length) {
      lines.push(`- Equivalentes formales latinos: ${item.formal_synonyms.join(', ')}`);
    }
    if (item.ipa) {
      lines.push(`- Pronunciación IPA: UK ${item.ipa.uk} | US ${item.ipa.us}`);
    }
    lines.push(`- Situación de uso: ${item.situation || 'General'}`);
    if (item.tags_es && item.tags_es.length) {
      lines.push(`- Conceptos clave (ES): ${item.tags_es.join(', ')}`);
    }
    if (item.intro_note) {
      lines.push(`- Nota: ${item.intro_note}`);
    }
    lines.push(`- Drills bilingües (${item.drills ? item.drills.length : 0} frases):`);
    if (item.drills && item.drills.length) {
      for (const d of item.drills) {
        lines.push(`  ${d.order || ''}. [ES] "${d.es}" -> [EN] "${d.en}"`);
      }
    }
    lines.push('');
  }

  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
}

normalize();
