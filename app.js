// Get elements
const emotionBox = document.getElementById('emotion-box');
const submitBtn = document.getElementById('submit-btn');
const userInput = document.getElementById('user-input');

// Mood list (Cycles back to "Click Here" at the end)
const moods = ["Click Here", "😊", "😠", "😢", "😐"];
let moodIndex = 0;

// Click to change emotion
emotionBox.addEventListener('click', () => {
    moodIndex = (moodIndex + 1) % moods.length;
    emotionBox.textContent = moods[moodIndex];
    
    // Increase font size if it's an emoji, shrink if it's text
    if (moods[moodIndex].length > 2) {
        emotionBox.style.fontSize = "1rem";
    } else {
        emotionBox.style.fontSize = "2rem";
    }
});

// Submit logic
submitBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    const currentMood = emotionBox.textContent;

    if (text === "") {
        alert("The goblin grumbles... you haven't typed anything!");
    } else {
        console.log(`Mood: ${currentMood} | Message: ${text}`);
        alert("Your thoughts have been fed to the goblin.");
        userInput.value = ""; // Clear input
    }
});
