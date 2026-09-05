// Tarea S2.1 del roadmap: añade `formal_synonyms` (verbo formal de raíz latina) a cada
// phrasal verb, para que el hispanohablante conecte el phrasal verb con una palabra que ya conoce.
//
// NOTA IMPORTANTE: en scripts/vendor/phrasal.verbs.build.json (WithEnglishWeCan) se evaluó un
// cruce automático por nombre de phrasal verb, pero ese dataset solo guarda UNA acepción por
// entrada y con frecuencia no coincide con el sentido que usa este proyecto (ej. su "put off"
// da sinónimos de "desanimar" -daunt/deter/discourage- cuando aquí "put off" significa
// "posponer"; su "carry on" da "misbehave" cuando aquí significa "continuar"). Usar ese cruce
// a ciegas habría introducido vocabulario incorrecto y pedagógicamente engañoso.
// Por eso el mapeo de abajo está curado a mano, verificado contra el `meaning_es` real de
// phrasal_verbs_data.json para las 155 unidades únicas del curso.
//
// Las entradas combinadas (título con "/" o "," que agrupa varios phrasal verbs en una sola
// pista, ej. "move in / move out") se dejan sin bridge cuando el verbo ya tiene su propia
// entrada individual en esta tabla (para no duplicar ni generar ambigüedad); sí se rellenan
// cuando no existe una entrada individual equivalente (ej. "turn on / switch on").

import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('phrasal_verbs_data.json');

const FORMAL_MAP = {
  'go up': ['ascend'],
  'pick up': ['collect'],
  'climb up': ['ascend'],
  'blow up': ['inflate', 'enlarge'],
  'fill up': ['replenish'],
  'speed up': ['accelerate'],
  'turn up': ['increase'],
  'break up': ['separate'],
  'end up': ['conclude'],
  'give up': ['abandon', 'surrender'],
  'hang up': ['terminate'],
  'use up': ['consume', 'exhaust'],
  'wake up': ['awaken'],
  'get up': ['rise'],
  'catch up': ['reach'],
  'catch up (with/to)': ['reach'],
  'come up': ['arise'],
  'go up to': ['approach'],
  'make up': ['invent', 'fabricate'],
  'draw up': ['draft', 'prepare'],
  'come up with': ['devise', 'propose'],
  'take up': ['commence'],
  'set up': ['establish', 'install'],
  'start up': ['initiate'],
  'sign up': ['enroll', 'register'],
  'back up': ['support'],
  'look up': ['consult'],
  'go down': ['descend'],
  'put down': ['deposit'],
  'slow down': ['decelerate'],
  'calm down': ['relax'],
  'turn down': ['decrease', 'reject'],
  'copy down': ['transcribe'],
  'note down': ['record'],
  'write down': ['record'],
  'break down': ['malfunction', 'collapse'],
  'let down': ['disappoint'],
  'shut down': ['terminate'],
  'come in': ['enter'],
  'get in': ['enter'],
  'get into': ['enter'],
  'run in': ['enter'],
  'walk in': ['enter'],
  'break in': ['intrude'],
  'take in': ['comprehend'],
  'sink in': ['assimilate'],
  'fill in': ['substitute'],
  'fill in for': ['substitute'],
  'stand in': ['substitute'],
  'stand in for': ['substitute'],
  'hand in': ['submit'],
  'send in': ['submit'],
  'pop in': ['visit'],
  'drop in': ['visit'],
  'drop in on': ['visit'],
  'put in': ['insert'],
  'stuff in': ['insert'],
  'plug in': ['connect'],
  'butt in': ['interrupt'],
  'bump into': ['encounter'],
  'turn into': ['transform', 'convert'],
  'look into': ['investigate'],
  'move in': ['relocate'],
  'bring in': ['introduce'],
  'check in': ['register'],
  'check in (aeropuerto / equipaje)': ['register'],
  'hand out': ['distribute'],
  'give out': ['distribute'],
  'send out': ['distribute'],
  'get out': ['escape'],
  'walk out': ['depart', 'abandon'],
  'go out': ['extinguish'],
  'put out': ['extinguish'],
  'bring out': ['release', 'publish'],
  'come out': ['emerge', 'release'],
  'back out': ['withdraw'],
  'drop out': ['withdraw'],
  'pull out': ['withdraw'],
  'count out': ['exclude'],
  'rule out': ['eliminate', 'exclude'],
  'kick out': ['expel'],
  'drive out': ['expel'],
  'iron out': ['resolve'],
  'sort out': ['resolve', 'organize'],
  'figure out': ['determine', 'decipher'],
  'take out': ['extract', 'remove'],
  'find out': ['discover'],
  'run out': ['expire', 'deplete'],
  'run out of': ['exhaust'],
  'turn out': ['result'],
  'leave out': ['omit'],
  'wear out': ['exhaust'],
  'fall out': ['dispute'],
  'turn on / switch on': ['activate'],
  'put on': ['activate'],
  'get on': ['board'],
  'jump on / to hop on': ['board'],
  'climb on / climb onto': ['mount'],
  'hang on / hold on': ['persist'],
  'hold on': ['persist'],
  'stay on': ['remain'],
  'add on': ['append'],
  'stick on': ['adhere'],
  'carry on': ['continue', 'persist'],
  'keep on': ['continue'],
  'go on': ['continue'],
  'log on / sign on': ['access'],
  'log on': ['access'],
  'clock on': ['register'],
  'agree on': ['concur'],
  'let on': ['reveal', 'disclose'],
  'take on': ['assume'],
  'go off': ['detonate', 'activate'],
  'set off': ['trigger', 'detonate'],
  'set off (a metal detector/alarm)': ['trigger', 'detonate'],
  'come off': ['succeed'],
  'pay off': ['succeed'],
  'pull off': ['achieve'],
  'switch off / to turn off': ['deactivate'],
  'cut off': ['disconnect', 'interrupt'],
  'block off': ['obstruct'],
  'close off': ['obstruct'],
  'take off': ['remove'],
  'rip off': ['extract'],
  'run off': ['flee'],
  'drive off': ['depart'],
  'call off': ['cancel'],
  'put off': ['postpone', 'delay'],
  'wear off': ['dissipate'],
  'cool off': ['calm'],
  'drop off': ['decrease', 'decline'],
  'give off': ['emit'],
};

function enrich() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  let matched = 0;
  for (const item of data) {
    const key = item.phrasal_verb.toLowerCase();
    const synonyms = FORMAL_MAP[key];
    if (synonyms && synonyms.length) {
      item.formal_synonyms = synonyms;
      matched++;
    } else {
      delete item.formal_synonyms;
    }
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`formal_synonyms añadido a ${matched}/${data.length} pistas (${new Set(data.map(d => d.phrasal_verb.toLowerCase())).size} verbos únicos).`);
  console.log('Ejecuta ahora: node scripts/normalize_data.js');
}

enrich();
