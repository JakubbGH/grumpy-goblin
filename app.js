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
    
    // Scale emoji size based on content
    if (currentMood === "Click Here") {
        emotionBox.style.fontSize = "0.9rem";
    } else {
        emotionBox.style.fontSize = "2.8rem";
    }
});

// 2. Submit to Formspree
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.target);
    status.innerHTML = "Sending to the goblin...";

    // Replace 'your_id' with your actual Formspree ID
    fetch("https://formspree.io/f/your_id", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Success! The goblin has your message.";
            form.reset();
            emotionBox.textContent = "Click Here";
            emotionBox.style.fontSize = "0.9rem";
        } else {
            status.innerHTML = "Submission failed.";
        }
    }).catch(() => {
        status.innerHTML = "Error connecting to the goblin.";
    });
});
