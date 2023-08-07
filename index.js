// Variables

const gameBoard = document.querySelector('#gameBoard');
// Context is where it is drawn
const ctx = gameBoard.getContext('2d');
const scoreT = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'forestgreen';
const paddleColor_1 = 'lightblue';
const paddleColor_2 = 'red';
const paddleBorder = 'black';
const ballColor = 'white';
const ballBoardColor = 'black';
const ballRadius = 12.5;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 1; // 1 = 1px per frame the lowest speed
// Coordinates
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player_1_score = 0;
let player_2_score = 0;

// Paddles
let paddle_1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let paddle_2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
}

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
drawPaddles();

function gameStart() {
    createBall();
    nextTick();
}

function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddleColor_1;
    ctx.fillRect(paddle_1.x, paddle_1.y, paddle_1.width, paddle_1.height);
    ctx.strokeRect(paddle_1.x, paddle_1.y, paddle_1.width, paddle_1.height);

    ctx.fillStyle = paddleColor_2;
    ctx.fillRect(paddle_2.x, paddle_2.y, paddle_2.width, paddle_2.height);
    ctx.strokeRect(paddle_2.x, paddle_2.y, paddle_2.width, paddle_2.height);
}

function createBall() {}

function moveBall() {}

function drawBall(ballX, ballY) {}

function checkCollision() {}

function changeDirection() {
    const keyPressed = event.keyCode;
    console.log(keyPressed);
}

function updateScore() {}

function resetGame() {}