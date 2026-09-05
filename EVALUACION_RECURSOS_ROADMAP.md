# 📋 Evaluación de Recursos y Roadmap de Mejoras (PWA & IA)

Documento maestro para evaluar uno a uno los recursos de GitHub seleccionados, su alineación con el objetivo de **comunicación y fluidez en tiempo récord**, y el orden de implementación estricto basado en el **Principio de Pareto (80/20)**.

---

## 🎯 Objetivo Central y Diagnóstico Estratégico

> **Perfil y Meta del Usuario:**
> - Base de vocabulario y mejor comprensión lectora que auditiva.
> - Intensivo de 2 horas diarias (1h clases en vivo Conquer English + 1h shadowing/práctica oral guiada) + TV en inglés.
> - **Meta prioritaria:** Alcanzar **fluidez oral primero, pronunciación limpia y comprensible por nativos, vocabulario activo** y agilidad mental para **comunicarse BIEN en tiempo récord**.

### Las 3 Palancas Pareto del Aprendizaje Rápido:
1. **Destapar Oído y Fonética (Vicios Hispanos + Connected Speech):** La dificultad auditiva ocurre porque el inglés hablado no separa las palabras: enlaza consonantes finales con vocales iniciales (*"pick it up" ➔ "pi-ki-tup"*). Al erradicar los 4 vicios fonéticos hispanos y visualizar las ligaduras (`‿`), se destapan tanto el oído (para TV y clases) como la claridad al hablar.
2. **El Atajo Léxico (Puente Formal ➔ Phrasal Verb):** El hispanohablante ya conoce cientos de verbos en inglés de raíz latina (*cancel, postpone, investigate, tolerate, discover, reduce*). Al asociar directamente el verbo formal conocido con su *phrasal verb* nativo (*call off, put off, look into, put up with, find out, cut down*), se duplica el vocabulario activo sin pasar por la traducción en español.
3. **Automatización de Reflejos Orales (Voz y Práctica Activa):** Comandos de voz, repetición en bucle de oraciones difíciles, eliminación de la duda con la partícula y clínicas de errores de 3 minutos sin cortar la fluidez de la conversación.

---

## 🧭 Matriz de Trazabilidad: Recursos Seleccionados por el Usuario

Esta tabla garantiza que el 100% de los puntos señalados por el usuario en su selección inicial estén fielmente representados en el roadmap:

| Selección Original | Nombre del Recurso / Repositorio | Destino en Roadmap | Rank Pareto | Estado |
| :--- | :--- | :--- | :---: | :---: |
| **B.3** | Algoritmo FSRS / SM-2 (`open-spaced-repetition/ts-fsrs`) | Sección 3.1 | **Rank 11** | Pendiente (Sprint 3) |
| **C.6** | Detección de patrones de error (`azborovskyi/claude-english-tutor`) | Sección 4.3 | **Rank 3** | **Completado (Sprint 1)** |
| **D.7** | Sinónimos formales y derivados (`WithEnglishWeCan`) | Sección 1.3 | **Rank 4** | Pendiente (Sprint 2) |
| **D.8** | Niveles CEFR e IPA (`Talhakasikci/cefr-vocabulary-dataset`) | Secciones 1.1 y 1.2 | **Ranks 10 y 12** | Pendiente (Sprint 3/4) |
| **D.10** | Citas y expresiones reales en series de TV (`Vlad-Vasinev`) | Sección 1.4 | **Rank 13** | Pendiente (Sprint 4) |
| **D.11** | Evaluación fonética y vicios del español (`OpenPronounce`) | Secciones 4.4 y 15 | **Ranks 1 y 15** | **Completado (Sprint 1)** |
| **PWA.1** | Metodología de Shadowing en 3 Pasadas (`TideSparrow`) | Sección 2.1 | **Rank 8** | Pendiente (Sprint 3) |
| **PWA.2** | Bucle frase a frase / A-B Looping (`TideSparrow`) | Sección 2.2 | **Rank 6** | Pendiente (Sprint 2) |
| **PWA.3** | Algoritmo de repaso espaciado ligero en cliente | Sección 3.1 | **Rank 11** | Pendiente (Sprint 3) |
| **PWA.4** | Modo Cloze / Test rápido de partícula (`little-brother`) | Sección 2.3 | **Rank 7** | Pendiente (Sprint 3) |
| **PWA.5** | Resaltado de Connected Speech y fonética IPA | Secciones 2.4 y 1.1 | **Ranks 5 y 10** | Pendiente (Sprint 2/3) |
| **PWA.6** | Contraste de registro: Phrasal Verb vs Verbo Formal | Sección 1.3 | **Rank 4** | Pendiente (Sprint 2) |
| **IA.1** | Comandos de control por voz en tutor (`Lewis2002`) | Sección 4.1 | **Rank 2** | **Completado (Sprint 1)** |
| **IA.2** | Generador de historias dinámicas i+1 (`Lewis2002`) | Sección 4.2 | **Rank 9** | Pendiente (Sprint 3) |
| **IA.3** | Registro y corrección de vicios fonéticos hispanos | Sección 4.4 | **Rank 1** | **Completado (Sprint 1)** |
| **IA.4** | Clínica de errores al cierre de sesión | Sección 4.3 | **Rank 3** | **Completado (Sprint 1)** |

---

## 🏆 Ranking Pareto Riguroso (del 1 al 16)

Ordenado matemáticamente por **ROI = Impacto en Fluidez / Esfuerzo de Implementación**:
- Empates en impacto (⭐⭐⭐⭐⭐) se resuelven por menor esfuerzo (`Muy Bajo` > `Bajo` > `Medio`).

| Rank | ID | Nombre de la Mejora | Ámbito | Impacto | Esfuerzo | Clave de Impacto (80/20) | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- | :---: |
| **1** | **4.4** | **Detección de Vicios Fonéticos Hispanos en Tutor de Voz** | Claude/GPT | ⭐⭐⭐⭐⭐ | Muy Bajo | Erradica los 4 fallos que impiden a un nativo entenderte (prótesis 'e', vocales laxas, consonantes finales, acento en partícula). | `[x] Sprint 1` |
| **2** | **4.1** | **Comandos de Voz Estandarizados (Shadowing / Roleplay / Partícula)** | Claude/GPT | ⭐⭐⭐⭐⭐ | Muy Bajo | Control total de tus 2h de estudio por voz (*"Modo Shadowing"*, *"Modo Roleplay"*, *"Explícame la Partícula"*, *"Examen Rápido"*). | `[x] Sprint 1` |
| **3** | **4.3** | **"Clínica de Errores" al Cierre de Sesión de Voz** | Claude/GPT | ⭐⭐⭐⭐⭐ | Muy Bajo | Fluidez continua en el roleplay; machaca los 2 fallos clave en los últimos 3 min con repetición rápida en bucle. | `[x] Sprint 1` |
| **4** | **1.3** | **Contraste de Registro: Phrasal Verb vs. Verbo Formal Latino** | PWA / Datos | ⭐⭐⭐⭐⭐ | Bajo | Tu mayor atajo léxico: conecta palabras formales que ya sabes con el phrasal verb (*postpone ➔ put off*). | `[x] Sprint 2` |
| **5** | **2.4** | **Resaltado Visual de *Connected Speech* (`‿`) en Frases** | PWA | ⭐⭐⭐⭐⭐ | Bajo | Destapa tu oído para la TV y elimina la dicción entrecortada (*Turn‿off*, *Ge**t**‿**o**ut*). | `[x] Sprint 2` |
| **6** | **2.2** | **Bucle Frase a Frase (Audio Loop por Oración)** | PWA | ⭐⭐⭐⭐ | Bajo-Medio | Repite una sola frase en bucle continuo hasta que salga con fluidez y entonación perfecta. | `[x] Sprint 2` |
| **7** | **2.3** | **Modo Cloze / Test Rápido de Partícula (1 seg)** | PWA | ⭐⭐⭐⭐ | Bajo | Elimina la duda de selección de partícula (*up, off, in, out*) que provoca los silencios al hablar. | `[x] Sprint 3` |
| **8** | **2.1** | **Metodología de Shadowing en 3 Pasadas** | PWA | ⭐⭐⭐⭐ | Bajo | Estructura la práctica: *1. Entender bilingüe ➔ 2. Escuchar ritmo ➔ 3. Shadowing ciego con blur*. | `[x] Sprint 3` |
| **9** | **4.2** | **Generador de Micro-Lecturas e Historias i+1** | Claude/GPT | ⭐⭐⭐⭐ | Muy Bajo | Pone tus verbos en 🔴 Focus dentro de diálogos cotidianos para leer en voz alta. | `[x] Sprint 3` |
| **10** | **1.1** | **Fonética IPA en Tarjetas (Verbo + Partícula)** | Datos / PWA | ⭐⭐⭐ | Bajo | Referencia visual para resolver dudas exactas de pronunciación (UK / US). | `[x] Sprint 3` |
| **11** | **3.1** | **Repaso Espaciado Ligero FSRS/SM-2 en PWA** | PWA | ⭐⭐⭐⭐ | Medio | Cola diaria inteligente: *"Tus 10 verbos para repasar hoy"*. Evita olvidar lo practicado. | `[x] Sprint 3` |
| **12** | **1.2** | **Mapeo CEFR (A1-C1) y Filtro A2** | Datos / PWA | ⭐⭐⭐ | Bajo | Clasifica los 153 verbos alineados con los módulos A2-1, A2-2 de Conquer English. | `[x] Sprint 4 (curado a mano)` |
| **13** | **1.4** | **Citas y Contextos Reales de Películas/Series** | PWA / IA | ⭐⭐⭐ | Medio | Ejemplos auténticos de *Friends* y *The Office* para reforzar memoria contextual. | `[-] Omitida: sin fuente real` |
| **14** | **3.2** | **Historial de Racha 🔥 y Estadísticas Orales** | PWA | ⭐⭐ | Bajo | Gamificación visual para mantener la constancia diaria del intensivo. | `[x] Sprint 4` |
| **15** | **11** | **Motor Local Acústico Wav2Vec2 (`OpenPronounce`)** | Servidor | ⭐⭐⭐ | Alto | Evaluación acústica avanzada; pospuesto por coste de infraestructura. | `[-] En reserva` |
| **16** | **2.5** | **Detector de Chunks con Trie en Historias** | PWA | ⭐⭐ | Medio | Identificación léxica adicional; prescindible frente a las anteriores. | `[-] En reserva` |

---

## 🔍 Detalle de Cada Mejora y Justificación Pareto

---

### 🥇 Rank 1 — [4.4] Detección Proactiva de Vicios Fonéticos del Español en el Tutor de Voz
- **Repositorio fuente:** [`Halleck45/OpenPronounce`](https://github.com/Halleck45/OpenPronounce)
- **Por qué es #1:** El principal obstáculo de un hispanohablante para hacerse entender por nativos y ganar confianza oral no es saber 500 palabras más, sino eliminar los 4 vicios fonéticos que entorpecen la comprensión:
  1. *Prótesis de 'e':* Añadir una 'e' antes de s líquida (decir */e-start/* en lugar de */stɑːrt/* o */e-spanish/*).
  2. *Vocales tensas vs laxas:* Confusión entre */iː/* (sheep) y */ɪ/* (ship), */uː/* (fool) y */ʊ/* (full).
  3. *Comerse consonantes finales:* No cerrar la 'k', 't' o 'p' antes de la partícula (*pic-up* en vez de *pick-up*).
  4. *Acento tónico plano:* No marcar con fuerza la partícula (*go UP*, *turn OFF*).
- **Regla de oro anti-interrupción:** En Shadowing se corrige al vuelo; en Roleplay/Conversación libre la IA guarda silencio durante el diálogo y reserva los fallos para la Clínica de Errores final.
- **Estado:** Implementado en `ai-prompt.md`.

---

### 🥈 Rank 2 — [4.1] Comandos de Voz Estandarizados para el Tutor
- **Repositorio fuente:** [`Lewis2002-William/english-learning-prompts`](https://github.com/Lewis2002-William/english-learning-prompts)
- **Por qué es #2:** Durante las 2h diarias de intensivo (especialmente en la hora libre de shadowing y práctica), necesitas controlar la sesión por voz sin tocar el móvil:
  - *"Modo Shadowing":* La IA lanza la frase en español, calla para que respondas y valida ritmo y entonación.
  - *"Modo Roleplay":* Simulación de conversación laboral, de viajes o reuniones donde debes colar obligatoriamente 3 de tus verbos en 🔴 Focus.
  - *"Explícame la Partícula":* La IA desglosa la lógica espacial/abstracta de la preposición para entender el verbo sin memorizarlo a ciegas.
  - *"Examen Rápido":* Lanza 5 preguntas sorpresa de respuesta oral inmediata (<3s) para medir el reflejo comunicativo.
  - *"Clínica de Errores":* Salto directo a repasar los errores del día con micro-repeticiones.
- **Estado:** Implementado en `ai-prompt.md`.

---

### 🥉 Rank 3 — [4.3] "Clínica de Errores" al Cierre de la Sesión
- **Repositorio fuente:** [`azborovskyi/claude-english-tutor`](https://github.com/azborovskyi/claude-english-tutor)
- **Por qué es #3:** Corregir cada palabra durante un diálogo rompe la fluidez y genera inseguridad. Este enfoque separa los momentos:
  1. *Conversación:* Fluida, permisiva, enfocada en comunicarse.
  2. *Últimos 3-5 minutos ("Clínica"):* La IA extrae los 2 errores habituales cometidos en la sesión y hace 3 repeticiones rápidas hasta que el cerebro los automatice bien.
- **Estado:** Implementado en `ai-prompt.md`.

---

### 🏅 Rank 4 — [1.3] Contraste de Registro: Phrasal Verb vs. Verbo Formal Latino
- **Repositorio fuente:** [`WithEnglishWeCan/generated-english-phrasal-verbs`](https://github.com/WithEnglishWeCan/generated-english-phrasal-verbs)
- **Por qué es #4:** Tu mayor palanca léxica. El hispanohablante ya conoce palabras formales en inglés porque proceden del latín (*cancel, postpone, investigate, surrender, tolerate*), pero en la vida real y el trabajo los nativos usan el *phrasal verb*.
  - Mostrar en cada tarjeta de la PWA: `[Formal: postpone] ➔ [Nativo cotidiano: put off]`.
  - Conexión mental instantánea: no aprendes un concepto de cero, solo sustituyes el término formal por el natural.
- **Acción técnica:** Cruzar los 153 phrasal verbs con la lista de sinónimos de `phrasal.verbs.build.json` en `scripts/normalize_data.js`.
- **Esfuerzo:** Bajo.

---

### 🏅 Rank 5 — [2.4] Resaltado Visual de *Connected Speech* (`‿`) en Frases
- **Concepto fonético:** Enlaces consonante-vocal y elisiones nativas.
- **Por qué es #5:** Los nativos no dicen *"pick - it - up"*, dicen *"pi-ki-tup"*. Al tener mejor lectura que audición, ver la ligadura gráfica ayuda a que el cerebro anticipe cómo va a sonar en el audio:
  > *"Tu**r**n‿**o**ff"*, *"Pi**c**k‿**i**t‿**u**p"*, *"Ge**t**‿**o**ut"*
  Elimina el hablar entrecortado y acelera la comprensión auditiva de la TV y hablantes rápidos.
- **Acción técnica:** Función de formateo visual en `index.html` al renderizar los drills.
- **Esfuerzo:** Bajo (~30 líneas de JS/CSS).

---

### 🏅 Rank 6 — [2.2] Bucle Frase a Frase (Audio Loop por Oración)
- **Repositorio fuente:** [`TideSparrow/shadowing-english`](https://github.com/TideSparrow/shadowing-english)
- **Por qué es #6:** En tu práctica diaria, si una frase se te resiste, necesitas repetirla 5 veces seguidas sin tener que rebobinar todo el audio de 10 frases.
- **Acción técnica:** Botón de repetición en bucle para la frase individual en el modal de drills (conectado al motor de audio/TTS de la frase).
- **Esfuerzo:** Bajo-Medio.

---

### 🏅 Rank 7 — [2.3] Modo Cloze / Test Rápido de Partícula (1 seg)
- **Repositorios fuente:** [`little-brother/english-phrasal-verbs`](https://github.com/little-brother/english-phrasal-verbs) y [`qtheperfect/milkyway`](https://github.com/qtheperfect/milkyway)
- **Por qué es #7:** El 90% de los errores al hablar ocurre cuando el estudiante duda qué partícula añadir (*give in, give up, give away, give out*).
  - Un minijuego rápido en la PWA: frase en pantalla con hueco y 3-4 botones de partículas para pulsar en menos de 2 segundos.
  - Refuerza el reflejo neuromuscular inmediato antes de hablar.
- **Esfuerzo:** Bajo-Medio.

---

### 🏅 Rank 8 — [2.1] Metodología de Shadowing en 3 Pasadas
- **Repositorio fuente:** [`TideSparrow/shadowing-english`](https://github.com/TideSparrow/shadowing-english)
- **Por qué es #8:** Convierte la escucha pasiva en un circuito estructurado:
  1. *Understand:* Texto bilingüe visible, comprende significado.
  2. *Listen:* Oculta español, escucha entonación y acentos.
  3. *Shadow:* Inglés desenfocado (*blur*), habla a la vez que el audio nativo imitando la melodía de la frase.
- **Esfuerzo:** Bajo.

---

### 🏅 Rank 9 — [4.2] Generador de Micro-Lecturas e Historias i+1
- **Repositorio fuente:** [`Lewis2002-William/english-learning-prompts`](https://github.com/Lewis2002-William/english-learning-prompts)
- **Por qué es #9:** Conecta los verbos sueltos en narraciones dialogadas de nivel A2/B1 que el usuario lee en voz alta con la IA.
- **Esfuerzo:** Muy bajo.

---

### 🏅 Rank 10 — [1.1] Fonética IPA de Verbo y Partícula
- **Repositorios fuente:** [`open-dict-data/ipa-dict`](https://github.com/open-dict-data/ipa-dict) y [`Talhakasikci/cefr-vocabulary-dataset`](https://github.com/Talhakasikci/cefr-vocabulary-dataset)
- **Por qué es #10:** Resuelve dudas de pronunciación exacta de cada componente visualmente (UK / US) en las tarjetas de la PWA.
- **Esfuerzo:** Bajo.

---

### 🏅 Rank 11 — [3.1] Algoritmo de Repaso Espaciado Ligero (FSRS / SM-2)
- **Repositorios fuente:** [`open-spaced-repetition/ts-fsrs`](https://github.com/open-spaced-repetition/ts-fsrs) / [`manderwall/aplusstudyapp`](https://github.com/manderwall/aplusstudyapp)
- **Por qué es #11:** Garantiza retención a largo plazo programando automáticamente qué verbos repasar cada día según la dificultad percibida.
- **Esfuerzo:** Medio.

---

### 🏅 Ranks 12 a 16: Niveles CEFR, Citas de Series, Rachas y Motores Avanzados
- **Rank 12:** Mapeo CEFR (A1-C1) y filtro A2 (`Talhakasikci`).
- **Rank 13:** Citas y contextos reales de series de TV (`Vlad-Vasinev`).
- **Rank 14:** Historial de racha 🔥 y estadísticas orales (`Russki`).
- **Rank 15:** Motor acústico local Wav2Vec2 (`OpenPronounce`) — Pospuesto por peso y dependencias.
- **Rank 16:** Detector de chunks con trie (`fraze-finder`) — Prescindible frente a los drills directos.

---

## 🚀 Plan de Ejecución por Sprints

### ⚡ Sprint 1: Activación Inmediata de Fluidez y Voz (Completado)
> **Foco:** Máximo impacto en la práctica oral diaria de 2 horas sin tocar código frontend.
- [x] **Rank 1 (ID 4.4):** Inyectar en `ai-prompt.md` el protocolo de vicios fonéticos del español (prótesis 'e', vocales laxas/tensas, consonantes finales, acento en partícula) con regla de no interrupción en conversación.
- [x] **Rank 2 (ID 4.1):** Añadir en `ai-prompt.md` los comandos de voz estandarizados (*"Modo Shadowing"*, *"Modo Roleplay"*, *"Explícame la Partícula"*, *"Examen Rápido"*, *"Clínica de Errores"*).
- [x] **Rank 3 (ID 4.3):** Implementar el protocolo de "Clínica de Errores" en los últimos 3-5 minutos de cada sesión en `ai-prompt.md`.

### 🛠️ Sprint 2: El Puente Léxico y la Fonética en la PWA — ✅ Completado
> **Foco:** Impacto visual y auditivo en cada drill de la PWA.
- [x] **Rank 4 (ID 1.3):** Equivalente formal latino curado a mano (el cruce automático con `WithEnglishWeCan` daba sinónimos del sentido equivocado) mostrado en tarjeta, modal y búsqueda.
- [x] **Rank 5 (ID 2.4):** Formateo visual de ***Connected Speech* (`‿`)** con toggle ON/OFF y exclusión de límites de frase.
- [x] **Rank 6 (ID 2.2):** Botón de **Bucle Continuo de Frase**, con detención automática al activar otro bucle.

### 🎯 Sprint 3: Automatización de Reflejos y Retención — ✅ Completado
- [x] **Rank 7 (ID 2.3):** Minijuego "Modo Cloze de Partícula" en `index.html`, anclado a `base_verb`+partícula.
- [x] **Rank 8 (ID 2.1):** Barra de fases "Shadowing en 3 Pasadas" reutilizando blur/Connected Speech existentes.
- [x] **Rank 9 (ID 4.2):** Generador de prompt de historia i+1 a partir de los verbos en 🔴 Focus.
- [x] **Rank 10 (ID 1.1):** Transcripción IPA UK/US integrada (dataset `open-dict-data/ipa-dict` vendorizado).
- [x] **Rank 11 (ID 3.1):** SRS ligero (`srs.js`) que solo programa *cuándo* repasar; el rating escribe a través de `cardStatuses` para no crear un segundo sistema de progreso.

### 🎬 Sprint 4: Enriquecimiento Curricular y Gamificación
- [x] **Rank 12 (ID 1.2):** Niveles CEFR (A1-C1) y filtro A2 — **curados a mano**, el dataset previsto no cubría ningún phrasal verb del curso.
- [-] **Rank 13 (ID 1.4):** Citas auténticas de películas/series — **omitida**: el dataset previsto no tenía ninguna atribución real a series/películas.
- [x] **Rank 14 (ID 3.2):** Racha 🔥 y mapa de calor de dominio de los 153 verbos.

---

## 🔗 Referencias y Enlaces a los Repositorios

- [TideSparrow/shadowing-english](https://github.com/TideSparrow/shadowing-english) — App de shadowing local-first y método 3 pasadas.
- [Lewis2002-William/english-learning-prompts](https://github.com/Lewis2002-William/english-learning-prompts) — AI prompt toolbox para aprendizaje de vocabulario y tutoría.
- [azborovskyi/claude-english-tutor](https://github.com/azborovskyi/claude-english-tutor) — Agente de Claude para análisis de patrones de error y ejercicios dirigidos.
- [WithEnglishWeCan/generated-english-phrasal-verbs](https://github.com/WithEnglishWeCan/generated-english-phrasal-verbs) — Base de datos JSON de 3.350+ phrasal verbs con sinónimos formales y derivados.
- [open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) — Algoritmo FSRS de repetición espaciada moderna en JavaScript/TypeScript.
- [manderwall/aplusstudyapp](https://github.com/manderwall/aplusstudyapp) — PWA offline-first en Vanilla JS con FSRS integrado sin dependencias.
- [open-dict-data/ipa-dict](https://github.com/open-dict-data/ipa-dict) — Diccionario fonético IPA abierto (UK / US).
- [Talhakasikci/cefr-vocabulary-dataset](https://github.com/Talhakasikci/cefr-vocabulary-dataset) — Vocabulario clasificado por nivel CEFR (A1 a C1) con IPA en JSON.
- [Halleck45/OpenPronounce](https://github.com/Halleck45/OpenPronounce) — Evaluación fonética y acústica de pronunciación en inglés.
- [Vlad-Vasinev/real-english-idioms](https://github.com/Vlad-Vasinev/real-english-idioms) — Frases e idioms auténticos de series y películas de TV.
