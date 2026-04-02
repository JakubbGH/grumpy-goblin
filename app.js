const emotionBox = document.getElementById('emotion-box');
const hiddenEmotion = document.getElementById('hidden-emotion');
const form = document.getElementById('goblin-form');
const status = document.getElementById('status');
const userInput = document.getElementById('user-input');

// 1. Emotion Cycling Logic
const moods = ["Click Here", "😊", "😠", "😢", "😐"];
let moodIndex = 0;

emotionBox.addEventListener('click', () => {
    moodIndex = (moodIndex + 1) % moods.length;
    const currentMood = moods[moodIndex];
    
    emotionBox.textContent = currentMood;
    hiddenEmotion.value = currentMood; // Updates the hidden input for the email
    
    if (currentMood === "Click Here") {
        emotionBox.style.fontSize = "0.9rem";
    } else {
        emotionBox.style.fontSize = "2.5rem";
    }
});

// 2. Email Sending Logic
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop page refresh
    
    const data = new FormData(event.target);
    
    status.innerHTML = "Sending to the goblin...";

    // REPLACE 'xbjvnrqz' WITH YOUR ACTUAL FORMSPREE ID
    fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Success! The goblin has your message.";
            form.reset();
            emotionBox.textContent = "Click Here";
            emotionBox.style.fontSize = "0.9rem";
        } else {
            status.innerHTML = "Oops! The goblin dropped your message.";
        }
    }).catch(error => {
        status.innerHTML = "Error connecting to the goblin's cave.";
    });
});
