// Lấy các phần tử giao diện
const container = document.getElementById('game-container');
const basket = document.getElementById('basket');
const apple = document.getElementById('apple');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

// Kích thước cố định
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 400;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 25;
const APPLE_SIZE = 25;

// Khai báo biến quản lý trạng thái
let score = 0;
let lives = 3;
let basketX = (CONTAINER_WIDTH - BASKET_WIDTH) / 2;
let basketSpeed = 10;

let appleX = 0;
let appleY = -APPLE_SIZE;
let baseSpeed = 5;
let appleSpeed = baseSpeed;

let gameLoopId = null;
let isPlaying = false;
let keysPressed = {};

// Lắng nghe sự kiện bàn phím
document.addEventListener('keydown', (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keysPressed[e.code] = false;
});

// Hàm di chuyển giỏ (không vượt quá khung game)
function updateBasketPosition() {
    if (keysPressed['ArrowLeft']) {
        basketX -= basketSpeed;
        if (basketX < 0) basketX = 0; // Giới hạn lề trái
    }
    if (keysPressed['ArrowRight']) {
        basketX += basketSpeed;
        if (basketX > CONTAINER_WIDTH - BASKET_WIDTH) {
            basketX = CONTAINER_WIDTH - BASKET_WIDTH; // Giới hạn lề phải
        }
    }
    basket.style.left = basketX + 'px';
}

// Reset táo về đỉnh màn hình ở vị trí hoành độ ngẫu nhiên
function resetApple() {
    appleX = Math.floor(Math.random() * (CONTAINER_WIDTH - APPLE_SIZE));
    appleY = -APPLE_SIZE;
    apple.style.left = appleX + 'px';
    apple.style.top = appleY + 'px';
}

// Khởi chạy game
function startGame() {
    score = 0;
    lives = 3;
    appleSpeed = baseSpeed;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    basketX = (CONTAINER_WIDTH - BASKET_WIDTH) / 2;
    basket.style.left = basketX + 'px';

    resetApple();
    startScreen.style.display = 'none';
    isPlaying = true;

    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    gameLoop();
}

// Xử lý khi hết mạng
function gameOver() {
    isPlaying = false;
    alert(`Game Over! Điểm số của bạn: ${score}`);
    startScreen.style.display = 'flex';
    startBtn.textContent = 'Chơi lại';
}

// Vòng lặp chính của trò chơi
function gameLoop() {
    if (!isPlaying) return;

    // 1. Cập nhật vị trí giỏ hứng
    updateBasketPosition();

    // 2. Táo rơi tự do
    appleY += appleSpeed;
    apple.style.top = appleY + 'px';

    const basketY = CONTAINER_HEIGHT - 10 - BASKET_HEIGHT;

    // 3. Kiểm tra va chạm (Collision Detection)
    const isCollidingX = (appleX + APPLE_SIZE >= basketX) && (appleX <= basketX + BASKET_WIDTH);
    const isCollidingY = (appleY + APPLE_SIZE >= basketY) && (appleY <= basketY);

    if (isCollidingX && isCollidingY) {
        score++;
        scoreDisplay.textContent = score;
        appleSpeed += 0.3; // Tăng nhẹ tốc độ rơi sau mỗi lần hứng trúng
        resetApple();
    } 
    // 4. Xử lý khi táo rơi chạm đáy (trừ 1 mạng)
    else if (appleY >= CONTAINER_HEIGHT) {
        lives--;
        livesDisplay.textContent = lives;
        if (lives <= 0) {
            gameOver();
            return;
        } else {
            resetApple();
        }
    }

    gameLoopId = requestAnimationFrame(gameLoop);
}

startBtn.addEventListener('click', startGame);