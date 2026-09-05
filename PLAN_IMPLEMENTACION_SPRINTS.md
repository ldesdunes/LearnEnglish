# 🏗️ Plan Detallado de Implementación por Sprints (Sprint 2, 3 y 4)

Este documento desglosa cada funcionalidad pendiente del roadmap en **tareas atómicas, autónomas y bien definidas**. Cada tarea especifica los archivos afectados, la lógica técnica exacta, el diseño visual/interactivo y los criterios objetivos de verificación.

---

## 🧭 Principios de Implementación del Proyecto

1. **Cero dependencias y Vanilla JS puro:** No frameworks, no bundlers, no npm en runtime. El frontend es 100% estático (`index.html`, `data.js`, `sw.js`).
2. **Fuente única de la verdad:** Todo cambio en datos se realiza en `phrasal_verbs_data.json` y se propaga ejecutando `node scripts/normalize_data.js`, que regenera `data.js` y `phrasal_verbs_knowledge.txt`.
3. **PWA y Caché:** Cada cambio en archivos del frontend requiere incrementar la versión de caché (`CACHE_NAME`) en `sw.js`.
4. **Enfoque Fluidez Primero (80/20):** Cada interfaz debe reducir la latencia cognitiva del usuario, ayudándole a asociar, pronunciar y hablar sin traducir mentalmente.

---

# 🛠️ SPRINT 2: El Puente Léxico y la Fonética en la PWA (Próximas 24-48h)

> **Objetivo del Sprint:** Vincular el léxico formal latino con los phrasal verbs, destapar el oído con las ligaduras de *Connected Speech* y permitir machacar oraciones difíciles en bucle individual.

---

## Tarea S2.1 (Rank 4 / ID 1.3) — Contraste de Registro: Phrasal Verb vs. Verbo Formal Latino

### 1. Objetivo Pedagógico
Permitir que el hispanohablante conecte de inmediato el *phrasal verb* con el verbo formal de raíz latina que ya conoce (*postpone ➔ put off*, *investigate ➔ look into*, *cancel ➔ call off*), duplicando su vocabulario activo sin esfuerzo memorístico.

### 2. Archivos a Modificar / Crear
- `scripts/enrich_formal_synonyms.js` *(Nuevo script Node.js)*
- `phrasal_verbs_data.json` *(Modificado: nuevo campo `formal_synonyms`)*
- `scripts/normalize_data.js` *(Modificado: propagación a knowledge.txt)*
- `index.html` *(Modificado: renderizado en tarjeta y modal)*

### 3. Paso a Paso Técnico Detallado
1. **Extracción y cruce de datos (Offline):**
   - Crear script `scripts/enrich_formal_synonyms.js` que descargue o lea el archivo `phrasal.verbs.build.json` del repositorio `WithEnglishWeCan/generated-english-phrasal-verbs`.
   - Para cada uno de los 153 phrasal verbs en `phrasal_verbs_data.json`, buscar coincidencias en sus sinónimos formales (ej. para *put off*: `["postpone", "delay"]`; para *call off*: `["cancel"]`; para *look into*: `["investigate"]`).
   - Guardar como array `formal_synonyms: string[]` en cada registro (ej. `formal_synonyms: ["postpone", "delay"]`).
   - Si no hay sinónimo formal nativo en el dataset para algún verbo específico, proveer un diccionario curado manual de respaldo para los 153 verbos.
2. **Actualización de pipeline:**
   - En `scripts/normalize_data.js`, propagar `formal_synonyms` en `phrasal_verbs_knowledge.txt`:
     `lines.push(`- Equivalentes formales latinos: ${item.formal_synonyms.join(', ')}`);`
   - Ejecutar `node scripts/normalize_data.js` para sincronizar `data.js` y `phrasal_verbs_knowledge.txt`.
   - **Vendorizar el dataset externo:** descargar `phrasal.verbs.build.json` una sola vez y commitearlo en `scripts/vendor/` (no hacer fetch en cada ejecución) para que el pipeline siga siendo reproducible offline y no dependa de que el repo de `WithEnglishWeCan` siga disponible o sin cambios. Si el cruce automático no cubre alguno de los 153 verbos, completar el diccionario curado manual de respaldo como una sub-tarea propia con su propio tiempo estimado (revisar 153 entradas manualmente no es "Bajo" esfuerzo si el cruce automático falla en más de ~20).
3. **Búsqueda global — incluir el nuevo campo:**
   - En `applyFilters()` (`index.html:1484-1491`, la función real que hace el matching — `onSearch()` solo la invoca), añadir a `matchesQuery`:
     `item.formal_synonyms?.some(s => s.toLowerCase().includes(query))`
4. **Renderizado en la PWA (`index.html`):**
   - En la tarjeta (`renderCards`): añadir debajo del significado en español una píldora discreta:
     `<div class="formal-bridge"><span class="bridge-label">Formal latino:</span> <span class="bridge-words">${item.formal_synonyms.join(', ')}</span></div>`
   - En el modal de detalle (`openDetails`): destacar el puente de registro en la cabecera:
     `👔 Formal: postpone | 🗣️ Cotidiano: put off`
   - Estilos CSS: fondo sutil (`rgba(255, 255, 255, 0.05)`), texto monospace o cursiva con color secundario.

### 4. Criterios de Aceptación y Verificación
- [ ] Al abrir `index.html`, las tarjetas muestran el sinónimo formal si existe (ej. *call off* muestra *cancel*).
- [ ] La búsqueda global de la PWA (`onSearch`) permite escribir *"postpone"* o *"cancel"* y encuentra la tarjeta correspondiente de *put off* o *call off*.
- [ ] `phrasal_verbs_knowledge.txt` contiene los sinónimos formales para que Claude/ChatGPT los conozca en los roleplays.

---

## Tarea S2.2 (Rank 5 / ID 2.4) — Resaltado Visual de *Connected Speech* (`‿`) en Frases

### 1. Objetivo Pedagógico
Enseñar al cerebro del usuario a anticipar cómo suena el inglés real encadenado (*"Tu**r**n‿**o**ff"*, *"Pi**c**k‿**i**t‿**u**p"*), eliminando el hábito de leer palabra por palabra de forma entrecortada y acelerando la comprensión del audio nativo.

### 2. Archivos a Modificar
- `index.html` *(Modificado: función formateadora de texto y reglas CSS)*

### 3. Paso a Paso Técnico Detallado
1. **Lógica de detección fonética (Regex ligero):**
   - Crear función `formatConnectedSpeech(text)` en el script de `index.html`:
     - Detecta patrones donde una palabra termina en consonante (o sonido consonántico como *k, t, p, d, n, m, r, l, s, v, z, b, g*) y la siguiente palabra empieza por vocal (*a, e, i, o, u*).
     - **Excluir explícitamente los límites de frase:** no enlazar si entre ambas palabras hay puntuación (`.`, `,`, `;`, `:`, `!`, `?`) o si pertenecen a oraciones distintas — tokenizar por frase (split en signos de puntuación) antes de aplicar el regex de enlace, para no encadenar visualmente el final de una oración con el inicio de la siguiente.
     - Especial énfasis en el phrasal verb y sus pronombres intercalados: `(verb) + (it/us/up/on/in/out/off/away)`.
     - Reemplazar el espacio intermedio por una ligadura visual estilizada: `<span class="link-token">word1<span class="speech-tie">‿</span>word2</span>` o subrayado continuo.
2. **Estilos CSS (`index.html`):**
   ```css
   .speech-tie {
     color: var(--accent);
     font-weight: 700;
     margin: 0 -1px;
     font-size: 0.9em;
     user-select: none;
   }
   .linked-word {
     border-bottom: 1.5px dotted var(--accent);
   }
   ```
3. **Interruptor de Modo (Toggle):**
   - Añadir en el modal de drills un botón pequeño de alternancia: `[🔗 Enlaces: ON/OFF]` para que el usuario pueda activar o desactivar la ayuda visual de *Connected Speech* a voluntad.
4. **Aplicación en vistas:**
   - Aplicar `formatConnectedSpeech()` en la lista de oraciones del modal de práctica y en el Modo Enfoque Calle (`focusOverlay`).

### 4. Criterios de Aceptación y Verificación
- [ ] En la frase *"Pick it up"*, se renderiza claramente *"Pick‿it‿up"* con la ligadura destacada.
- [ ] En la frase *"Turn off the light"*, se visualiza *"Turn‿off"*.
- [ ] El toggle `[🔗 Enlaces]` conmuta la vista entre texto plano y texto con ligaduras en tiempo real sin recargar la app.
- [ ] No rompe las funciones de síntesis de voz (TTS) ni el reconocimiento de voz (la lectura interna sigue siendo texto limpio).

---

## Tarea S2.3 (Rank 6 / ID 2.2) — Bucle Frase a Frase (Audio Loop por Oración)

### 1. Objetivo Pedagógico
Permitir que el alumno repita una sola oración difícil 5 a 10 veces continuas hasta fijar la musculatura bucal y la entonación exacta, sin tener que esperar a que termine el audio completo de 10 frases.

### 2. Archivos a Modificar
- `index.html` *(Modificado: refactor de `speakDrillPhrase` para aceptar callback, y controles de bucle por frase inline en la plantilla de `openDetails`, que es la función real que renderiza la lista de drills — no existe `renderModalDrills` como función separada)*

### 3. Paso a Paso Técnico Detallado
1. **Estado del reproductor de frase:**
   - Añadir variables de control en JS:
     `let loopingPhraseIndex = null;`
     `let isPhraseLooping = false;`
2. **Refactorizar `speakDrillPhrase` para soportar callback:**
   - La función real hoy (`index.html:1743-1746`) es `speakDrillPhrase(index)` y llama a `speakText(text)` sin `onEnd`. Cambiarla a `speakDrillPhrase(index, onEnd)` que reenvíe el callback: `speakText(activeModalItem.drills[index].en, onEnd)` (`speakText` ya soporta `onEnd`, solo falta propagarlo).
3. **Botón de Bucle en cada frase (dentro del `.map()` de `drillsContainer.innerHTML` en `openDetails`, `index.html:1645-1661`):**
   - Junto a los botones de audio (`🔊`) y micrófono (`🎙️`) de cada frase, añadir un botón de bucle:
     `<button class="btn-drill-act btn-loop-phrase" id="loop-btn-${i}" onclick="togglePhraseLoop(${i})" title="Repetir esta frase en bucle">🔁</button>`
4. **Lógica de repetición en bucle:**
   - Función `togglePhraseLoop(index)`:
     - **Si ya hay otra frase en bucle (`loopingPhraseIndex !== null && loopingPhraseIndex !== index`), detenerla primero** (`stopPhraseLoop()`) para evitar que dos audios se solapen.
     - Si el índice pulsado ya está activo, lo desactiva (`stopPhraseLoop()`).
     - Si se activa, marca visualmente el botón con clase `.active` (borde azul brillante) y desmarca el botón de cualquier frase que estuviera en bucle antes.
     - Llama a `speakDrillPhrase(index, onEndCallback)`:
       - Cuando termina la locución, espera una pausa calculada de 1.5 segundos (tiempo para que el usuario repita en voz alta).
       - Si `isPhraseLooping` sigue activo, vuelve a invocar `speakDrillPhrase(index)`.
5. **Detención automática:**
   - Detener el bucle automáticamente si el usuario cierra el modal, pulsa reproducir en el reproductor principal, activa el micrófono de reconocimiento, o activa el bucle de otra frase (ver paso 4).

### 4. Criterios de Aceptación y Verificación
- [ ] Al pulsar `🔁` en la Frase #3, la frase suena, espera 1.5s (silencio para que el usuario repita) y vuelve a sonar indefinidamente.
- [ ] Al pulsar de nuevo el botón `🔁`, la repetición se detiene de inmediato.
- [ ] Al pulsar `🔁` en la Frase #5 mientras la Frase #3 está en bucle, la Frase #3 se detiene automáticamente (sin audios solapados) y arranca el bucle de la Frase #5.
- [ ] Al abrir el micrófono para grabar la frase o al cerrar el modal, el bucle se cancela de forma limpia sin solapamiento de audio.

---

# 🧠 SPRINT 3: Automatización de Reflejos y Retención (Días 3-5)

> **Objetivo del Sprint:** Erradicar la duda con las partículas mediante tests de latencia rápida (1s), guiar el ciclo metodológico de 3 pasadas, generar historias con la IA y programar el repaso espaciado diario.

---

## Tarea S3.1 (Rank 7 / ID 2.3) — Modo Cloze: Test Rápido de Partícula (1 segundo)

### 1. Objetivo Pedagógico
Automatizar la selección de partícula (*up, off, out, in, away, down*) como un reflejo condicionado instantáneo para que al hablar no haya pausas ni titubeos.

### 2. Archivos a Modificar
- `index.html` *(Nuevo modal / vista `clozeModal` con lógica de juego rápido)*

### 3. Paso a Paso Técnico Detallado
1. **Generación dinámica de ejercicios Cloze:**
   - Extraer de las oraciones de `window.PHRASAL_DATA` la frase en inglés ocultando la partícula:
     - **No usar un reemplazo global `\bup\b`**: si la partícula aparece más de una vez en la frase (p. ej. como preposición suelta y también como parte del phrasal verb), un reemplazo global oculta u oculta mal la palabra equivocada. En su lugar, anclar la búsqueda a la posición inmediatamente posterior al `base_verb` del item (`new RegExp('\\b' + item.base_verb + '\\s+(' + item.particle + ')\\b', 'i')`) y ocultar solo esa ocurrencia concreta.
     - Ejemplo: si el verbo es `go up`, ocultar el `up` que sigue a `go`, no cualquier `up` suelto en el resto de la frase.
     - Mostrar la traducción en español completa arriba.
2. **Generación de distractores inteligentes:**
   - La opción correcta es la partícula del verbo actual (`item.particle`).
   - Seleccionar 3 distractores aleatorios de la lista común de partículas: `["up", "down", "in", "out", "off", "on", "away", "back", "over"]`.
   - Barajar las 4 opciones en botones táctiles grandes.
3. **Mecánica de latencia (Temporizador de 2 segundos):**
   - Barra de tiempo decreciente visual.
   - Si acierta en < 1.5s: `+100 pts` y sonido/vibración de éxito.
   - Si falla o se agota el tiempo: muestra la partícula correcta en rojo y la pronuncia por TTS.
   - Rondas de 10 frases rápidas (sesión de 60 segundos).

### 4. Criterios de Aceptación y Verificación
- [ ] Botón en la barra superior o cabecera: `⚡ Test Partículas`.
- [ ] Muestra 10 preguntas sucesivas sin recargar la página.
- [ ] Al pulsar la opción correcta, pasa a la siguiente en menos de 300ms.
- [ ] Al final muestra el resumen: *"9/10 acertadas. Tiempo medio: 1.1s"*.

---

## Tarea S3.2 (Rank 8 / ID 2.1) — Metodología de Shadowing en 3 Pasadas (Understand ➔ Listen ➔ Shadow)

### 1. Objetivo Pedagógico
Estructurar la hora libre de práctica diaria en una rutina neuromuscular probada que lleve al alumno desde la comprensión conceptual hasta la imitación fonética a ciegas.

### 2. Archivos a Modificar
- `index.html` *(Modificado: componente de navegación de fases en el modal de drills)*

### 3. Paso a Paso Técnico Detallado
1. **Control visual de fases (Pills 1-2-3):**
   - En la parte superior del modal de práctica, insertar una barra segmentada de progreso:
     `[1. Comprender] ➔ [2. Escuchar] ➔ [3. Shadowing]`
2. **Comportamiento automático por fase:**
   - **Fase 1 (Understand):**
     - Español: Visible al 100%.
     - Inglés: Visible al 100%.
     - Velocidad: 1.0x.
     - Enfoque: Leer y asociar significado.
   - **Fase 2 (Listen):**
     - Español: Oculto.
     - Inglés: Visible con *Connected Speech* activado.
     - Velocidad: 0.9x.
     - Enfoque: Escuchar ritmo, pausas y elisiones.
   - **Fase 3 (Blind Shadowing):**
     - Español: Oculto.
     - Inglés: Totalmente desenfocado, **reutilizando la clase `.blurred` y el botón `toggleBlurAll()` ya existentes** (`index.html:1648, 1689-1694`) en vez de introducir un mecanismo de blur nuevo y paralelo. Al entrar en Fase 3, forzar `blurEnglish = true` y aplicar `.blurred` a todas las `.drill-en`; al salir de Fase 3 (retroceder a Fase 1/2), restaurar el estado de blur que tuviera el usuario antes.
     - El click-to-reveal por línea (`onclick="this.classList.toggle('blurred')"`, ya presente en cada `.drill-en`) sigue funcionando igual dentro de la Fase 3 — es precisamente el mecanismo de "tocar la frase desvela el texto para auto-comprobar" que pide esta fase, no hay que reimplementarlo.
     - Audio: Se reproduce la frase; el usuario debe hablar por encima con un retardo de medio segundo.

### 4. Criterios de Aceptación y Verificación
- [ ] Al seleccionar "Fase 3 (Shadowing)", todas las frases en inglés quedan con la clase `.blurred` (reutilizando `toggleBlurAll`) y las frases en español se ocultan automáticamente.
- [ ] Al volver de la Fase 3 a la Fase 1, el estado de blur manual previo del usuario (si lo había fijado con el botón "👁️ Ocultar/Mostrar Inglés") se restaura sin quedar forzado a "oculto" permanentemente.
- [ ] Un botón "Siguiente Fase" permite avanzar fluidamente por el ciclo 1 ➔ 2 ➔ 3.

---

## Tarea S3.3 (Rank 9 / ID 4.2) — Generador de Micro-Lecturas e Historias i+1

### 1. Objetivo Pedagógico
Producir diálogos conversacionales a medida de nivel A2/B1 que conecten coherentemente los 3-5 verbos que el alumno tiene en estado 🔴 Focus, para practicarlos en un contexto situacional real con Claude o ChatGPT.

### 2. Archivos a Modificar
- `index.html` *(Modificado: botón y modal de exportación de prompt dinámico)*

### 3. Paso a Paso Técnico Detallado
1. **Lógica de recolección de verbos en 🔴 Focus:**
   - Filtrar los elementos de `window.PHRASAL_DATA` cuyo estado en `localStorage` sea `focus`.
   - Si no hay ninguno, tomar los 3 verbos en progreso más recientes.
2. **Construcción del Prompt optimizado i+1:**
   - Generar texto con la siguiente plantilla:
     > *"Actúa como mi tutor de inglés. Escribe un diálogo cotidiano de nivel A2/B1 de 10 líneas ambientado en [trabajo/viaje] que incluya de forma obligatoria y natural estos phrasal verbs: [LISTA_VERBOS_FOCUS]. Resalta cada phrasal verb en negrita y añade su equivalente formal entre corchetes. Al terminar de leerlo, lánzamelo frase a frase para hacer shadowing oral."*
3. **Botón en interfaz:**
   - En el panel de estado o modal de Sync: botón `📝 Generar Historia i+1 con mis Focus`.
   - Al pulsar, copia el prompt al portapapeles y abre ChatGPT / Claude.

### 4. Criterios de Aceptación y Verificación
- [ ] Con 3 verbos marcados en rojo, pulsar el botón genera el prompt con los nombres exactos de esos 3 verbos y sus significados.
- [ ] Muestra notificación Toast: *"Prompt de Historia i+1 copiado al portapapeles"*.

---

## Tarea S3.4 (Rank 10 / ID 1.1) — Fonética IPA Integrada en Tarjetas (Verbo + Partícula)

### 1. Objetivo Pedagógico
Proporcionar una referencia visual inequívoca de cómo se pronuncian el verbo y la partícula tanto en inglés británico (RP) como en inglés americano (US), despejando dudas sobre vocales y letras mudas.

### 2. Archivos a Modificar
- `scripts/enrich_ipa.js` *(Nuevo script)*
- `phrasal_verbs_data.json` *(Modificado: campo `ipa: { uk: string, us: string }`)*
- `scripts/normalize_data.js` *(Modificado: propagación)*
- `index.html` *(Modificado: diseño en tarjeta)*

### 3. Paso a Paso Técnico Detallado
1. **Script de cruce fonético (`scripts/enrich_ipa.js`):**
   - Vendorizar `en_US.txt` y `en_UK.txt` una sola vez en `scripts/vendor/` (no hacer fetch en cada ejecución) para mantener el pipeline reproducible offline.
   - Leer `en_US.txt` y `en_UK.txt` del dataset [`open-dict-data/ipa-dict`](https://github.com/open-dict-data/ipa-dict).
   - Para cada phrasal verb, buscar la transcripción del verbo base y de la partícula y combinarlas con su ligadura:
     - Ej. *give up* ➔ UK: `/ɡɪv ʌp/`, US: `/ɡɪv ʌp/`.
     - Ej. *turn off* ➔ UK: `/tɜːn ɒf/`, US: `/tɜːrn ɔːf/`.
   - Guardar en `phrasal_verbs_data.json` bajo la clave `ipa`.
2. **Propagación:**
   - Ejecutar `node scripts/normalize_data.js`.
3. **Visualización en `index.html`:**
   - Renderizar debajo del título del verbo en el modal y la tarjeta:
     `<span class="ipa-badge" title="Pronunciación IPA">/ɡɪv ʌp/</span>`
   - Estilo: tipografía monoespaciada suave, color atenuado.

### 4. Criterios de Aceptación y Verificación
- [ ] Cada modal de práctica muestra la transcripción IPA exacta.
- [ ] Las diferencias de pronunciación notables (ej. *turn* con o sin 'r' rótica) se reflejan con precisión.

---

## Tarea S3.5 (Rank 11 / ID 3.1) — Repaso Espaciado Ligero FSRS/SM-2 en PWA

### 1. Objetivo Pedagógico
Optimizar el tiempo de estudio diario: la app calcula automáticamente qué verbos están en riesgo de olvido y genera una cola diaria de revisión (*"Tus 12 verbos para hoy"*), eliminando la fatiga de decidir qué estudiar.

### 1.1 Decisión de Arquitectura de Datos (obligatoria antes de programar)
Ya existe una única fuente de verdad para el dominio de cada verbo: `cardStatuses` (`localStorage['phrasal_card_statuses']`), sincronizada por webhook a la hoja `Phrasal_Verbs_Progress` de Google Drive, que es exactamente lo que `ai-prompt.md` (línea 52) consulta para decidir qué practicar con el tutor de IA. La SRS **no debe crear un segundo estado de dominio en paralelo** — si lo hiciera, la PWA y el tutor de IA verían dos verdades distintas y desincronizadas sobre qué tan bien sabe el usuario cada verbo.

Por eso la SRS se divide en dos capas con responsabilidades distintas:
- **Capa de dominio (existente, sin tocar su esquema):** `cardStatuses` — sigue siendo lo único que define 🔴/🟡/🟢 y lo único que se sincroniza a Drive/IA.
- **Capa de programación temporal (nueva, exclusiva de la PWA):** `phrasal_srs_data` en `localStorage` — solo guarda `interval`, `repetitions`, `easeFactor`, `dueDate` por verbo. Es un dato *interno de cuándo mostrar la tarjeta de nuevo*, no de *qué tan dominado está*; por eso no se sincroniza a Drive ni necesita aparecer en `ai-prompt.md`.
- **Puente entre capas:** calificar en la SRS **reutiliza el mismo camino que ya usa el quiz de latencia** (`rateQuizAnswer()` → `setCardStatus(id, rating)` → `applyCardStatus()`, `index.html:2087-2132`), en vez de inventar un escritor de estado nuevo. Mapeo de rating a estado de dominio:
  - `1 Otra vez` ➔ `applyCardStatus(id, 'focus')`
  - `2 Difícil` ➔ `applyCardStatus(id, 'focus')` si `repetitions < 2`, si no `'in_progress'`
  - `3 Bien` ➔ `applyCardStatus(id, 'in_progress')`
  - `4 Fácil` ➔ `applyCardStatus(id, 'mastered')` solo si `repetitions >= 2` (evita marcar Dominado tras un solo acierto)
  - Esto dispara `scheduleAutoSync()` automáticamente (ya integrado en `applyCardStatus`), así que el rating de la SRS llega a Drive y al tutor de IA sin código nuevo de sincronización.

### 2. Archivos a Modificar / Crear
- `srs.js` *(Nuevo módulo Vanilla JS ligero con el scheduler FSRS/SM-2 simplificado — solo calcula `interval`/`dueDate`, nunca decide 🔴/🟡/🟢)*
- `index.html` *(Modificado: botones de evaluación de repaso, chip de filtro diario, y llamada a `applyCardStatus` desde el rating de la SRS)*

### 3. Paso a Paso Técnico Detallado
1. **Módulo `srs.js` (~120 líneas, Vanilla JS):**
   - Implementar el algoritmo SM-2 / FSRS simplificado:
     - Parámetros por verbo guardados en `localStorage['phrasal_srs_data']`: `interval` (días), `repetitions` (conteo), `easeFactor` (factor de facilidad, inicial 2.5), `dueDate` (timestamp ISO de próxima revisión).
   - Función `rateItem(verbId, rating)`:
     - `rating`: 1 (Again / Difícil), 2 (Hard), 3 (Good), 4 (Easy).
     - Calcula el nuevo `interval`/`dueDate` **y devuelve el `newStatus` de dominio correspondiente** según el mapeo de la sección 0, para que quien la llame haga el puente con `applyCardStatus`.
2. **Filtro inteligente en la cabecera:**
   - Añadir chip en la barra de filtros:
     `<div class="filter-chip seg" id="chipFilterDue" onclick="filterDueToday()">📅 Repasar Hoy (<span id="dueCount">0</span>)</div>`
   - Al pulsarlo, muestra únicamente los verbos cuya fecha `dueDate <= hoy` (leído de `phrasal_srs_data`, no de `cardStatuses`).
3. **Definición explícita de "drill completado" (evento disparador):**
   - Se considera completado cuando el usuario ha pulsado `🔊 Escuchar` (o ha terminado el bucle S2.3) en **todas** las frases del drill al menos una vez en la sesión actual. Mantener un `Set` de índices reproducidos en `activeModalItem`; al alcanzar el tamaño de `drills.length`, revelar los botones de calificación.
4. **Botones de calificación al terminar un drill:**
   - Mostrar los 4 botones de evaluación rápida:
     `[🔴 Otra vez (1d)]` `[🟡 Difícil (2d)]` `[🟢 Bien (4d)]` `[⭐ Fácil (7d)]`
   - Al pulsar uno: llamar a `rateItem(verbId, rating)` (actualiza `phrasal_srs_data`) **y** `setCardStatus(verbId, newStatus)` (actualiza `cardStatuses` + dispara sync a Drive), luego avanzar automáticamente al siguiente verbo pendiente de la cola.

### 4. Criterios de Aceptación y Verificación
- [ ] Al calificar un verbo como "Bien", su próxima fecha (`phrasal_srs_data`) se programa para dentro de varios días **y** su estado en `cardStatuses` pasa a `in_progress`, visible también en el chip de estado de la tarjeta.
- [ ] El contador *"Repasar Hoy"* refleja exactamente cuántos verbos tienen `dueDate` vencida en `phrasal_srs_data`.
- [ ] Tras calificar, `scheduleAutoSync()` se dispara (verificar en consola o en el timestamp de "Última sincronización") sin necesidad de tocar el botón de sync manual.
- [ ] Funciona 100% offline y almacena ambos estados en `localStorage` sin depender de ningún servidor.

---

# 🎬 SPRINT 4: Enriquecimiento Curricular y Gamificación (Siguiente Fase)

> **Objetivo del Sprint:** Vincular los verbos con el marco oficial CEFR (alineado con Conquer A2), integrar citas de series de televisión y gamificar la constancia diaria con rachas y mapas de calor.

---

## Tarea S4.1 (Rank 12 / ID 1.2) — Mapeo de Niveles CEFR (A1-C1) y Filtro A2
- **Archivos:** `scripts/enrich_cefr.js`, `phrasal_verbs_data.json`, `index.html`.
- **Detalle:** Vendorizar el dataset `Talhakasikci/cefr-vocabulary-dataset` una sola vez en `scripts/vendor/` (no fetch en cada ejecución). Cruzar los 153 verbos con él. Etiquetar cada verbo con su nivel oficial (A1, A2, B1, B2, C1) — si algún verbo no aparece en el dataset, completar manualmente esa entrada en vez de dejarla sin nivel. Añadir selector desplegable en filtros: *"Filtrar por nivel: A2 (Conquer)"*.
- **Verificación:** El usuario puede pulsar "A2" y ver exactamente los ~45 verbos correspondientes a su nivel actual de clases en vivo.

---

## Tarea S4.2 (Rank 13 / ID 1.4) — Citas y Contextos Reales de Películas/Series
- **Archivos:** `scripts/enrich_media_quotes.js`, `phrasal_verbs_data.json`, `index.html`.
- **Detalle:** Vendorizar el dataset `Vlad-Vasinev/real-english-idioms` una sola vez en `scripts/vendor/` (no fetch en cada ejecución). Extraer citas e insertarlas en una pestaña *"🎬 En la pantalla"* en el modal de detalle (ej. escena de *Friends* o *The Office* donde un personaje usa ese phrasal verb exacto). No todos los 153 verbos tendrán cita disponible — eso es esperado, no un fallo del script.
- **Verificación:** En los verbos con cita disponible, aparece una tarjeta estilizada con la cita y el nombre de la serie/personaje.

---

## Tarea S4.3 (Rank 14 / ID 3.2) — Historial de Racha 🔥 y Estadísticas de Práctica Oral
- **Archivos:** `index.html` (modal de estadísticas).
- **Detalle:**
  - Registrar timestamp de cada día con al menos 1 práctica oral completada.
  - Contador de racha: *"🔥 5 días consecutivos practicando"*.
  - Gráfico visual tipo matriz (heatmap) de los 153 verbos con sus estados de dominio y repetición.
- **Verificación:** La racha se incrementa al practicar hoy y se reinicia si pasa más de 48 horas sin actividad.

---

## 📊 Matriz Resumen de Ficheros Afectados por Sprint

| Archivo / Componente | Sprint 2 | Sprint 3 | Sprint 4 | Tipo de Operación |
| :--- | :---: | :---: | :---: | :--- |
| `phrasal_verbs_data.json` | **x** | **x** | **x** | Enriquecimiento de campos (formal, ipa, cefr, quotes) |
| `scripts/normalize_data.js` | **x** | **x** | **x** | Propagación de nuevos campos a artifacts |
| `data.js` | **x** | **x** | **x** | Build artifact generado automáticamente |
| `phrasal_verbs_knowledge.txt` | **x** | **x** | - | Build artifact para Knowledge de Claude/GPT |
| `index.html` (CSS / DOM / JS) | **x** | **x** | **x** | Lógica visual e interactiva del cliente |
| `srs.js` *(Nuevo archivo)* | - | **x** | - | Algoritmo de repetición espaciada FSRS/SM-2 |
| `sw.js` | **x** | **x** | **x** | Bump de versión de caché en cada despliegue |

---

## 🚦 Orden Estricto de Ejecución Recomendado

1. **Sprint 2 - Tarea S2.1:** Contraste Formal Latino (máxima palanca de vocabulario activo).
2. **Sprint 2 - Tarea S2.2:** Ligaduras de *Connected Speech* (destapa el oído y la dicción).
3. **Sprint 2 - Tarea S2.3:** Bucle Frase a Frase (reiteración neuromuscular).
4. **Sprint 3 - Tarea S3.1:** Modo Cloze de Partícula (eliminación de vacilaciones).
5. **Sprint 3 - Tarea S3.2:** Metodología 3 Pasadas (protocolo de estudio autónomo).
6. **Sprint 3 - Tarea S3.5:** Repaso Espaciado (planificación automática diaria).
7. **Sprint 3 - Tareas S3.3 y S3.4:** Historias i+1 y fonética IPA.
8. **Sprint 4 - Tareas S4.1 a S4.3:** Niveles CEFR, citas de series y estadísticas de racha.
