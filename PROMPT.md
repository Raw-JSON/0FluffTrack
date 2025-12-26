# 0FluffTrack Master Prompt 🤖

Use the following prompt in any advanced LLM (like Gemini, GPT, or Claude) to recreate this exact application architecture.

---

### The Prompt:

"Act as a Senior Frontend Engineer and UX Designer. Build a zero-dependency, local-first media tracker called '0FluffTrack'(or use a different name) using Vanilla JavaScript, CSS, and HTML.

**Core Technical Requirements:**
1. **Database:** Use the IndexedDB API to store show metadata (Title, Season, Episode, Timestamp) and binary image Blobs for posters. Do not use localStorage due to size limits.
2. **PWA Support:** Include a Service Worker (sw.js) for full offline functionality and a manifest.json for standalone installation.
3. **Architecture:** Use a modular file structure (db.js for storage, app.js for logic, style.css for design).

**UI/UX Specifications:**
1. **Cinematic Design:** Create a dark-themed, glassmorphic UI. The show grid must use a vertical 2:3 aspect ratio for images to mimic movie posters.
2. **Watch Next Label:** Place a small "WATCH NEXT" label above the show title on each card. This signals the user to input the episode they are *about* to watch, rather than the one they finished.
3. **Smart Steppers:** In the update modal, include increment/decrement buttons for Season and Episode. If the Season is changed, the Episode must automatically reset to 1.
4. **No-Fluff Branding:** Focus on speed and privacy. No external APIs, no tracking, and no third-party libraries."
