// Game state variables
let playerScore = 0;
let computerScore = 0;

// DOM elements
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resultDisplay = document.getElementById("round-result");
const buttons = document.querySelectorAll(".choice");

// Possible choices
const choices = ["rock", "paper", "scissors"];

// Generate computer choice randomly
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function determineWinner(player, computer) {

    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }

    return "computer";
}

const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");

const emojiMap = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Prevent spam clicking during animation
        buttons.forEach(btn => btn.disabled = true);

        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();

        // Reset hands
        playerHand.textContent = "✊";
        computerHand.textContent = "✊";

        // Start shaking animation
        playerHand.classList.add("shaking");
        computerHand.classList.add("shaking");

        resultDisplay.textContent = "Rock... Paper... Scissors...";

        // Delay reveal (1.2s)
        setTimeout(() => {

            // Stop shaking
            playerHand.classList.remove("shaking");
            computerHand.classList.remove("shaking");

            // Reveal actual choices
            playerHand.textContent = emojiMap[playerChoice];
            computerHand.textContent = emojiMap[computerChoice];

            playerHand.classList.add("reveal");
            computerHand.classList.add("reveal");

            const winner = determineWinner(playerChoice, computerChoice);

            if (winner === "player") {
                playerScore++;
                resultDisplay.textContent = "You win this round!";
            } 
            else if (winner === "computer") {
                computerScore++;
                resultDisplay.textContent = "Computer wins this round!";
            } 
            else {
                resultDisplay.textContent = "It's a draw!";
            }

            playerScoreDisplay.textContent = playerScore;
            computerScoreDisplay.textContent = computerScore;

            // Remove reveal animation class
            setTimeout(() => {
                playerHand.classList.remove("reveal");
                computerHand.classList.remove("reveal");
            }, 300);

            // Re-enable buttons
            buttons.forEach(btn => btn.disabled = false);

        }, 1200);
    });
});