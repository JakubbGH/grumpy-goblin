const emotionBox = document.getElementById('emotion-box');

const hiddenEmotion = document.getElementById('hidden-emotion');

const form = document.getElementById('goblin-form');

const status = document.getElementById('status');

const userInput = document.getElementById('user-input');

const attentionBtn = document.getElementById('attention-btn');



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



// 2. Dual Submission (Discord + IFTTT)

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    

    const messageText = userInput.value;

    const currentEmotion = hiddenEmotion.value;



    status.style.color = "black";

    status.innerHTML = "Recording goblin grumbles...";



    // --- DISCORD WEBHOOK SETUP ---

    // REPLACE the URL below with your actual Discord Webhook URL

    const discordWebhookUrl = "https://discord.com/api/webhooks/1489290884833869994/sj6t6kHTiHvac9p4ctyz2wsJy2K_JVESh7zW0p7_i6u-s49rkcmDpDA-5dawCZZhQ-qY";

    

    const discordPayload = {

        username: "Grumpy Goblin",

        avatar_url: "https://emoji.slack-edge.com/T024FPH1Z/goblin/d6074a3861.png",

        content: `**New Grumble Received!**\n**Emotion:** ${currentEmotion}\n**Message:** ${messageText}`

    };



    // --- IFTTT SETUP ---

    const iftttUrl = "https://maker.ifttt.com/trigger/Grumpy Goblin Govee/with/key/bmiQfTI93vgLEWj3afOTH3IfcabgeX_iwA7o3lasmw5";



    // Fire both requests

    try {

        const [discordRes, iftttRes] = await Promise.all([

            fetch(discordWebhookUrl, {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(discordPayload)

            }),

            fetch(iftttUrl, {

                method: "POST",

                mode: 'no-cors' // Keeps mobile browsers happy

            })

        ]);



        // Success!

        status.style.color = "green";

        status.innerHTML = "Your goblin grumble has been received.";

        form.reset();

        emotionBox.textContent = "Click Here";

        emotionBox.style.fontSize = "0.9rem";

        hiddenEmotion.value = "None";



    } catch (error) {

        console.error(error);

        status.style.color = "red";

        status.innerHTML = "The goblin minder is having issues receiving your grumble (Connection Error).";

    }

    attentionBtn.addEventListener('click', async () => {
    // 1. Visual feedback
    status.style.color = "red";
    status.innerHTML = "Demanding attention...";

    // 2. The Webhook URL (Replace this with your actual webhook)
    const attentionWebhookUrl = "REPLACE_WITH_YOUR_NEW_WEBHOOK_URL";

    try {
        const response = await fetch(attentionWebhookUrl, {
            method: "POST",
            mode: 'no-cors' // Recommended for IFTTT or basic webhooks on mobile
        });

        // 3. Success Feedback
        status.style.color = "green";
        status.innerHTML = "Attention has been demanded!";
        
        // Optional: Clear the status after 3 seconds
        setTimeout(() => { status.innerHTML = ""; }, 3000);

    } catch (error) {
        console.error(error);
        status.style.color = "red";
        status.innerHTML = "The goblin's cry for attention failed.";
    }
});

