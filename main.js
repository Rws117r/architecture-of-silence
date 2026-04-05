const SONG_DATA = [
  {
    "id": "gone-before-goodbye",
    "title": "Gone Before Goodbye",
    "theme": "The Hollow Before",
    "description": "The shock of noticing the 'hollow' before the actual end.",
    "position": { "x": 15, "y": 20 },
    "tier": "surface-low",
    "connections": ["say-it-like-it-holds"]
  },
  {
    "id": "say-it-like-it-holds",
    "title": "Say It Like It Holds",
    "theme": "Performative Stability",
    "description": "The performance of authority while the foundation is shifting.",
    "position": { "x": 45, "y": 35 },
    "tier": "surface-concrete",
    "connections": ["let-it-sit"]
  },
  {
    "id": "let-it-sit",
    "title": "Let It Sit",
    "theme": "Internalized Pressure",
    "description": "The decision to keep the pressure internal, letting it build in the silence.",
    "position": { "x": 65, "y": 60 },
    "tier": "surface-highest",
    "connections": ["set-in-motion"]
  },
  {
    "id": "set-in-motion",
    "title": "Set In Motion",
    "theme": "Irrevocable Change",
    "description": "The climax of control, where trying to 'steady' the ground sets irrevocable changes in motion.",
    "position": { "x": 85, "y": 75 },
    "tier": "surface-sandstone",
    "connections": []
  }
];

function initArchive() {
    const blueprint = document.getElementById('blueprint');
    renderSongs(SONG_DATA, blueprint);
}

function renderSongs(songs, container) {
    const core = document.getElementById('coreUnderneath');
    
    songs.forEach((song, index) => {
        const module = document.createElement('div');
        module.className = `song-module ${song.tier || 'surface-low'}`;
        module.id = song.id;
        
        const randomY = Math.floor(Math.random() * 8) - 4;
        module.style.marginTop = `${randomY}vh`;
        
        module.innerHTML = `
            <span class="metadata-label">SYMBOL: ${song.id.replace(/-/g, '.').toUpperCase()}</span>
            <h2>${song.title}</h2>
            <p class="metadata-label">CORE THEME: ${song.theme}</p>
            <div class="song-description">
                ${song.description}
            </div>
            <div class="module-meta">
                <span class="metadata-label">ARCHIVED: 2026-04-05</span>
                <span class="metadata-label" style="float: right;">STRUCTURAL STRESS: ${index * 25}%</span>
            </div>
        `;
        
        // Hover interaction: Tonal Shift + Structural Pressure
        module.addEventListener('mouseenter', () => {
            module.style.backgroundColor = 'var(--surface-highest)';
            module.style.transform = 'translateY(-5px) scale(1.02)';
            module.style.zIndex = '10';
            if (core) core.style.opacity = '0.4';
        });
        
        module.addEventListener('mouseleave', () => {
            module.style.backgroundColor = '';
            module.style.transform = '';
            module.style.zIndex = '1';
            // Opacity will be reset by scroll listener
        });
        
        container.appendChild(module);
    });

    // Scroll-driven Fracture Logic
    window.addEventListener('scroll', () => {
        const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (core) {
            core.style.opacity = 0.15 + (scrollPct * 0.35); // Max 0.5 opacity
            core.style.transform = `translate(-50%, -50%) scale(${1 + scrollPct * 0.1})`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initArchive);
