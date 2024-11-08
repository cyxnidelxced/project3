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

    // Show the murderer's reveal video when the "Reveal Murderer" button is clicked
    revealMurdererBtn.addEventListener('click', () => {
        // Hide the main video and show the reveal video
        mainVideoWrapper.classList.add('hidden');
        revealVideoWrapper.classList.remove('hidden');
    
        // Hide suspect buttons and show 'Go Back' button
        suspectButtons.forEach(button => button.classList.add('hidden'));
        goBackButton.classList.remove('hidden');
    
        // Pause the main video when the reveal video is shown
        video.pause();
    
        // Update the UI to show the murderer’s profile
        suspectName.textContent = "Morgan";  // Murderer name
        suspectDescription.textContent = "The roommate is the murderer!";  // Description about the murderer
        suspectMotive.textContent = "She disguised herself and strangled Maddie with a ribbon from her teddy bear in her room.";  // Motive of the murderer
    
        // Change the headings
        suspectsHeading.textContent = "The Killer";  // Change "The Suspects" to "The Killer"
        suspectProfileHeading.textContent = "The Killer Profile"; // Change "Suspect Profile" to "The Killer Profile"

        // Change in clue text
        clueText.textContent = 'Teddy Bear Ribbon';
    
        // Get the reveal video element and play it automatically
        const revealVideo = document.getElementById('reveal-video');
        
        // Ensure the reveal video is unmuted
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

    // When the reveal video ends, go back to the main video
    const revealVideo = document.getElementById('reveal-video');
    revealVideo.addEventListener('ended', () => {
        // Reset the video to the beginning
        revealVideoWrapper.classList.add('hidden');
        mainVideoWrapper.classList.remove('hidden');
        video.currentTime = 0;

        // Hide 'Go Back' button and show suspect buttons again
        goBackButton.classList.add('hidden');
        suspectButtons.forEach(button => button.classList.remove('hidden'));

        // Play the main video from the beginning after the reveal video ends
        video.play();

        // Reset the headings to their original state
        suspectsHeading.textContent = "The Suspects"; // Reset "The Killer" to "The Suspects"
        suspectProfileHeading.textContent = "Suspect Profile"; // Reset "The Killer Profile" to "Suspect Profile"
    });

    // Button to go back to the main video
    goBackButton.addEventListener('click', () => {
        // Hide the reveal video and show the main video again
        revealVideoWrapper.classList.add('hidden');
        mainVideoWrapper.classList.remove('hidden');
    
        // Reset the main video to its initial state (or you could set it to the last known position)
        video.currentTime = 0;
        video.play();
    
        // Hide 'Go Back' button and show suspect buttons again
        goBackButton.classList.add('hidden');
        suspectButtons.forEach(button => button.classList.remove('hidden'));
    
        // Reset the profile information (to the default state, i.e., no suspect info)
        suspectName.textContent = '';
        suspectDescription.textContent = '';
        suspectMotive.textContent = '';

        // Hide suspect info and show victim info again
        suspectInfo.classList.add('hidden');
        victimInfo.classList.remove('hidden');
    
        // Pause the reveal video and reset it to the start
        revealVideo.pause();
        revealVideo.currentTime = 0;

        // Reset the headings to their original state when going back to the main video
        suspectsHeading.textContent = "The Suspects"; // Reset "The Killer" to "The Suspects"
        suspectProfileHeading.textContent = "Suspect Profile"; // Reset "The Killer Profile" to "Suspect Profile"

        // If there was any clue or reveal text, reset it to the initial state
        clueText.textContent = 'Waiting for a clue to appear...';
    });
});
