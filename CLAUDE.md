# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Phrasal Verbs Coach: a static PWA (no backend, no build step) that teaches 153 English phrasal verbs via 306 paired MP3 audio tracks. It also ships a knowledge base and system prompt so the same content can be used as a voice-tutoring companion inside ChatGPT/Claude (Custom GPT / Project knowledge).

There is no test suite and no bundler — this is plain HTML/CSS/JS served as static files (GitHub Pages), plus a small Node.js data pipeline used offline to generate/update the content files.

## Commands

There is no build, lint, or test tooling (`npm test` is a stub that always fails — don't rely on it).

- **Run the app locally**: serve the directory root with any static file server (e.g. `npx serve .` or VS Code Live Server) and open `index.html`. Opening the file directly via `file://` mostly works but breaks the service worker and audio range requests.
- **Regenerate transcriptions/drills from raw audio** (requires GCP service account credentials for Vertex AI, and only needs to run when `malditos_phrasal/*.mp3` content changes):
  ```
  node scripts/batch_process.js
  ```
  Reads every MP3 in `malditos_phrasal/`, transcribes+extracts drills via Gemini 2.5 Flash (Vertex AI), and writes/updates `phrasal_verbs_data.json` incrementally (resumable — skips entries that already have drills).
- **Normalize/rebuild derived files after editing `phrasal_verbs_data.json` by hand**:
  ```
  node scripts/normalize_data.js
  ```
  This is the required step after any manual edit to `phrasal_verbs_data.json` — it sorts by id, pairs drill/story tracks, and regenerates both `data.js` and `phrasal_verbs_knowledge.txt` from it. Never hand-edit `data.js` or `phrasal_verbs_knowledge.txt` directly; they are build artifacts of `phrasal_verbs_data.json`.

## Architecture: the data pipeline and its single source of truth

`phrasal_verbs_data.json` is the canonical dataset. Everything else derives from it:

```
malditos_phrasal/*.mp3  --[batch_process.js, Vertex AI]-->  phrasal_verbs_data.json
                                                                     |
                                                        [normalize_data.js]
                                                                     |
                                        +----------------------------+----------------------------+
                                        v                                                          v
                                data.js (window.PHRASAL_DATA,                          phrasal_verbs_knowledge.txt
                                embedded for the PWA, offline-first)                    (uploaded as Knowledge to a
                                                                                         ChatGPT/Claude Project)
```

Track/pairing model (this is the core domain concept, not obvious from any single file):
- 306 tracks = 153 phrasal verbs × 2 tracks each.
- **Odd id** (#1, #3, ...) = `type: "drill"` — a guided Spanish-prompt → English-answer shadowing drill (8-10 sentence pairs in `drills[]`).
- **Even id** (#2, #4, ...) = `type: "story"` — a continuous narrative/dialogue reusing the same phrasal verb in context.
- Every item has `pair_id` pointing at its counterpart (drill ⇄ story), computed in `normalize_data.js` (`pair_id = id ± 1`). The PWA's "Ver Historia/Práctica" buttons and the AI prompt flow both depend on this pairing being correct.
- `base_verb` / `particle` are derived from `phrasal_verb` when missing (e.g. `"go up"` → `base_verb: "go"`, `particle: "up"`); story items inherit these from their paired drill if absent.

## Frontend (`index.html`)

Single-file vanilla JS app (no framework, no modules) — all logic lives inline in `<script>` tags in `index.html`, driven by the globally-loaded `window.PHRASAL_DATA` from `data.js`. Key state: `currentData`/`filteredData` (search+filter results) and `currentIndex` (active player track). Search matches against Spanish tags (`tags_es`), meaning, and verb text — it's intent-based search in Spanish, not just keyword matching on the English verb.

The audio player, filters (family/situation/drill-vs-story), pair navigation, and the "Active Recall" blur-to-hide-English feature are all implemented as plain functions attached via `addEventListener`/inline `onclick`, operating on the DOM directly (no virtual DOM/reactivity).

## PWA / offline (`sw.js`, `manifest.json`)

The service worker cache-first-serves the app shell (`index.html`, `data.js`, `manifest.json`, `icon.svg`) but explicitly bypasses caching for `.mp3` requests so audio can stream with HTTP Range support (required for seeking/scrubbing on mobile). Bumping `CACHE_NAME` in `sw.js` is how you force clients to pick up a new app-shell deploy.

## AI-tutor mode (`ai-prompt.md`, `phrasal_verbs_knowledge.txt`)

`ai-prompt.md` is the system prompt for using this content as a spoken-English tutor in ChatGPT/Claude (paired with `phrasal_verbs_knowledge.txt` as Knowledge). It also references external files not in this repo (Google Drive progress spreadsheet `Phrasal_Verbs_Progress`, Conquer English class materials) that establish the tutoring feedback loop (🔴/🟡/🟢 mastery status per phrasal verb) — those are user-side context, not part of this codebase.

When editing `ai-prompt.md`, keep it consistent with the actual pairing/id scheme above (#1–#306), since the AI is expected to look up units directly in `phrasal_verbs_knowledge.txt` by id.
