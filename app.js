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
    hiddenEmotion.value = currentMood;
    
    if (currentMood === "Click Here") {
        emotionBox.style.fontSize = "0.9rem";
    } else {
        emotionBox.style.fontSize = "2.8rem";
    }
});

// 2. Dual Submission Logic (Email + IFTTT)
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.target);
    const messageText = userInput.value;
    const currentEmotion = hiddenEmotion.value;

    status.style.color = "black";
    status.innerHTML = "Waking the goblin...";

    // Prepare the two requests
    const formspreeRequest = fetch("https://formspree.io/f/xzdkarew", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    // IFTTT Webhook (Using 'no-cors' mode to prevent mobile security blocks)
    const iftttRequest = fetch("https://maker.ifttt.com/trigger/Grumpy Goblin Govee/with/key/bmiQfTI93vgLEWj3afOTH3IfcabgeX_iwA7o3lasmw5", {
        method: "POST",
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            value1: currentEmotion, 
            value2: messageText 
        })
    });

    // Fire both at the same time
    Promise.all([formspreeRequest, iftttRequest])
        .then(([formResponse]) => {
            if (formResponse.ok) {
                status.style.color = "green";
                status.innerHTML = "Success! Email sent and lights triggered.";
                form.reset();
                emotionBox.textContent = "Click Here";
                emotionBox.style.fontSize = "0.9rem";
            } else {
                status.style.color = "red";
                status.innerHTML = "Email failed, but lights might have worked.";
            }
        })
        .catch(error => {
            console.error(error);
            status.style.color = "red";
            status.innerHTML = "The goblin encountered a connection error.";
        });
});
