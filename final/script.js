const boardSize = 5; // 5x5 board
const gameBoard = document.getElementById('game-board');
const moveCountElem = document.getElementById('moveCount');
const timerElem = document.getElementById('timer');
const targetCountElem = document.getElementById('targetCount');
const hintButton = document.getElementById('hintButton');
const newGameButton = document.getElementById('newGameButton');
let hintCount = 0;
const maxHints = 6;
let moveCount = 0;
let targetCount = 0;
let startTime;
let timerInterval;

// Initialize the game board
function initializeBoard() {
    gameBoard.innerHTML = ''; // Clear any existing lights
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize * boardSize; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        light.classList.add('is-on'); // All lights should start as on
        light.addEventListener('click', () => toggleLights(i));
        gameBoard.appendChild(light);
    }

    // Reset board to all lights on
    resetBoard();

    hintCount = 0; // Reset the hint count
    moveCount = 0; // Reset the move count
    updateMoveCount();
    startTimer();
}

// Reset the board to all white (lights on)
function resetBoard() {
    const lights = document.querySelectorAll('.light');
    lights.forEach(light => light.classList.remove('is-off')); // Ensure all lights are on
}

// Turn all lights off
function turnAllLightsOff() {
    const lights = document.querySelectorAll('.light');
    lights.forEach(light => light.classList.add('is-off')); // Ensure all lights are off
}

// Toggle light and its neighbors
function toggleLights(index) {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    toggleLight(row, col);
    if (row > 0) toggleLight(row - 1, col);
    if (row < boardSize - 1) toggleLight(row + 1, col);
    if (col > 0) toggleLight(row, col - 1);
    if (col < boardSize - 1) toggleLight(row, col + 1);

    moveCount++;
    updateMoveCount();
    checkWin();
}

// Toggle a single light
function toggleLight(row, col) {
    const index = row * boardSize + col;
    const light = gameBoard.children[index];
    light.classList.toggle('is-off');
}

// Randomize the board to create a solvable puzzle
function randomizeBoard() {
    // Apply random toggles to create a solvable puzzle
    for (let i = 0; i < boardSize * boardSize; i++) {
        if (Math.random() > 0.5) {
            toggleLights(i);
        }
    }
}

// Check if all lights are off
function checkWin() {
    const lights = document.querySelectorAll('.light');
    const allOff = [...lights].every(light => light.classList.contains('is-off'));

    if (allOff) {
        stopTimer();
        setTimeout(() => {
            turnAllLightsOff(); // Turn off all lights to indicate winning
            window.alert('You win!');
            initializeBoard(); // Reinitialize the game board after winning
        }, 100); // Delay to ensure all lights are visually off
    }
}

// Hint button functionality
hintButton.addEventListener('click', giveHint);

function giveHint() {
    hintCount++;
    const lights = document.querySelectorAll('.light');

    if (hintCount < maxHints) {
        for (let i = 0; i < lights.length; i++) {
            if (!lights[i].classList.contains('is-off')) {
                toggleLights(i); // Toggle the light to give a hint
                break;
            }
        }
    } else {
        // If hintCount reaches maxHints, solve the game by turning off all lights
        turnAllLightsOff();
        setTimeout(() => {
            window.alert('You win!');
            initializeBoard(); // Reinitialize the game board after winning
        }, 100); // Delay to ensure all lights are visually off
    }
}

// Update the move count display
function updateMoveCount() {
    moveCountElem.textContent = moveCount;
}

// Start the timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    timerElem.textContent = `${minutes}:${seconds}`;
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// New Game button functionality
newGameButton.addEventListener('click', () => {
    stopTimer();
    initializeBoard();
});

// Initialize the game
initializeBoard();
