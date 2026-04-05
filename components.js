/**
 * components.js
 * Standardized components for Architecture of Silence Archive
 */

function renderHeader() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    // If we are in the shell, we handle navigation and sliding underline
    if (window === window.top) {
        const navHTML = `
            <div class="nav-inner">
                <div class="nav-title">ARCHITECTURE OF SILENCE</div>
                <div class="nav-links">
                    <a href="#" data-page="home.html" class="nav-link">THE ARCHIVE</a>
                    <a href="#" data-page="system.html" class="nav-link">SYSTEM OVERVIEW</a>
                    <a href="#" data-page="analysis.html" class="nav-link">STRUCTURAL ANALYSIS</a>
                    <a href="#" data-page="failure.html" class="nav-link">CRITICAL FRACTURE</a>
                    <a href="#" data-page="album.html" class="nav-link">THE ALBUM</a>
                    <a href="#" data-page="research.html" class="nav-link">RESEARCH</a>
                    <a href="#" data-page="experiment.html" class="nav-link">EXPERIMENTS</a>
                    <div class="nav-underline"></div>
                </div>
            </div>
        `;
        nav.innerHTML = navHTML;

        const links = nav.querySelectorAll('.nav-link');
        const underline = nav.querySelector('.nav-underline');
        const frame = document.getElementById('content-frame');

        function updateUnderline(activeLink) {
            if (!activeLink || !underline) return;
            underline.style.width = `${activeLink.offsetWidth}px`;
            underline.style.left = `${activeLink.offsetLeft}px`;
        }

        // Initial position and active state
        const params = new URLSearchParams(window.location.search);
        const currentFile = params.get('page') || 'home.html';
        
        links.forEach(link => {
            const page = link.getAttribute('data-page');
            if (currentFile === page) {
                link.classList.add('active');
            }
        });

        setTimeout(() => updateUnderline(nav.querySelector('.nav-link.active')), 100);

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');

                if (frame) {
                    frame.classList.add('fading');
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    updateUnderline(link);

                    setTimeout(() => {
                        frame.src = targetPage;
                        frame.onload = () => frame.classList.remove('fading');
                    }, 500);
                } else {
                    // Universal redirect if not in shell
                    window.location.href = targetPage;
                }
            });
        });
    } else {
        // If we are in a frame, hide the local nav to prevent duplication
        nav.style.display = 'none';
        
        // Ensure any content-top-buffer is still applied for padding
        // (This happens via CSS)
    }
}

// Full Audio System Integration
function initAudioSystem() {
    window.triggerGlobalTrack = function(trackId_or_title, audioFile) {
        let track;
        if (typeof trackId_or_title === 'object') {
            track = trackId_or_title;
        } else if (audioFile) {
            track = { title: trackId_or_title, audioFile: audioFile };
        } else if (typeof MAPPING_DATA !== 'undefined' && MAPPING_DATA[trackId_or_title]) {
            track = MAPPING_DATA[trackId_or_title];
        } else {
            track = { title: trackId_or_title, audioFile: trackId_or_title };
        }
        
        try {
            if (window.top && typeof window.top.playTrack === 'function') {
                window.top.playTrack(track);
                return;
            }
        } catch (e) {}
        window.top.postMessage({ type: 'PLAY_TRACK', track: track }, '*');
    };

    if (window === window.top) {
        const mount = document.getElementById('audio-player-mount') || document.body;
        if (document.getElementById('audio-banner')) return;

        const bannerHTML = `
            <div id="audio-banner">
                <div class="audio-controls">
                    <button id="toggle-play" class="audio-btn">II</button>
                </div>
                <div class="marquee-container">
                    <div id="marquee" class="marquee-text">INITIALIZING...</div>
                </div>
                <audio id="audio-player"></audio>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = bannerHTML;
        mount.appendChild(div.firstElementChild);

        const banner = document.getElementById('audio-banner');
        const marquee = document.getElementById('marquee');
        const player = document.getElementById('audio-player');
        const toggleBtn = document.getElementById('toggle-play');
        let currentTrack = null;

        window.playTrack = function(trackData) {
            if (currentTrack === trackData.audioFile) {
                if (player.paused) {
                    player.play();
                    toggleBtn.innerText = "II";
                }
                return;
            }
            currentTrack = trackData.audioFile;
            player.src = trackData.audioFile;
            player.play();
            banner.classList.add('active');
            toggleBtn.innerText = "II";
            marquee.innerText = `RYAN SANDERS // ARCHITECTURE OF SILENCE // ${trackData.title}`;
        };

        toggleBtn.addEventListener('click', () => {
            if (player.paused) {
                player.play();
                toggleBtn.innerText = "II";
            } else {
                player.pause();
                toggleBtn.innerText = "▷";
            }
        });

        let fadeInterval = null;
        window.fadeAndPauseAudio = function() {
            if (fadeInterval) clearInterval(fadeInterval);
            const startVolume = player.volume;
            let currentVolume = startVolume;
            fadeInterval = setInterval(() => {
                if (currentVolume > 0.05) {
                    currentVolume -= 0.05;
                    player.volume = currentVolume;
                } else {
                    clearInterval(fadeInterval);
                    player.volume = 0;
                    player.pause();
                    toggleBtn.innerText = "▷";
                    player.volume = startVolume || 1;
                }
            }, 50);
        };

        window.fadeAndResumeAudio = function() {
            if (fadeInterval) clearInterval(fadeInterval);
            player.play();
            let currentVolume = 0;
            player.volume = 0;
            fadeInterval = setInterval(() => {
                if (currentVolume < 1) {
                    currentVolume += 0.05;
                    player.volume = Math.min(currentVolume, 1);
                } else {
                    clearInterval(fadeInterval);
                    player.volume = 1;
                    toggleBtn.innerText = "II";
                }
            }, 50);
        };

        window.addEventListener('message', (event) => {
            if (event.data.type === 'PLAY_TRACK') {
                window.playTrack(event.data.track);
            } else if (event.data.type === 'MUTE_FOR_VIDEO') {
                window.fadeAndPauseAudio();
            } else if (event.data.type === 'RESUME_AFTER_VIDEO') {
                window.fadeAndResumeAudio();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Self-Shelling Logic: 
    // If a page is opened standalone (not in iframe), and it's not the index itself,
    // redirect to the shell to ensure audio persistence.
    const path = window.location.pathname;
    const isShell = path.endsWith('index.html') || path.endsWith('/');
    const isLocalFile = window.location.protocol === 'file:';
    
    // Exception for the shell or if already in a frame
    if (window === window.top && !isShell) {
        // For file protocol, we use the filename. For others, we might need more logic but this is the archive's structure.
        const currentFile = path.split('/').pop() || 'home.html';
        if (currentFile !== 'index.html' && currentFile !== '') {
            window.location.href = `index.html?page=${currentFile}`;
            return;
        }
    }

    renderHeader();
    initAudioSystem();
});
