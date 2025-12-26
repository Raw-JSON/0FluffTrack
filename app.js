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
    
    // Quick Edit Elements
    const editOverlay = document.getElementById('edit-overlay');
    const closeEditBtn = document.getElementById('close-edit');
    const saveEditBtn = document.getElementById('save-edit');
    const editSVal = document.getElementById('edit-s-val');
    const editEVal = document.getElementById('edit-e-val');
    const quickImageInput = document.getElementById('quick-image-input');

    let currentImageBlob = null;
    let editTargetId = null;
    let editState = { s: 1, e: 1 };

    // Fill Dropdowns
    for (let i = 1; i <= 30; i++) {
        const opt = document.createElement('option');
        opt.value = `S${i}`;
        opt.textContent = `Season ${i}`;
        seasonSelect.appendChild(opt);
    }
    for (let i = 1; i <= 100; i++) {
        const opt = document.createElement('option');
        opt.value = `E${i}`;
        opt.textContent = `Episode ${i}`;
        episodeSelect.appendChild(opt);
    }

    await dbService.init();
    renderShows();

    // Add Show Logic
    openModalBtn.onclick = () => modalOverlay.classList.remove('hidden');
    closeModalBtn.onclick = () => {
        modalOverlay.classList.add('hidden');
        addShowForm.reset();
        fileNameDisplay.textContent = "No poster selected";
        currentImageBlob = null;
    };

    screenshotInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            currentImageBlob = file;
        }
    };

    addShowForm.onsubmit = async (e) => {
        e.preventDefault();
        const showData = {
            title: document.getElementById('show-title').value,
            season: seasonSelect.value,
            episode: episodeSelect.value,
            timestamp: Date.now(),
            image: currentImageBlob
        };
        await dbService.addShow(showData);
        closeModalBtn.click();
        renderShows();
    };

    // Quick Progress Logic with Auto-Reset
    const updateDisplay = () => {
        editSVal.textContent = editState.s;
        editEVal.textContent = editState.e;
    };

    document.getElementById('edit-s-plus').onclick = () => { 
        editState.s++; 
        editState.e = 1; // Auto-reset episode when season moves up
        updateDisplay(); 
    };
    document.getElementById('edit-s-minus').onclick = () => { 
        if(editState.s > 1) {
            editState.s--; 
            editState.e = 1; // Auto-reset episode when season moves down
        }
        updateDisplay(); 
    };
    document.getElementById('edit-e-plus').onclick = () => { editState.e++; updateDisplay(); };
    document.getElementById('edit-e-minus').onclick = () => { if(editState.e > 1) editState.e--; updateDisplay(); };

    closeEditBtn.onclick = () => editOverlay.classList.add('hidden');
    
    saveEditBtn.onclick = async () => {
        const shows = await dbService.getAllShows();
        const show = shows.find(s => s.id === editTargetId);
        if (show) {
            show.season = `S${editState.s}`;
            show.episode = `E${editState.e}`;
            show.timestamp = Date.now();
            await dbService.updateShow(show);
            renderShows();
        }
        editOverlay.classList.add('hidden');
    };

    quickImageInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file && editTargetId) {
            const shows = await dbService.getAllShows();
            const show = shows.find(s => s.id === editTargetId);
            if (show) {
                show.image = file;
                await dbService.updateShow(show);
                renderShows();
            }
        }
    };

    async function renderShows() {
        const shows = await dbService.getAllShows();
        showGrid.innerHTML = '';

        shows.sort((a, b) => b.timestamp - a.timestamp).forEach(show => {
            const card = document.createElement('div');
            card.className = 'card';
            const imageUrl = show.image ? URL.createObjectURL(show.image) : '';

            // Layout using "Watch Next" logic
            card.innerHTML = `
                <div class="card-img-container">
                    ${show.image ? `<img src="${imageUrl}" class="card-img">` : '<div style="display:flex; height:100%; align-items:center; justify-content:center; color:#333; font-size:0.8rem;">NO POSTER</div>'}
                    <button class="img-overlay-btn" title="Change Poster">📷</button>
                </div>
                <div class="card-content">
                    <div class="watch-label">Watch Next</div>
                    <h3 class="card-title">${show.title}</h3>
                    <div class="card-meta">
                        <span class="meta-text">${show.season} • EP ${show.episode.replace('E','')}</span>
                        <button class="btn-delete" data-id="${show.id}">Remove</button>
                    </div>
                </div>
            `;

            if (show.image) {
                const img = card.querySelector('.card-img');
                img.onload = () => URL.revokeObjectURL(imageUrl);
            }

            card.querySelector('.btn-delete').onclick = async (e) => {
                e.stopPropagation();
                if(confirm('Remove this show?')) {
                    await dbService.deleteShow(show.id);
                    renderShows();
                }
            };

            card.querySelector('.meta-text').onclick = () => {
                editTargetId = show.id;
                editState.s = parseInt(show.season.replace('S', '')) || 1;
                editState.e = parseInt(show.episode.replace('E', '')) || 1;
                updateDisplay();
                editOverlay.classList.remove('hidden');
            };

            card.querySelector('.img-overlay-btn').onclick = (e) => {
                e.stopPropagation();
                editTargetId = show.id;
                quickImageInput.click();
            };

            showGrid.appendChild(card);
        });
    }
});
