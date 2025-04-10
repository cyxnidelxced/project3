document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('murder-video');
    const clueText = document.getElementById('clue-text');
    const revealBox = document.getElementById('reveal-box');
    const revealText = document.getElementById('reveal-text');
    const suspectName = document.getElementById('suspect-name');
    const suspectDescription = document.getElementById('suspect-description');
    const suspectMotive = document.getElementById('suspect-motive');
    const revealMurdererBtn = document.getElementById('reveal-murderer-btn');
    const revealVideoWrapper = document.getElementById('reveal-video-wrapper');
    const mainVideoWrapper = document.getElementById('main-video-wrapper');
    const victimInfo = document.getElementById('victim-info');
    const suspectInfo = document.getElementById('suspect-info');
    const goBackButton = document.getElementById('go-back-btn');  // Button to go back to main video
    const suspectButtons = document.querySelectorAll('.suspect-btn'); // Buttons for Boyfriend, Friend, and Roommate
    const suspectsHeading = document.getElementById('suspects-heading'); // Heading for suspects
    const suspectProfileHeading = document.getElementById('suspect-info').querySelector('h2'); // Suspect Profile Heading

    // Define cue points with suspect data and clues
    const cuePoints = [
    { time: 77, suspect: 'Friend', description: 'Tess is a friend of Maddie. She designs her own line of lipstick. According to her, she hurt her wrist at the gym.', motive: 'Maddie stole her lipstick.' },
    { time: 139, suspect: 'Roommate', description: 'Morgan is the roommate. She works for long hours due to Maddie not paying rent as she is supposed to. She had to skip classes due to her work hours, making her annoyed and bitter.', motive: 'Fustration at the fact that Maddie is not a good roommate.' },
    { time: 214, suspect: 'Boyfriend', description: 'Regan is the boyfriend. He seems to be the only one committed to the relationship.', motive: 'Not happy when all Maddie pays attention to is her work and not their relationship. Jealous that his girlfriend only cares about her fans.' },
    { time: 77, clue: 'Stamp from Lila Lounge', updateProfile: 'Friend', reveal: false },
    { time: 139, clue: 'Nail polish', updateProfile: 'Roommate', reveal: false },
    { time: 214, clue: 'Strangulation marks on neck', updateProfile: 'Boyfriend', reveal: false },
    { time: 280, reveal: true }
    ];

    // Button event listeners to jump to corresponding time in the video
    document.getElementById('friend-btn').addEventListener('click', () => {
        video.currentTime = 77; // Jump to the boyfriend section (77 seconds)
    });

    document.getElementById('roommate-btn').addEventListener('click', () => {
        video.currentTime = 139; // Jump to the friend section (139 seconds)
    });

    document.getElementById('boyfriend-btn').addEventListener('click', () => {
        video.currentTime = 214; // Jump to the roommate section (214 seconds)
    });

    // Function to trigger the glow effect
    function triggerGlowEffect() {
        // Apply the glow effect to the entire UI
        const uiWrapper = document.querySelector('.ui-wrapper');
        const infoBoxes = document.querySelectorAll('.info-box');
        const heading = document.getElementById('suspects-heading');
            
        // Add the glowing class to trigger the animation
        uiWrapper.classList.add('glowing');
        heading.classList.add('glowing');
        infoBoxes.forEach(box => box.classList.add('glowing'));
    
        // Remove the glowing effect after 3 seconds
        setTimeout(() => {
            uiWrapper.classList.remove('glowing');
            heading.classList.remove('glowing');
            infoBoxes.forEach(box => box.classList.remove('glowing'));
        }, 3000);
    }

    // Function to trigger killer reveal glow effect - more intense and longer duration
    function triggerKillerGlowEffect() {
        // Apply the glow effect to the entire UI
        const uiWrapper = document.querySelector('.ui-wrapper');
        const infoBoxes = document.querySelectorAll('.info-box');
        const heading = document.getElementById('suspects-heading');
            
        // Add the glowing class to trigger the animation
        uiWrapper.classList.add('glowing');
        heading.classList.add('glowing');
        infoBoxes.forEach(box => box.classList.add('glowing'));
    
        // Also add glow to any visible clue elements
        const clueBox = document.getElementById('clue-box');
        if (clueBox) {
            clueBox.classList.add('glowing');
        }
        
        // Keep the glow effect longer for the killer reveal (5 seconds)
        setTimeout(() => {
            uiWrapper.classList.remove('glowing');
            heading.classList.remove('glowing');
            infoBoxes.forEach(box => box.classList.remove('glowing'));
            if (clueBox) {
                clueBox.classList.remove('glowing');
            }
        }, 5000);
    }

    // Event listener for time updates on the video
    video.addEventListener('timeupdate', () => {
        let currentTime = video.currentTime;

        // Check if any cue points match
        cuePoints.forEach((cue, index) => {
            if (currentTime >= cue.time && currentTime <= cue.time + 2) { // Triggered within a 2-second range
                if (cue.suspect) {
                    // Update the UI to show the suspect's profile
                    suspectName.textContent = cue.suspect;
                    suspectDescription.textContent = cue.description;
                    suspectMotive.textContent = 'Motive: ' + cue.motive;

                    victimInfo.classList.add('hidden');
                    suspectInfo.classList.remove('hidden');
                }

                if (cue.clue) {
                    // Show the clue text
                    clueText.textContent = cue.clue;
                }

                if (cue.reveal) {
                    // Show the button to reveal the murderer at the right cue point
                    revealMurdererBtn.classList.remove('hidden');
                }

                // Apply glow effect for all cue points except the last one
                if (index < cuePoints.length - 1) {
                    triggerGlowEffect();
                }
            }
        });
    });


    // Show the murderer's reveal video when the "Reveal Murderer" button is clicked
    revealMurdererBtn.addEventListener('click', () => {
    
        // Hide the main video and show the reveal video
        mainVideoWrapper.classList.add('hidden');
        revealVideoWrapper.classList.remove('hidden');

        // Hide suspect buttons and show 'Go Back' button
        suspectButtons.forEach(button => button.classList.add('hidden'));
        goBackButton.classList.remove('hidden');

        // Hide the reveal murderer button
        revealMurdererBtn.classList.add('hidden');
    
        // Hide the reveal box with "The Murderer is..." text
        revealBox.classList.add('hidden');

        // Pause the main video when the reveal video is shown
        video.pause();

        // Always show the killer profile, regardless of which cue points were hit
        victimInfo.classList.add('hidden');
        suspectInfo.classList.remove('hidden');

        // Update the UI to show the murderer's profile
        suspectName.textContent = "Morgan";  // Murderer's name
        suspectDescription.textContent = "The roommate is the murderer!";  // Description of the murderer
        suspectMotive.textContent = "She disguised herself and strangled Maddie with a ribbon from her teddy bear in her room.";  // Motive of the murderer

        // Change the headings
        suspectsHeading.textContent = "The Killer";  // Change "The Suspects" to "The Killer"
        suspectProfileHeading.textContent = "The Killer Profile"; // Change "Suspect Profile" to "The Killer Profile"
    
        //Change in clue text
        clueText.textContent = 'Teddy Bear Ribbon';

        // Apply the killer reveal glow effect
        triggerKillerGlowEffect();

        // Ensure the reveal video is unmuted (if captions are enabled)
        const revealVideo = document.getElementById('reveal-video');
        revealVideo.muted = false;

        // Play the reveal video
        revealVideo.play();

        // Enable captions manually if needed
        const textTracks = revealVideo.textTracks;
        if (textTracks.length > 0) {
            const track = textTracks[0];  // Assuming the first track is the subtitles
            track.mode = 'showing';  // This ensures the subtitles are visible
        }
    });

    // When the reveal video ends
    const revealVideo = document.getElementById('reveal-video');
    revealVideo.addEventListener('ended', () => {
        // Show Go Back button more prominently if needed
        goBackButton.classList.remove('hidden');
        
        // Apply the killer glow effect again when the video ends
        triggerKillerGlowEffect();
        
        // Do not automatically switch back to main video
        // Do not automatically play the main video
        
        // Keep the murderer profile displayed
    });

    // Button to go back to the main video
    goBackButton.addEventListener('click', () => {
        // Hide the reveal video and show the main video again
        revealVideoWrapper.classList.add('hidden');
        mainVideoWrapper.classList.remove('hidden');
    
        // Reset the main video to its initial state but do NOT autoplay
        video.currentTime = 0;
        // Removed: video.play();
    
        // Hide 'Go Back' button and show suspect buttons again
        goBackButton.classList.add('hidden');
        suspectButtons.forEach(button => button.classList.remove('hidden'));
    
        // Hide the "Reveal Murderer" button again when going back
        revealMurdererBtn.classList.add('hidden');
        
        // Show the reveal box again
        revealBox.classList.remove('hidden');
    
        // Reset the profile information to the victim's default state
        suspectName.textContent = 'Maddie';  // Victim's name
        suspectDescription.textContent = 'A beauty vlogger who was found strangled to death.';  // Victim's description
        suspectMotive.textContent = 'Motive: Not applicable';  // No motive for the victim
    
        // Hide suspect info and show victim info again
        suspectInfo.classList.add('hidden');
        victimInfo.classList.remove('hidden');
    
        // Pause the reveal video and reset it to the start
        const revealVideo = document.getElementById('reveal-video');
        revealVideo.pause();
        revealVideo.currentTime = 0;
    
        // Reset the headings to their original state when going back to the main video
        suspectsHeading.textContent = "The Suspects"; // Reset "The Killer" to "The Suspects"
        suspectProfileHeading.textContent = "Suspect Profile"; // Reset "The Killer Profile" to "Suspect Profile"
    
        // If there was any clue or reveal text, reset it to the initial state
        clueText.textContent = 'Waiting for a clue to appear...';
    });

    // Add SVG decorations
    addSvgDecorations();
    
    // Initialize the three new features
    setupBloodDropsAnimation();
    setupCrimeSceneTape();
    setupNoteTakingSystem();
    
    // Add the audio playlist functionality
    setupAudioPlaylist();
});

// Define the function to add SVG decorations
function addSvgDecorations() {
    // Define SVG content for each element
    const bloodSplatterSVG = `
        <svg class="svg-element" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Main large splatter -->
          <path d="M250 120 c30,-40 80,-20 60,20 c-10,30 40,60 -30,50 c-40,-5 -60,40 -70,0 c-5,-20 -40,-20 -30,-40 c10,-30 50,-40 70,-30 Z" fill="#8a0303" />
          
          <!-- Smaller splatters -->
          <path d="M130 80 c10,-20 30,-5 20,10 c-10,10 10,20 -10,15 c-15,0 -20,10 -15,0 c0,-10 -10,-15 5,-25 Z" fill="#a20303" />
          
          <path d="M320 60 c15,-15 35,-5 25,15 c-5,15 20,30 -15,20 c-20,-5 -30,15 -25,-5 c0,-15 -15,-20 15,-30 Z" fill="#8a0303" />
          
          <!-- Droplets -->
          <circle cx="180" cy="50" r="8" fill="#a20303" />
          <circle cx="200" cy="70" r="5" fill="#8a0303" />
          <circle cx="160" cy="100" r="6" fill="#a20303" />
          <circle cx="350" cy="110" r="7" fill="#8a0303" />
          <circle cx="370" cy="90" r="4" fill="#a20303" />
          <circle cx="330" cy="140" r="6" fill="#8a0303" />
          <circle cx="280" cy="190" r="9" fill="#8a0303" />
          <circle cx="220" cy="200" r="7" fill="#a20303" />
          <circle cx="150" cy="170" r="8" fill="#8a0303" />
          
          <!-- Drips -->
          <path d="M250 180 c0,20 0,40 5,50 c5,10 -10,10 -15,0 c-5,-10 -5,-30 10,-50 Z" fill="#8a0303" />
          <path d="M290 170 c2,15 3,30 6,40 c3,8 -7,8 -10,0 c-3,-8 -3,-25 4,-40 Z" fill="#a20303" />
          <path d="M210 175 c2,20 2,35 5,45 c3,7 -8,7 -12,0 c-4,-8 -2,-25 7,-45 Z" fill="#8a0303" />
        </svg>
    `;
    
    const knifeSVG = `
        <svg class="svg-element" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Knife Handle -->
          <path d="M70 100 h80 c5,0 10,10 10,20 c0,10 -5,20 -10,20 h-80 c-5,0 -10,-10 -10,-20 c0,-10 5,-20 10,-20 Z" fill="#3d2314" />
          
          <!-- Handle Detail -->
          <path d="M75 105 h70 c3,0 6,7 6,15 c0,8 -3,15 -6,15 h-70 c-3,0 -6,-7 -6,-15 c0,-8 3,-15 6,-15 Z" fill="#59331c" />
          
          <!-- Metal Bolster -->
          <rect x="150" y="100" width="10" height="40" fill="#b3b3b3" />
          
          <!-- Blade -->
          <path d="M160 100 h180 l30 20 l-30 20 h-180 Z" fill="#d9d9d9" />
          
          <!-- Blade Gradient -->
          <path d="M170 105 h165 l25 15 l-25 15 h-165 Z" fill="#f2f2f2" />
          
          <!-- Blood on Blade -->
          <path d="M170 105 h20 c5,0 15,3 10,10 c-5,7 -15,5 -25,5 h-5 Z" fill="#8a0303" fill-opacity="0.8" />
          <path d="M230 105 c10,0 40,0 30,10 c-10,10 -30,0 -40,0 Z" fill="#8a0303" fill-opacity="0.7" />
          
          <!-- Blood Drops -->
          <ellipse cx="195" cy="130" rx="7" ry="3" fill="#8a0303" fill-opacity="0.7" />
          <ellipse cx="220" cy="128" rx="5" ry="2" fill="#8a0303" fill-opacity="0.6" />
        </svg>
    `;
    
    const handprintSVG = `
        <svg class="svg-element" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Palm base -->
          <path d="M200 230 c-30,0 -55,-25 -55,-60 c0,-60 30,-120 55,-120 c25,0 55,60 55,120 c0,35 -25,60 -55,60 Z" fill="#8a0303" fill-opacity="0.9" />
          
          <!-- Thumb -->
          <path d="M140 170 c-15,5 -40,-5 -40,-30 c0,-25 15,-40 30,-40 c15,0 25,10 25,30 c0,20 -5,35 -15,40 Z" fill="#8a0303" fill-opacity="0.85" />
          
          <!-- Index finger -->
          <path d="M175 50 c-5,-10 -10,-25 -10,-35 c0,-10 5,-15 15,-15 c10,0 15,5 15,15 c0,10 -5,25 -10,35 c-2,5 -8,5 -10,0 Z" fill="#8a0303" fill-opacity="0.8" />
          
          <!-- Middle finger -->
          <path d="M200 30 c-5,-15 -5,-25 0,-30 c5,-5 15,-5 20,0 c5,5 5,15 0,30 c-2,5 -18,5 -20,0 Z" fill="#8a0303" fill-opacity="0.8" />
          
          <!-- Ring finger -->
          <path d="M225 50 c5,-10 10,-25 10,-35 c0,-10 -5,-15 -15,-15 c-10,0 -15,5 -15,15 c0,10 5,25 10,35 c2,5 8,5 10,0 Z" fill="#8a0303" fill-opacity="0.8" />
          
          <!-- Pinky -->
          <path d="M250 80 c10,-15 15,-25 25,-25 c10,0 15,5 15,15 c0,10 -5,15 -15,25 c-10,10 -15,10 -20,0 c-5,-10 -5,-15 -5,-15 Z" fill="#8a0303" fill-opacity="0.75" />
          
          <!-- Drips and smears -->
          <path d="M180 230 c-5,20 -5,40 -2,50 c3,10 -5,10 -8,0 c-3,-10 -3,-30 10,-50 Z" fill="#8a0303" fill-opacity="0.7" />
          
          <path d="M210 230 c0,30 0,50 3,60 c3,10 -7,10 -10,0 c-3,-10 -3,-30 7,-60 Z" fill="#8a0303" fill-opacity="0.7" />
          
          <path d="M220 230 c5,25 5,45 2,55 c-3,10 -10,10 -12,0 c-2,-10 0,-30 10,-55 Z" fill="#8a0303" fill-opacity="0.7" />
          
          <path d="M125 180 c-10,10 -20,20 -30,20 c-5,0 -5,-5 0,-10 c5,-5 15,-10 30,-15 Z" fill="#8a0303" fill-opacity="0.6" />
          
          <!-- Blood speckles -->
          <circle cx="130" cy="230" r="5" fill="#8a0303" fill-opacity="0.8" />
          <circle cx="250" cy="220" r="6" fill="#8a0303" fill-opacity="0.7" />
          <circle cx="260" cy="180" r="4" fill="#8a0303" fill-opacity="0.7" />
          <circle cx="140" cy="120" r="3" fill="#8a0303" fill-opacity="0.8" />
          <circle cx="265" cy="140" r="5" fill="#8a0303" fill-opacity="0.6" />
          <circle cx="230" cy="300" r="4" fill="#8a0303" fill-opacity="0.5" />
          <circle cx="190" cy="290" r="3" fill="#8a0303" fill-opacity="0.5" />
          <circle cx="170" cy="310" r="2" fill="#8a0303" fill-opacity="0.5" />
        </svg>
    `;
    
    // Create blood splatter elements and inject SVG directly
    const bloodTop = document.createElement('div');
    bloodTop.className = 'blood-splatter top-right';
    bloodTop.innerHTML = bloodSplatterSVG;
    document.body.appendChild(bloodTop);
    
    const bloodBottom = document.createElement('div');
    bloodBottom.className = 'blood-splatter bottom-left';
    bloodBottom.innerHTML = bloodSplatterSVG;
    document.body.appendChild(bloodBottom);
    
    // Create knife element with embedded SVG
    const knife = document.createElement('div');
    knife.className = 'knife';
    knife.innerHTML = knifeSVG;
    document.querySelector('.ui-wrapper').appendChild(knife);
    
    // Create handprint with embedded SVG
    const handprint = document.createElement('div');
    handprint.className = 'handprint right-side';
    handprint.innerHTML = handprintSVG;
    document.querySelector('.ui-wrapper').appendChild(handprint);
    
    // Show blood splatter animation when clues are revealed
    const video = document.getElementById('murder-video');
    video.addEventListener('timeupdate', () => {
        // Using the cuePoints array defined in the main script
        cuePoints.forEach(cue => {
            if (video.currentTime >= cue.time && video.currentTime <= cue.time + 2) {
                if (cue.clue) {
                    document.querySelectorAll('.blood-splatter').forEach(splatter => {
                        splatter.classList.add('reveal');
                        setTimeout(() => {
                            splatter.classList.remove('reveal');
                        }, 2000);
                    });
                }
            }
        });
    });
    
    // Show handprint when murderer is revealed
    const revealMurdererBtn = document.getElementById('reveal-murderer-btn');
    revealMurdererBtn.addEventListener('click', () => {
        document.querySelector('.handprint').classList.add('reveal');
    });
}

// Blood drops animation function
function setupBloodDropsAnimation() {
    // Creates blood drops that fall randomly from the top of the screen
    function createBloodDrop() {
        const drop = document.createElement('div');
        
        // Randomize drop size
        const size = Math.random();
        if (size < 0.3) {
            drop.className = 'blood-drop small';
        } else if (size > 0.8) {
            drop.className = 'blood-drop large';
        } else {
            drop.className = 'blood-drop';
        }
        
        // Random horizontal position
        drop.style.left = Math.random() * 100 + 'vw';
        
        // Random fall speed (animation duration)
        drop.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Add to DOM
        document.body.appendChild(drop);
        
        // Remove after animation completes to avoid memory leaks
        setTimeout(() => {
            if (drop && drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, parseFloat(drop.style.animationDuration) * 1000);
    }
    
    // Create drops periodically, with some randomness
    function scheduleNextDrop() {
        // Random time between 1-3 seconds
        const delay = Math.random() * 2000 + 1000;
        
        setTimeout(() => {
            // Create 1-3 drops
            const dropCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < dropCount; i++) {
                setTimeout(createBloodDrop, i * 200); // Stagger multiple drops
            }
            
            // Schedule the next drop
            scheduleNextDrop();
        }, delay);
    }
    
    // Start the blood drops
    scheduleNextDrop();
}

// Crime scene tape function
function setupCrimeSceneTape() {
    // Create the four border elements
    const borders = ['top', 'right', 'bottom', 'left'];
    
    borders.forEach(position => {
        const border = document.createElement('div');
        border.className = `crime-scene-border ${position}`;
        document.body.appendChild(border);
    });
    
    // Function to show the crime scene tape
    function showCrimeSceneTape() {
        document.querySelectorAll('.crime-scene-border').forEach(border => {
            border.classList.add('visible');
        });
    }
    
    // Function to hide the crime scene tape
    function hideCrimeSceneTape() {
        document.querySelectorAll('.crime-scene-border').forEach(border => {
            border.classList.remove('visible');
        });
    }
    
    // Connect it to the reveal murderer button
    const revealMurdererBtn = document.getElementById('reveal-murderer-btn');
    revealMurdererBtn.addEventListener('click', () => {
        showCrimeSceneTape();
    });
    
    // Connect it to go back button (hide tape when going back)
    const goBackButton = document.getElementById('go-back-btn');
    goBackButton.addEventListener('click', () => {
        hideCrimeSceneTape();
    });
}

// Detective notes system function
function setupNoteTakingSystem() {
    // Create the note-taking section
    const noteSection = document.createElement('div');
    noteSection.className = 'note-section';
    noteSection.innerHTML = `
        <h3>Detective Notes</h3>
        <textarea id="detective-notes" placeholder="Write your suspicions here..."></textarea>
    `;
    
    // Append to UI after the clue box
    const clueBox = document.getElementById('clue-box');
    clueBox.parentNode.insertBefore(noteSection, clueBox.nextSibling);
    
    // Get the notes textarea
    const notesTextarea = document.getElementById('detective-notes');
    
    // Save notes to localStorage when typing
    notesTextarea.addEventListener('input', () => {
        localStorage.setItem('detectiveNotes', notesTextarea.value);
    });
    
    // Load previously saved notes if they exist
    const savedNotes = localStorage.getItem('detectiveNotes');
    if (savedNotes) {
        notesTextarea.value = savedNotes;
    }
    
    // Add a toggle button to show/hide notes (optional)
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-notes';
    toggleButton.textContent = 'Hide Notes';
    noteSection.appendChild(toggleButton);
    
    // Toggle notes visibility
    toggleButton.addEventListener('click', () => {
        notesTextarea.classList.toggle('hidden');
        toggleButton.textContent = notesTextarea.classList.contains('hidden') ? 'Show Notes' : 'Hide Notes';
    });
}

// Function to set up the audio playlist functionality with dropdown
function setupAudioPlaylist() {
    // Get the audio element
    const audioPlayer = document.getElementById('main-audio-player');
    
    // Get the dropdown element
    const trackDropdown = document.getElementById('track-dropdown');
    
    // Get the track info elements
    const trackTitle = document.getElementById('current-track-title');
    const trackDescription = document.getElementById('current-track-description');
    
    // Track data with paths and descriptions
    const tracks = {
        'scary-theme': {
            title: 'Scary Theme',
            description: 'A haunting melody that captures the chill of a crime scene investigation.',
            mp3: 'audio/scary-horror-house-evil-dark-music-288129.mp3',
            ogg: 'audio/scary-horror-house-evil-dark-music-288129.ogg'
        },
        'dark-ambient': {
            title: 'Dark Ambient',
            description: 'Atmospheric sounds perfect for examining clues and pondering motives.',
            mp3: 'audio/dark-ambient-horror-cinematic-halloween-atmosphere-scary-118585.mp3',
            ogg: 'audio/dark-ambient-horror-cinematic-halloween-atmosphere-scary-118585.ogg'
        },
        'creepy-music': {
            title: 'Creepy Music Box',
            description: 'A disturbing music box melody that hints at the twisted mind of the murderer.',
            mp3: 'audio/creepy-music-box-halloween-music-horror-scary-spooky-dark-ambient-118577.mp3',
            ogg: 'audio/creepy-music-box-halloween-music-horror-scary-spooky-dark-ambient-118577.ogg'
        }
    };
    
    // Function to change the track
    function changeTrack(trackId) {
        // Get the track data
        const track = tracks[trackId];
        
        // Update the audio sources
        const sources = audioPlayer.getElementsByTagName('source');
        sources[0].src = track.mp3;
        sources[1].src = track.ogg;
        
        // Update the track info
        trackTitle.textContent = track.title;
        trackDescription.textContent = track.description;
        
        // Reload the audio player with the new sources
        audioPlayer.load();
        
        // Add visual feedback
        const playerContainer = document.querySelector('.single-audio-player');
        playerContainer.classList.add('playing-now');
        
        // Remove the effect after a delay
        setTimeout(() => {
            playerContainer.classList.remove('playing-now');
        }, 2000);
    }
    
    // Handle dropdown change event
    trackDropdown.addEventListener('change', () => {
        const selectedTrack = trackDropdown.value;
        changeTrack(selectedTrack);
        
        // If the player was playing before, start playing the new track
        const wasPlaying = !audioPlayer.paused;
        if (wasPlaying) {
            audioPlayer.play();
        }
    });
    
    // Handle play event for visual feedback
    audioPlayer.addEventListener('play', () => {
        const playerContainer = document.querySelector('.single-audio-player');
        playerContainer.classList.add('playing-now');
    });
    
    // Handle pause event for visual feedback
    audioPlayer.addEventListener('pause', () => {
        const playerContainer = document.querySelector('.single-audio-player');
        playerContainer.classList.remove('playing-now');
    });
    
    // Handle ended event
    audioPlayer.addEventListener('ended', () => {
        const playerContainer = document.querySelector('.single-audio-player');
        playerContainer.classList.remove('playing-now');
    });
    
    // Connect with video elements to pause audio when videos play
    const mainVideo = document.getElementById('murder-video');
    const revealVideo = document.getElementById('reveal-video');
    
    [mainVideo, revealVideo].forEach(video => {
        video.addEventListener('play', () => {
            // Pause the audio player when a video plays
            audioPlayer.pause();
        });
    });
    
    // Create a theme toggle button
    const audioSection = document.querySelector('.audio-section');
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <button id="toggle-theme">Toggle Spooky Mode</button>
    `;
    
    audioSection.appendChild(themeToggle);
    
    // Add event listener to the theme toggle button
    document.getElementById('toggle-theme').addEventListener('click', () => {
        document.body.classList.toggle('extra-spooky');
        
        // Add CSS class to the audio player for visual effect
        audioPlayer.classList.toggle('spooky-player');
    });

}