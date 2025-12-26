# 0FluffTrack 📺

**0FluffTrack** is a high-performance, zero-dependency media tracker designed for intentionality and privacy. It transforms your browser into a dedicated cinema library without the bloat of accounts, social feeds, or third-party data scraping.

---

### ⚡ The "No-Fluff" Philosophy
Most trackers are actually marketing tools in disguise. They require accounts to "sync" your data so they can sell your viewing habits. **0FluffTrack** rejects this.

* **True Local Storage:** Utilizing the **IndexedDB API**, 0FluffTrack stores your metadata and binary image posters directly in your browser's persistent storage. 
* **No Third-Party APIs:** We don't call external movie databases. This prevents "data leakage" and ensures the app works offline. You provide the posters; we provide the interface.
* **Zero Latency:** Built with Vanilla JS and CSS, optimized for smooth 60fps interactions and instant state updates.

---

### 🍿 New Features (v2.0)
* **Cinematic Interface:** A vertical 2:3 aspect ratio grid inspired by modern streaming platforms.
* **"Watch Next" Logic:** Shifted UX focus from "What did I finish?" to "What is my next goal?"
* **Anticipatory Steppers:** Automatic Episode-to-Season logic. Changing a season automatically resets the episode count to 1, saving you unnecessary clicks.
* **Glassmorphism Design:** A minimalist dark-mode UI that puts your media posters front and center.

---

### 📂 Technical Blueprint
* `db.js`: A Promise-based wrapper for **IndexedDB**. Handles high-speed CRUD operations for show objects and Blob image storage.
* `app.js`: The core controller. Manages DOM rendering, "Smart Stepper" logic, and event delegation.
* `style.css`: A custom CSS architecture utilizing CSS Variables and Flex/Grid for a responsive, desktop-class experience.

---

### 📄 License
MIT License. Open source, transparent, and free forever.

---

### 🤖 Transparency Note
Core logic and architectural patterns were generated and refined by **Gemini AI**
