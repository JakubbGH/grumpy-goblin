const emotionBox = document.getElementById('emotion-box');
const hiddenEmotion = document.getElementById('hidden-emotion');
const form = document.getElementById('goblin-form');
const status = document.getElementById('status');

// 1. Emotion Cycling
const moods = ["Click Here", "😊", "😠", "😢", "😐"];
let moodIndex = 0;

emotionBox.addEventListener('click', () => {
    moodIndex = (moodIndex + 1) % moods.length;
    const currentMood = moods[moodIndex];
    
    emotionBox.textContent = currentMood;
    hiddenEmotion.value = currentMood;
    
    if (currentMood === "Click Here") {
        emotionBox.style.fontSize = "0.9rem";
    } else {
        emotionBox.style.fontSize = "2.8rem";
    }
});

// 2. Email Sending
form.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const data = new FormData(event.target);
    status.innerHTML = "Sending to the goblin minder...";

    // Replace 'YOUR_ID' with your Formspree code
    fetch("https://formspree.io/f/xzdkarew", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.style.color = "green";
            status.innerHTML = "The goblin minder has received your message!";
            form.reset();
            emotionBox.textContent = "Click Here";
            emotionBox.style.fontSize = "0.9rem";
        } else {
            status.style.color = "red";
            status.innerHTML = "The goblin minder fumbled the message.";
        }
    }).catch(() => {
        status.style.color = "red";
        status.innerHTML = "Error connecting to the goblin minder.";
    });
});
