document.addEventListener('DOMContentLoaded', async () => {
    // UI Elements
    const showGrid = document.getElementById('show-grid');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const addShowForm = document.getElementById('add-show-form');
    const seasonSelect = document.getElementById('season-select');
    const episodeSelect = document.getElementById('episode-select');
    const screenshotInput = document.getElementById('screenshot-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    let currentImageBlob = null;

    // Initialize Select Options
    for (let i = 1; i <= 20; i++) {
        const opt = document.createElement('option');
        opt.value = `S${i}`;
        opt.textContent = `Season ${i}`;
        seasonSelect.appendChild(opt);
    }
    for (let i = 1; i <= 50; i++) {
        const opt = document.createElement('option');
        opt.value = `E${i}`;
        opt.textContent = `Episode ${i}`;
        episodeSelect.appendChild(opt);
    }

    // Initialize Database
    try {
        await dbService.init();
        renderShows();
    } catch (err) {
        console.error("Failed to init DB", err);
    }

    // Modal Interactions
    openModalBtn.addEventListener('click', () => modalOverlay.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
        addShowForm.reset();
        fileNameDisplay.textContent = "No file selected";
        currentImageBlob = null;
    });

    // File Handling
    screenshotInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            currentImageBlob = file;
        }
    });

    // Form Submission
    addShowForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const showData = {
            title: document.getElementById('show-title').value,
            season: seasonSelect.value,
            episode: episodeSelect.value,
            timestamp: Date.now(),
            image: currentImageBlob // Store actual Blob
        };

        await dbService.addShow(showData);
        closeModalBtn.click();
        renderShows();
    });

    // Render Logic
    async function renderShows() {
        const shows = await dbService.getAllShows();
        showGrid.innerHTML = '';

        shows.sort((a, b) => b.timestamp - a.timestamp).forEach(show => {
            const card = document.createElement('div');
            card.className = 'card';

            // Convert Blob to URL for preview
            const imageUrl = show.image ? URL.createObjectURL(show.image) : '';

            card.innerHTML = `
                <div class="card-img-container">
                    ${show.image ? `<img src="${imageUrl}" class="card-img" alt="${show.title}">` : '<div style="display:flex; height:100%; align-items:center; justify-content:center; color:#333;">No Screenshot</div>'}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${show.title}</h3>
                    <div class="card-meta">
                        <span>${show.season} • ${show.episode}</span>
                        <button class="btn-delete" data-id="${show.id}">REMOVE</button>
                    </div>
                </div>
            `;

            // Clean up URLs to prevent memory leaks
            if (show.image) {
                const img = card.querySelector('img');
                img.onload = () => URL.revokeObjectURL(imageUrl);
            }

            // Delete action
            card.querySelector('.btn-delete').addEventListener('click', async (e) => {
                const id = parseInt(e.target.dataset.id);
                await dbService.deleteShow(id);
                renderShows();
            });

            showGrid.appendChild(card);
        });
    }
});
