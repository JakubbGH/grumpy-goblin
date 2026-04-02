// Selecting the elements
const submitBtn = document.getElementById('submit-btn');
const display = document.getElementById('emoji-display');
const inputField = document.getElementById('user-input');

// Our Grumpy Goblin's moods
const moods = ["😊", "😠", "😢", "😐"];
let currentMoodIndex = 0;

submitBtn.addEventListener('click', () => {
    const text = inputField.value.trim();

    if (text !== "") {
        // Change the emoji based on the cycle
        display.textContent = moods[currentMoodIndex];

        // Move to the next mood in the list
        currentMoodIndex = (currentMoodIndex + 1) % moods.length;

        // Clear the box for the next insult/compliment
        inputField.value = "";
    } else {
        alert("The goblin ignores your silence. Type something!");
    }
});
