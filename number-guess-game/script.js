// Generate random number between 1000 and 9999
let randomNumber;
let attempts;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const resetBtn = document.getElementById("resetBtn");

// Initialize game
function startGame() {
    randomNumber = Math.floor(Math.random() * 9000) + 1000;
    attempts = 0;
    feedback.textContent = "Start guessing...";
    attemptsText.textContent = "Attempts: 0";
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    resetBtn.classList.add("hidden");
}

// Check guess
function checkGuess() {
    const userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < 1000 || userGuess > 9999) {
        feedback.textContent = "Please enter a valid number between 1000 and 9999.";
        return;
    }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    if (userGuess === randomNumber) {
        feedback.textContent = `🎉 Correct! The number was ${randomNumber}. You guessed it in ${attempts} attempts!`;
        guessInput.disabled = true;
        submitBtn.disabled = true;
        resetBtn.classList.remove("hidden");
    } else if (userGuess < randomNumber) {
        feedback.textContent = "Higher! 🔼";
    } else {
        feedback.textContent = "Lower! 🔽";
    }

    guessInput.value = "";
}

// Event Listeners
submitBtn.addEventListener("click", checkGuess);

// Press Enter to submit
guessInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});

// Reset button
resetBtn.addEventListener("click", startGame);

// Start game on load
startGame();