// Tarea S3.4 del roadmap: añade transcripción IPA (Reino Unido / EE. UU.) del verbo base +
// partícula a cada phrasal verb, usando el dataset vendorizado open-dict-data/ipa-dict
// (scripts/vendor/en_UK.txt, scripts/vendor/en_US.txt - una sola descarga, sin fetch en runtime).

import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('phrasal_verbs_data.json');
const UK_FILE = path.resolve('scripts', 'vendor', 'en_UK.txt');
const US_FILE = path.resolve('scripts', 'vendor', 'en_US.txt');

function loadDict(filePath) {
  const map = new Map();
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const [word, transcriptions] = line.split('\t');
    if (!word || !transcriptions) continue;
    // Si hay varias pronunciaciones separadas por coma, se toma la primera.
    const first = transcriptions.split(',')[0].trim();
    map.set(word.trim().toLowerCase(), first.replace(/^\/|\/$/g, ''));
  }
  return map;
}

function enrich() {
  const ukDict = loadDict(UK_FILE);
  const usDict = loadDict(US_FILE);
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  let matched = 0;
  for (const item of data) {
    const base = (item.base_verb || '').toLowerCase();
    const particle = (item.particle || '').toLowerCase();
    if (!base || !particle) {
      delete item.ipa;
      continue;
    }

    const ukBase = ukDict.get(base);
    const ukParticle = ukDict.get(particle);
    const usBase = usDict.get(base);
    const usParticle = usDict.get(particle);

    if (ukBase && ukParticle && usBase && usParticle) {
      item.ipa = {
        uk: `/${ukBase} ${ukParticle}/`,
        us: `/${usBase} ${usParticle}/`,
      };
      matched++;
    } else {
      delete item.ipa;
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`ipa añadido a ${matched}/${data.length} pistas.`);
  console.log('Ejecuta ahora: node scripts/normalize_data.js');
}

enrich();
