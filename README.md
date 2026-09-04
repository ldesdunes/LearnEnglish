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
* **Características:**
  * **Buscador semántico:** Busca por intención en español (*"cancelar"*, *"subir"*, *"aguantar"*), por verbo en inglés o por ID.
  * **Filtros rápidos:** Filtra por familias (*GET, PUT, TAKE, GO, TURN, COME, LOOK*), situaciones (*Movimiento, Trabajo, Vida Cotidiana, Relaciones, Viajes*) o tipo (*Solo Prácticas* vs *Solo Historias*).
  * **Reproductor:** Control de velocidad (0.8x, 1.0x, 1.2x), retroceso/avance ±5s, y repetición en bucle (*loop*).
  * **Modo Azar (🎲):** Reproduce una unidad aleatoria para practicar sin pensar cuál elegir.
  * **Active Recall:** Toca cualquier frase en inglés para ocultarla/mostrarla (*blur*), poniéndote a prueba antes de escucharla.

### 2. En Casa con ChatGPT o Claude (Entrenamiento por Voz)
Optimizado para no consumir tokens generando audio con IA cuando ya tienes los MP3s:
1. Sube el archivo **`phrasal_verbs_knowledge.txt`** a tu **Custom GPT (Knowledge)** o a tu **Claude Project (Knowledge)**.
2. Copia las instrucciones de **`ai-prompt.md`** en las instrucciones del sistema.
3. Abre la app móvil o de escritorio de ChatGPT o Claude, activa el modo voz y dile:
   * *"Vamos con el phrasal verb 45"*
   * *"Quiero practicar phrasal verbs para reuniones de trabajo"*
   * *"¿Qué phrasal verb usamos para cancelar algo? Lánzame sus ejercicios"*
   * *"Dame el siguiente de la lista para shadowing"*
4. La IA actuará como tu profesor particular: te lanzará la frase en español, escuchará tu pronunciación en inglés, te dará retroalimentación instantánea y pasará a la siguiente frase.

---

## 📁 Archivos del Proyecto

| Archivo / Carpeta | Descripción |
| :--- | :--- |
| `index.html` | Interfaz de la PWA (buscador, reproductor, filtros y tarjetas interactivas). |
| `data.js` | Base de datos embebida con los 306 registros para carga ultrarrápida offline. |
| `phrasal_verbs_data.json` | Base de datos completa en JSON con metadatos, tags y los 2.681 pares bilingües. |
| `phrasal_verbs_knowledge.txt` | Archivo de conocimiento maestro estructurado para subir a Claude y ChatGPT. |
| `ai-prompt.md` | Prompt de sistema para el tutor de inglés alineado con Conquer English. |
| `malditos_phrasal/` | Carpeta con los 306 audios originales en formato MP3 (~190 MB). |
| `manifest.json` + `sw.js` + `icon.svg` | Configuración PWA para instalación en iOS y Android. |
| `scripts/batch_process.js` | Pipeline de transcripción y extracción multimodal con Vertex AI (Gemini 2.5 Flash). |
| `scripts/normalize_data.js` | Normalización de datos, vinculación de parejas y generación de índices. |

---

## 🛠️ Tecnologías Utilizadas

* **Procesamiento de Audio:** Google Cloud Vertex AI (`gemini-2.5-flash` en región `global`) vía cuenta de servicio GCP.
* **Frontend:** PWA nativa con Vanilla JS, Service Workers y diseño responsive sin dependencias externas.
* **Alojamiento:** GitHub Pages (gratuito, con soporte de streaming HTTP Range Requests para audio móvil).
