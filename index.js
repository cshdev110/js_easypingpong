// Variables -------------------------------------------------------------

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
let ballColor = 'white';
const ballBorderColor = 'black';
let ballRadius = 100.5;
const paddleSpeed = 5;

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
let betweenPaddles = false;

// Event -------------------------------------------------------

// Event to listen for keypresses
window.addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case 'w':
            keyMap.set('w', true);
            break;
        case 's':
            keyMap.set('s', true);
            break;
        case 'ArrowUp':
            keyMap.set('ArrowUp', true);
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
            break;
        case 's':
            keyMap.set('s', false);
            break;
        case 'ArrowUp':
            keyMap.set('ArrowUp', false);
            break;
        case 'ArrowDown':
            keyMap.set('ArrowDown', false);
            break;
    }
});

resetBtn.addEventListener("click", resetGame);

// Functions ----------------------------------------------------

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

function createBall() {
    ballSpeed = 1;
    ballXDirection = (Math.round(Math.random()) == 1) ? 1 : -1;
    ballYDirection = (Math.round(Math.random()) == 1) ? 1 : -1;
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}

function moveBall() {
    ballX += ballSpeed * ballXDirection;
    ballY += ballSpeed * ballYDirection;
}

function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function checkCollision() {    
    // Check if ball is out of bounds in the X axis
    if (ballX + ballRadius >= gameWidth || ballX - ballRadius <= 0) {
        player_1_score = (ballX + ballRadius >= gameWidth) ? player_1_score + 1 : player_1_score;
        player_2_score = (ballX - ballRadius <= 0) ? player_2_score + 1 : player_2_score;
        updateScore();
        createBall();
        ballXDirection *= -1;
        return;
    }

    // Check if ball is out of bounds in the Y axis
    if (ballY + ballRadius >= gameHeight || ballY - ballRadius <= 0) {
        ballYDirection *= -1;
    }

    // Check if ball is colliding with paddles
    // The betweenPaddles is for when the ball gets stuck between the width of any of paddles.
    // Careful with parentheses. Here, the whole OR (||) needs to be separated with parentheses.
    if (!betweenPaddles && 
        ((ballX + ballRadius >= paddle_2.x && (ballY >= paddle_2.y && ballY <= (paddle_2.height + paddle_2.y))) ||
        (ballX - ballRadius <= paddle_1.width && (ballY >= paddle_1.y && ballY <= (paddle_1.height + paddle_1.y))))) {
        ballXDirection *= -1;
        ballSpeed += 0.3;
        betweenPaddles = true;
        // Randomise ball color
        ballColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        // Decreasing ball radius
        ballRadius = (ballRadius > 5) ? ballRadius - 10 : ballRadius;

    }
    if (betweenPaddles && (ballX + ballRadius < paddle_2.x) && (ballX - ballRadius > paddle_1.width)) {
        betweenPaddles = false;
    }
}

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

function updateScore() {
    scoreT.textContent = `${player_1_score} - ${player_2_score}`;
}

function resetGame() {
    player_1_score = 0;
    player_2_score = 0;
    paddle_1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    paddle_2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    }
    ballSpeed = 1;
    ballX = 0; 
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    ballColor = 'white';
    ballRadius = 100.5;
    updateScore();
    clearInterval(intervalID);
    gameStart();
}


// Main ---------------------------------------------------------

gameStart();
drawPaddles(); //temporal