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
    { time: 139, suspect: 'Roommate', description: 'Morgan is the roommate. She works for long hours due to Maddie not paying rent as she is supposed to. She had to skip classes do to her work hours, making her annoyed and bitter.', motive: 'Fustration at the fact that Maddie is not a good roommate.' },
    { time: 214, suspect: 'Boyfriend', description: 'Regan is the boyfriend. He seems to be the only one committed to the relationship.', motive: 'Not happy when all Maddie pays attention to is her work and not their relationship. Love turn to hate?' },
    { time: 77, clue: 'Stamp from Lila Lounge', updateProfile: 'Friend', reveal: false },
    { time: 139, clue: 'Nail polish', updateProfile: 'Roommate', reveal: false },
    { time: 214, clue: 'Strangulation marks on neck', updateProfile: 'Boyfriend', reveal: false },
    { time: 278, reveal: true }
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
                    // Show the button to reveal the murderer
                     revealMurdererBtn.classList.remove('hidden');
                }
    
                // Apply glow effect for all cue points except the last one
                if (index < cuePoints.length - 1) {
                    triggerGlowEffect();
                }
            }
        });
    });


