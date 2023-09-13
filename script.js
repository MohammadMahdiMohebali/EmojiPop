document.addEventListener("DOMContentLoaded", function () {
    const emojiGrid = document.getElementById("emoji-grid");
    const scoreElement = document.getElementById("score");
    const startButton = document.getElementById("start-button");
    const howToPlayButton = document.getElementById("how-to-play-button");
    const restartButton = document.getElementById("restart-button");
    const howToPlayModal = document.getElementById("how-to-play-modal");
    const darkModeButton = document.getElementById("dark-mode-button");
    const body = document.body;

    let score = 0;
    let evilEmojis = 0;
    let gameInterval;

    function generateEmoji() {
        const emojis = ["😃", "😃", "😃", "😃", "😃", "😠", "😠", "😠", "😠", "😈"];
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const emoji = emojis[randomIndex];
        if (emojiGrid.childElementCount < 30) {
            const emojiElement = document.createElement("div");
            emojiElement.classList.add("emoji");
            emojiElement.innerText = emoji;
            emojiElement.addEventListener("click", () => {
                if (emoji === "😃") {
                    score--;
                    emojiElement.innerText = "😠";
                } else if (emoji === "😠") {
                    score++;
                    emojiElement.innerText = "😃";
                } else if (emoji === "😈") {
                    emojiElement.innerText = "😃";
                }
                scoreElement.textContent = score;
                emojiGrid.removeChild(emojiElement);
                if (emoji === "😈") {
                    evilEmojis--;
                }
                if (evilEmojis >= 3) {
                    endGame();
                }
            });
            emojiGrid.appendChild(emojiElement);
            if (emoji === "😈") {
                evilEmojis++;
            }
        }
    }

    function startGame() {
        score = 0;
        evilEmojis = 0;
        scoreElement.textContent = score;
        emojiGrid.innerHTML = "";
        gameInterval = setInterval(generateEmoji, 100);
        startButton.disabled = true;
        howToPlayButton.disabled = true;
        restartButton.style.display = "none";
    }

    function endGame() {
        clearInterval(gameInterval);
        emojiGrid.innerHTML = `<p>Game Over</p>`;
        restartButton.style.display = "block";
    }

    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);
    howToPlayButton.addEventListener("click", () => {
        howToPlayModal.style.display = "block";
    });

    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", () => {
        howToPlayModal.style.display = "none";
    });

    darkModeButton.addEventListener("click", toggleDarkMode);

    window.addEventListener("click", (event) => {
        if (event.target == howToPlayModal) {
            howToPlayModal.style.display = "none";
        }
    });
});
