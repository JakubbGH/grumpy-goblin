// Grab the elements
const emotionBox = document.getElementById('emotion-box');
const submitBtn = document.getElementById('submit-btn');
const userInput = document.getElementById('user-input');

// Mood cycle
const moods = ["Click Here", "😊", "😠", "😢", "😐"];
let moodIndex = 0;

// Change emoji on click
emotionBox.addEventListener('click', () => {
    moodIndex = (moodIndex + 1) % moods.length;
    emotionBox.textContent = moods[moodIndex];
    
    // Adjust font size dynamically
    if (moods[moodIndex] === "Click Here") {
        emotionBox.style.fontSize = "0.9rem";
    } else {
        emotionBox.style.fontSize = "2rem";
    }
});

// Handle submit
submitBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    const currentMood = emotionBox.textContent;

    if (text !== "") {
        console.log(`The Goblin sees you are ${currentMood} and you said: ${text}`);
        alert("The goblin has recorded your grumbling.");
        userInput.value = ""; // Clear box
    } else {
        alert("The goblin demands words!");
    }
});
