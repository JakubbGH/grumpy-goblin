// Grab the elements from the HTML
const emotionBox = document.getElementById('emotion-box');
const submitBtn = document.getElementById('submit-btn');
const userInput = document.getElementById('user-input');

// Define our list of emotions (starting with X as the default)
const emotions = ["X", "😊", "😠", "😢", "😐"];
let currentIndex = 0;

// Function to cycle the emotion when the box is clicked
emotionBox.addEventListener('click', () => {
    // Move to the next index in the array
    currentIndex++;
    
    // If we reach the end of the list, go back to the start (the X)
    if (currentIndex >= emotions.length) {
        currentIndex = 0;
    }
    
    // Update the box text to the new emoji
    emotionBox.textContent = emotions[currentIndex];
});

// Function for the Submit button
submitBtn.addEventListener('click', () => {
    const message = userInput.value;
    const currentEmoji = emotionBox.textContent;

    if (message.trim() === "") {
        alert("The Grumpy Goblin stares at your empty message...");
    } else {
        console.log("Goblin received:", message, "Mood:", currentEmoji);
        alert("Submitted to the Goblin!");
        
        // Optional: Reset the input after submit
        userInput.value = "";
    }
});
