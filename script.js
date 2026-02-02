// script.js for Valentine's site

// Function to show a pop-up message
function showPopup() {
    alert("Happy Valentine's Day! 💖");
}

// Function for heart animation
function animateHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.fontSize = '50px';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(heart);

    let growing = true;
    setInterval(() => {
        heart.style.fontSize = growing ? '70px' : '50px';
        growing = !growing;
    }, 500);
}

// Simple text-based game
function guessMessageGame() {
    const message = "Love is in the air!";
    const userGuess = prompt("Guess the Valentine's message:");
    if (userGuess === message) {
        alert("Correct! 🎉");
    } else {
        alert(`Wrong! The message was: ${message}`);
    }
}

// Function to change background color randomly
function changeBackgroundColor() {
    const colors = ['#ffcccc', '#ffb3b3', '#ff9999', '#ff6666', '#ff3333'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

// Call functions on page load
window.onload = function() {
    showPopup();
    animateHeart();
    changeBackgroundColor();
};

// Call the game after 5 seconds
setTimeout(guessMessageGame, 5000);
