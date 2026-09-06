# ⚡ Phrasal Verbs Coach

Sistema integral para dominar **153 Phrasal Verbs** a través de **306 audios nativos**, estructurados tanto para escucha activa/pasiva en la calle (vía PWA móvil/PC) como para entrenamiento por voz con IA (**ChatGPT Voice** y **Claude Voice**) sin malgastar tokens de audio.

---

## 🎯 Estructura Pedagógica del Curso (En Parejas)

Los 306 archivos de audio (`malditos_phrasal/`) cubren 153 phrasal verbs organizados en parejas complementarias:

1. **Pistas Impares (#1, #3, #5... #305) — 🎯 Práctica Guiada (Drills):**
   * El profesor lanza el disparador en español y el alumno responde en inglés con 8 a 10 frases bilingües.
   * Diseñado para *Active Recall* y *Shadowing*.
2. **Pistas Pares (#2, #4, #6... #306) — 📖 Historia en Contexto:**
   * Narración continua, anécdota, diálogo o chiste donde el phrasal verb se repite en situaciones de la vida real.
   * Diseñado para entrenamiento auditivo continuo y comprensión contextual.

---

## 🚀 Modos de Estudio

### 1. En la Calle / Desplazamientos (PWA Móvil)
* **Acceso:** [https://ldesdunes.github.io/LearnEnglish/](https://ldesdunes.github.io/LearnEnglish/)
* **Instalación:** Abre el enlace en Safari (iOS) o Chrome (Android) y pulsa **"Añadir a la pantalla de inicio"**. Se comporta como una app nativa con su icono.
* **Características y Herramientas de Fluidez:**
  * **🗣️ Hands-Free Shadowing (Auto-Pausa):** Pulsa un botón y la app reproduce cada frase en inglés, hace una pausa calculada con barra de progreso visual (*"¡Tu turno! Repite en voz alta..."*) y pasa automáticamente a la siguiente frase sin tocar la pantalla.
  * **🎯 Metodología de Shadowing en 3 Pasadas:** Barra de fases *1. Comprender → 2. Escuchar → 3. Shadowing* dentro del propio modal de práctica: oculta progresivamente el español, activa Connected Speech y fuerza el desenfoque del inglés para pasar de la comprensión a la imitación fonética a ciegas.
  * **🔊 Audio Frase a Frase + Bucle:** Escucha cualquier frase de forma aislada a la velocidad que elijas (0.8x, 1.0x, 1.2x), o actívala en **bucle continuo** (🔁) para machacarla hasta que salga con fluidez (el bucle de una frase se detiene solo al activar otra).
  * **🎙️ Feedback de Pronunciación In-App:** Pulsa el micrófono en cualquier frase, pronuncia en inglés y recibe retroalimentación instantánea (palabras acertadas en verde, fallos en rojo y porcentaje de precisión).
  * **🔗 Connected Speech Visual:** Ligaduras (*went‿up*, *back‿up*) que muestran cómo se enlazan las palabras al hablar rápido, con toggle ON/OFF, para destapar el oído ante el inglés nativo.
  * **👔 Puente Léxico Formal → Phrasal Verb:** Cada tarjeta muestra el verbo formal de raíz latina que ya conoces (*postpone → put off*), también buscable desde el buscador.
  * **🔤 Transcripción Fonética IPA (UK/US):** Pronunciación exacta de verbo + partícula en ambas variantes.
  * **🗖 Modo Enfoque Calle / Pantalla Completa:** Vista minimalista con tipografía grande y fondo oscuro pensada para practicar mientras caminas.
  * **⚡ Quiz de Latencia (Entrenador de Reflejos):** Temporizador de 3 segundos para responder la frase en inglés antes de que se muestre la solución, acelerando la velocidad de respuesta oral.
  * **🧩 Test Rápido de Partícula (Modo Cloze):** Minijuego de 10 preguntas con temporizador de 2 segundos para automatizar la elección de partícula (*up, off, in, out...*) como reflejo, con resumen de aciertos y tiempo medio de respuesta.
  * **📅 Repaso Espaciado (SRS):** Cola "Repasar Hoy" calculada con un algoritmo SM-2 ligero; al calificar tu fluidez tras completar un drill, la próxima fecha de repaso se reprograma automáticamente y tu nivel de dominio se actualiza en el mismo sistema que ya sincroniza con Drive.
  * **📝 Generador de Historias i+1:** Un botón crea (y copia al portapapeles) un prompt listo para pegar en ChatGPT/Claude que teje un diálogo con tus verbos marcados en 🔴 Focus.
  * **🔥 Racha y Mapa de Dominio:** Contador de días consecutivos de práctica oral y un mapa de calor con el estado (🔴🟡🟢) de los 153 verbos de un vistazo.
  * **🔴 🟡 🟢 Sistema de Dominio y Sincronización Transparente:** Marca tu nivel en 1 toque (Focus, Progreso, Dominado) y sincronízalo automáticamente en segundo plano con tu Google Drive para que ChatGPT y Claude conozcan tus puntos débiles.
  * **Buscador semántico:** Busca por intención en español (*"cancelar"*, *"subir"*, *"aguantar"*), por verbo en inglés, por su equivalente formal latino o por ID.
  * **Filtros rápidos:** Filtra por estado de dominio (🔴 Focus, 🟡 Progreso, 🟢 Dominados), verbos pendientes de repaso (📅 Repasar Hoy), nivel CEFR (A1-C1), familias (*GET, PUT, TAKE, GO, TURN, COME, LOOK*), situaciones (*Movimiento, Trabajo, Relaciones...*) o tipo (*Solo Prácticas* vs *Solo Historias*).
  * **Reproductor:** Control de velocidad (0.8x, 1.0x, 1.2x), retroceso/avance ±5s, repetición en bucle (*loop*) y modo aleatorio (🎲 Azar).
  * **Active Recall:** Toca cualquier frase en inglés para ocultarla/mostrarla (*blur*), poniéndote a prueba antes de escucharla.

### 2. En Casa con ChatGPT o Claude (Entrenamiento por Voz)
Optimizado para no consumir tokens generando audio con IA cuando ya tienes los MP3s:
1. Sube **`phrasal_verbs_knowledge.txt`** y **`pwa_guide.txt`** a tu **Custom GPT (Knowledge)** o a tu **Claude Project (Knowledge)**.
2. Copia las instrucciones de **`ai-prompt.md`** en las instrucciones del sistema (se mantiene deliberadamente bajo 8.000 caracteres; el detalle de las herramientas de la PWA y de los vicios fonéticos vive en `pwa_guide.txt`, referenciado desde el prompt).
3. Abre la app móvil o de escritorio de ChatGPT o Claude, activa el modo voz y dile:
   * *"Vamos con el phrasal verb 45"*
   * *"Quiero practicar phrasal verbs para reuniones de trabajo"*
   * *"¿Qué phrasal verb usamos para cancelar algo? Lánzame sus ejercicios"*
   * *"Dame el siguiente de la lista para shadowing"*
   * Comandos rápidos de voz: *"Modo Shadowing"*, *"Modo Roleplay"*, *"Explícame la Partícula"*, *"Examen Rápido"*, *"Clínica de Errores"*.
4. La IA actuará como tu profesor particular: te lanzará la frase en español, escuchará tu pronunciación en inglés, te dará retroalimentación instantánea (incluyendo corrección proactiva de los 4 vicios fonéticos típicos del hispanohablante: prótesis de 'e', vocales tensas/laxas, consonantes finales y acento en la partícula) y pasará a la siguiente frase. Al cierre de cada sesión, resume en una "Clínica de Errores" los 2 patrones más recurrentes del día.

---

## 📁 Archivos del Proyecto

| Archivo / Carpeta | Descripción |
| :--- | :--- |
| `index.html` | Interfaz de la PWA (buscador, reproductor, filtros, tarjetas interactivas, Modo Cloze, estadísticas). |
| `data.js` | Base de datos embebida con los 306 registros para carga ultrarrápida offline. |
| `phrasal_verbs_data.json` | Base de datos completa en JSON: metadatos, tags, pares bilingües, sinónimos formales, IPA y nivel CEFR. |
| `phrasal_verbs_knowledge.txt` | Archivo de conocimiento maestro estructurado para subir a Claude y ChatGPT. |
| `ai-prompt.md` | Prompt de sistema del tutor de voz (< 8.000 caracteres): dinámica de shadowing, comandos rápidos y detección de vicios fonéticos. |
| `pwa_guide.txt` | Referencia de Knowledge complementaria a `ai-prompt.md`: detalle de cada herramienta de la PWA (cuándo recomendarla) y de los 4 vicios fonéticos con ejemplos IPA. |
| `srs.js` | Módulo de repaso espaciado (SM-2 ligero) que calcula solo *cuándo* repasar cada verbo; el estado de dominio sigue viviendo en `cardStatuses`. |
| `malditos_phrasal/` | Carpeta con los 306 audios originales en formato MP3 (~190 MB). |
| `manifest.json` + `sw.js` + `icon.svg` | Configuración PWA para instalación en iOS y Android. |
| `scripts/batch_process.js` | Pipeline de transcripción y extracción multimodal con Vertex AI (Gemini 2.5 Flash). |
| `scripts/normalize_data.js` | Normalización de datos, vinculación de parejas y generación de `data.js`/`phrasal_verbs_knowledge.txt`. |
| `scripts/enrich_formal_synonyms.js` | Añade el equivalente formal latino curado a mano a cada phrasal verb. |
| `scripts/enrich_ipa.js` | Añade la transcripción IPA (UK/US) cruzando `scripts/vendor/en_UK.txt` / `en_US.txt`. |
| `scripts/enrich_cefr.js` | Añade el nivel CEFR (A1-C1) curado a mano a cada phrasal verb. |
| `scripts/vendor/` | Datasets externos vendorizados (descargados una sola vez, sin fetch en cada ejecución del pipeline). |
| `EVALUACION_RECURSOS_ROADMAP.md` / `PLAN_IMPLEMENTACION_SPRINTS.md` | Roadmap priorizado (Pareto) y plan técnico detallado de las mejoras implementadas. |

---

## 🛠️ Tecnologías Utilizadas

* **Procesamiento de Audio:** Google Cloud Vertex AI (`gemini-2.5-flash` en región `global`) vía cuenta de servicio GCP.
* **Frontend:** PWA nativa con Vanilla JS, Service Workers y diseño responsive sin dependencias externas.
* **Alojamiento:** GitHub Pages (gratuito, con soporte de streaming HTTP Range Requests para audio móvil).
