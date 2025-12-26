> # 0FluffTrack 📺

**0FluffTrack** is a zero-dependency, local-first media tracker built for speed, privacy, and intentionality. It transforms your browser into a dedicated cinematic library without the bloat of accounts, social feeds, or third-party data scraping.

---

### ⚡ The "No-Fluff" Philosophy
Most trackers require accounts to "sync" data so they can monitor viewing habits. **0FluffTrack** rejects this model.

* **True Local Storage**: Utilizing the **IndexedDB API**, 0FluffTrack stores metadata and binary image posters directly in your browser's persistent storage.
* **No Third-Party APIs**: We do not call external movie databases. This ensures your viewing habits are never leaked and the app remains functional without an internet connection.
* **Zero Latency**: Built with Vanilla JS and CSS, optimized for smooth 60fps interactions and instant state updates.

---

## 📡 Offline & PWA Support
0FluffTrack is a fully capable **Progressive Web App (PWA)**.
* **Installation**: Can be "Installed" to your home screen or desktop via the browser's "Add to Home Screen" prompt.
* **Reliability**: The Service Worker caches all core assets, allowing the app to boot and function with zero internet connection.
* **SVG-First Branding**: Uses a mathematically perfect SVG icon for maximum clarity across all device resolutions.

---

## 📂 Technical Blueprint
* **db.js**: Promise-based wrapper for **IndexedDB** CRUD operations.
* **app.js**: Core controller handling DOM rendering, "Watch Next" states, and smart season/episode increments.
* **style.css**: Minimalist UI architecture utilizing CSS Variables and a 2:3 cinematic grid.
* **sw.js & manifest.json**: The engine and identity files for offline PWA functionality.

---

## 📄 License
MIT License. Open source, transparent, and free from tracking.

---
