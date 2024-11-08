document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('murder-video');
    const clueText = document.getElementById('clue-text');
    const revealBox = document.getElementById('reveal-box');
    const revealText = document.getElementById('reveal-text');
    const suspectName = document.getElementById('suspect-name');
    const suspectDescription = document.getElementById('suspect-description');
    const suspectMotive = document.getElementById('suspect-motive');
    const revealMurdererBtn = document.getElementById('reveal-murderer-btn');  // Reveal button
    const revealVideoWrapper = document.getElementById('reveal-video-wrapper');
    const mainVideoWrapper = document.getElementById('main-video-wrapper');
    const victimInfo = document.getElementById('victim-info');
    const suspectInfo = document.getElementById('suspect-info');
    const goBackButton = document.getElementById('go-back-btn');
    const suspectButtons = document.querySelectorAll('.suspect-btn');
    const suspectsHeading = document.getElementById('suspects-heading');
    const suspectProfileHeading = document.getElementById('suspect-info').querySelector('h2');

    // Define cue points (Remove the "reveal" cue point for now)
    const cuePoints = [
        { time: 77, suspect: 'Friend', description: 'Tess is a friend of Maddie. She designs her own line of lipstick. According to her, she hurt her wrist at the gym.', motive: 'Maddie stole her lipstick.' },
        { time: 139, suspect: 'Roommate', description: 'Morgan is the roommate. She works for long hours due to Maddie not paying rent as she is supposed to. She had to skip classes due to her work hours, making her annoyed and bitter.', motive: 'Frustration at the fact that Maddie is not a good roommate.' },
        { time: 214, suspect: 'Boyfriend', description: 'Regan is the boyfriend. He seems to be the only one committed to the relationship.', motive: 'Not happy when all Maddie pays attention to is her work and not their relationship. Jealous that his girlfriend only cares about her fans.' },
        { time: 77, clue: 'Stamp from Lila Lounge', updateProfile: 'Friend' },
        { time: 139, clue: 'Nail polish', updateProfile: 'Roommate' },
        { time: 214, clue: 'Strangulation marks on neck', updateProfile: 'Boyfriend' },
    ];

    // Button event listeners to jump to corresponding time in the video
    document.getElementById('friend-btn').addEventListener('click', () => {
        video.currentTime = 77; // Jump to the friend section (77 seconds)
    });

    document.getElementById('roommate-btn').addEventListener('click', () => {
        video.currentTime = 139; // Jump to the roommate section (139 seconds)
    });

    document.getElementById('boyfriend-btn').addEventListener('click', () => {
        video.currentTime = 214; // Jump to the boyfriend section (214 seconds)
    });

    // Function to trigger the glow effect
    function triggerGlowEffect() {
        const uiWrapper = document.querySelector('.ui-wrapper');
        const infoBoxes = document.querySelectorAll('.info-box');
        const heading = document.getElementById('suspects-heading');

        uiWrapper.classList.add('glowing');
        heading.classList.add('glowing');
        infoBoxes.forEach(box => box.classList.add('glowing'));

        setTimeout(() => {
            uiWrapper.classList.remove('glowing');
            heading.classList.remove('glowing');
            infoBoxes.forEach(box => box.classList.remove('glowing'));
        }, 3000);
    }

    // Event listener for time updates on the video
    video.addEventListener('timeupdate', () => {
        let currentTime = video.currentTime;

        cuePoints.forEach((cue, index) => {
            if (currentTime >= cue.time && currentTime <= cue.time + 2) { 
                if (cue.suspect) {
                    suspectName.textContent = cue.suspect;
                    suspectDescription.textContent = cue.description;
                    suspectMotive.textContent = 'Motive: ' + cue.motive;

                    victimInfo.classList.add('hidden');
                    suspectInfo.classList.remove('hidden');
                }

                if (cue.clue) {
                    clueText.textContent = cue.clue;
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
        mainVideoWrapper.classList.add('hidden');
        revealVideoWrapper.classList.remove('hidden');

        suspectButtons.forEach(button => button.classList.add('hidden'));
        goBackButton.classList.remove('hidden');

        video.pause();

        // Update the UI to show the murderer’s profile
        suspectName.textContent = "Morgan";
        suspectDescription.textContent = "The roommate is the murderer!";
        suspectMotive.textContent = "She disguised herself and strangled Maddie with a ribbon from her teddy bear in her room.";

        suspectsHeading.textContent = "The Killer";
        suspectProfileHeading.textContent = "The Killer Profile";

        clueText.textContent = 'Teddy Bear Ribbon';

        // Ensure the reveal video is unmuted
        const revealVideo = document.getElementById('reveal-video');
        revealVideo.muted = false;

        revealVideo.play();

        const textTracks = revealVideo.textTracks;
        if (textTracks.length > 0) {
            const track = textTracks[0];
            track.mode = 'showing'; 
        }
    });

    // When the reveal video ends, go back to the main video
    const revealVideo = document.getElementById('reveal-video');
    revealVideo.addEventListener('ended', () => {
        revealVideoWrapper.classList.add('hidden');
        mainVideoWrapper.classList.remove('hidden');
        video.currentTime = 0;

        goBackButton.classList.add('hidden');
        suspectButtons.forEach(button => button.classList.remove('hidden'));

        video.play();

        suspectsHeading.textContent = "The Suspects";
        suspectProfileHeading.textContent = "Suspect Profile";
    });

    // Button to go back to the main video
    goBackButton.addEventListener('click', () => {
        revealVideoWrapper.classList.add('hidden');
        mainVideoWrapper.classList.remove('hidden');

        video.currentTime = 0;
        video.play();

        goBackButton.classList.add('hidden');
        suspectButtons.forEach(button => button.classList.remove('hidden'));

        revealMurdererBtn.classList.add('hidden');

        suspectName.textContent = 'Maddie';
        suspectDescription.textContent = 'A beauty vlogger who was found strangled to death.';
        suspectMotive.textContent = 'Motive: Not applicable';

        suspectInfo.classList.add('hidden');
        victimInfo.classList.remove('hidden');

        const revealVideo = document.getElementById('reveal-video');
        revealVideo.pause();
        revealVideo.currentTime = 0;

        clueText.textContent = 'Waiting for a clue to appear...';
    });
});

