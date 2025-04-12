document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('dot');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameOverScreen = document.getElementById('gameOver');
    const finalScoreDisplay = document.getElementById('finalScore');
    let score = 0;
    let timeLeft = 30;
    let gameInterval;

    function getRandomPosition() {
        const maxX = window.innerWidth - dot.offsetWidth;
        const maxY = window.innerHeight - dot.offsetHeight;
        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);
        return { x: newX, y: newY };
    }

    function moveDot() {
        const position = getRandomPosition();
        dot.style.left = position.x + 'px';
        dot.style.top = position.y + 'px';
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        gameOverScreen.style.display = 'none';
        dot.style.display = 'block';
        moveDot();

        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        dot.style.display = 'none';
        finalScoreDisplay.textContent = score;
        gameOverScreen.style.display = 'block';
    }

    // Handle both click and touch events
    dot.addEventListener('click', handleClick);
    dot.addEventListener('touchstart', handleClick);

    function handleClick(e) {
        e.preventDefault(); // Prevent default touch behavior
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        moveDot();
    }

    function restartGame() {
        startGame();
    }

    // Initial start
    startGame();

    // Prevent scrolling on touch devices
    document.body.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
});