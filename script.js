const startGameBtn = document.getElementById('startGame');
const restartGameBtn = document.getElementById('restartGame');
const submitGuessBtn = document.getElementById('submitGuess');
const userGuessInput = document.getElementById('userGuess');
const gameInfo = document.getElementById('gameInfo');
const attemptsInfo = document.getElementById('attemptsInfo');
const hint = document.getElementById('hint');
const gameResult = document.getElementById('gameResult');
const settingsDiv = document.querySelector('.settings');
const gameArea = document.querySelector('.game-area');

let secretNumber;
let attempts;
let maxAttempts;
let minRange;
let maxRange;

function startNewGame() {
    minRange = parseInt(document.getElementById('minRange').value);
    maxRange = parseInt(document.getElementById('maxRange').value);
    maxAttempts = parseInt(document.getElementById('maxAttempts').value);
    
    if (minRange >= maxRange) {
        alert('Максимальное число должно быть больше минимального!');
        return;
    }
    
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    
    gameInfo.textContent = `Я загадал число от ${minRange} до ${maxRange}. Попробуй угадать!`;
    attemptsInfo.textContent = `Попытка ${attempts + 1}/${maxAttempts}`;
    hint.textContent = '';
    gameResult.textContent = '';
    gameResult.className = 'hidden';
    
    settingsDiv.classList.add('hidden');
    gameArea.classList.remove('hidden');
    restartGameBtn.classList.add('hidden');
    
    userGuessInput.focus();
}

function checkGuess() {
    const userGuess = parseInt(userGuessInput.value);
    
    if (isNaN(userGuess)) {
        hint.textContent = 'Пожалуйста, введите число!';
        return;
    }
    
    if (userGuess < minRange || userGuess > maxRange) {
        hint.textContent = `Число должно быть между ${minRange} и ${maxRange}!`;
        return;
    }
    
    attempts++;
    attemptsInfo.textContent = `Попытка ${attempts}/${maxAttempts}`;
    
    if (userGuess === secretNumber) {
        endGame(true);
        return;
    }
    
    if (userGuess < secretNumber) {
        hint.textContent = 'Загаданное число больше.';
    } else {
        hint.textContent = 'Загаданное число меньше.';
    }
    
    if (attempts >= maxAttempts) {
        endGame(false);
    }
    
    userGuessInput.value = '';
    userGuessInput.focus();
}

function endGame(isWin) {
    if (isWin) {
        gameResult.textContent = `Поздравляю! Ты угадал число ${secretNumber} за ${attempts} попыток!`;
        gameResult.classList.add('win');
    } else {
        gameResult.textContent = `Соберись давай тряпка ${secretNumber}.`;
        gameResult.classList.add('lose');
    }
    
    gameResult.classList.remove('hidden');
    restartGameBtn.classList.remove('hidden');
    submitGuessBtn.disabled = true;
}

startGameBtn.addEventListener('click', startNewGame);
restartGameBtn.addEventListener('click', startNewGame);

submitGuessBtn.addEventListener('click', checkGuess);

userGuessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});