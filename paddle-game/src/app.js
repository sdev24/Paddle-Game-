const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;

const paddleHeight = 75;
const paddleWidth = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

const sliderSpeed = document.getElementById('speedSlider');
const sliderSize = document.getElementById('sizeSlider');

sliderSpeed.addEventListener('input', function() {
    dx = parseFloat(this.value);
    dy = parseFloat(this.value);
});

sliderSize.addEventListener('input', function() {
    ballRadius = parseFloat(this.value);
});

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        rightPressed = true;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        rightPressed = false;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
        leftPressed = false;
    }
}

function drawBall() {
    console.log('Drawing ball at:', x, y);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    console.log('Drawing paddle at:', x, y);
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, paddle1Y);
    drawPaddle(canvas.width - paddleWidth, paddle2Y);

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (rightPressed && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += 7;
    } else if (leftPressed && paddle2Y > 0) {
        paddle2Y -= 7;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);