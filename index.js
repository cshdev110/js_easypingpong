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
const paddleSpeed = 10;

let intervalID;
let ballSpeed = 1; // 1 = 1px per frame the lowest speed
// Coordinates
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;

// Key Map
let keyMap = new Map([[
    'w', false,
    's', false,
    'ArrowUp', false,
    'ArrowDown', false
]]);

// Scores
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

// Event to listen for keypresses
window.addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case 'w':
            keyMap.set('w', true);
            console.log(evt.key);
            break;
        case 's':
            keyMap.set('s', true);
            console.log(evt.key);
            break;
        case 'ArrowUp':
            keyMap.set('ArrowUp', true);
            console.log(evt.key);
            break;
        case 'ArrowDown':
            keyMap.set('ArrowDown', true);
            break;
    }
});
window.addEventListener("keyup", (evt) => {
    switch (evt.key) {
        case 'w':
            keyMap.set('w', false);
            console.log(evt.key);
            break;
        case 's':
            keyMap.set('s', false);
            console.log(evt.key);
            break;
        case 'ArrowUp':
            keyMap.set('ArrowUp', false);
            console.log(evt.key);
            break;
        case 'ArrowDown':
            keyMap.set('ArrowDown', false);
            break;
    }
});

resetBtn.addEventListener("click", resetGame);

gameStart();
drawPaddles(); //temporal

function gameStart() {
    createBall();
    nextTick();
}

function nextTick() {
    intervalID = setTimeout(() => {
        changeDirection();
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

function drawBall(ballX, ballY) {

}

function checkCollision() {}

function changeDirection() {
    // const keyPressed = event.keyCode;
    // console.log(keyPressed);
    const paddle_1_up = 87;
    const paddle_1_down = 83;
    const paddle_2_up = 38;
    const paddle_2_down = 40;

    if(keyMap.get('w')) {
        paddle_1.y -= (paddle_1.y >= paddleSpeed) ? paddleSpeed : 0;
    }

    if(keyMap.get('s')) {
        paddle_1.y += (paddle_1.y <= gameBoard.height - paddle_1.height - paddleSpeed) ? paddleSpeed : 0;
    }

    if(keyMap.get('ArrowUp')) {
        paddle_2.y -= (paddle_2.y >= paddleSpeed) ? paddleSpeed : 0;
    }

    if(keyMap.get('ArrowDown')) {
        paddle_2.y += (paddle_2.y <= gameBoard.height - paddle_2.height - paddleSpeed) ? paddleSpeed : 0;
    }
}

function updateScore() {}

function resetGame() {}

