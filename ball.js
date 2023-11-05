// ballAnimation.js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Initialize ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 5,
  dy: 5,
};

let bounceCount = 0;
let animationId;
let isAnimating = false;
const resetButton = document.getElementById("resetButton");

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function updateBallPosition() {
  // Update ball position
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off the canvas boundaries
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    bounceCount++;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    bounceCount++;
  }
}

function draw() {
  clearCanvas(ctx);
  drawBall();
  updateBallPosition();

  // Display bounce count
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Bounces: " + bounceCount, 10, 30);

  animationId = requestAnimationFrame(draw);
  isAnimating = true;
}

resetButton.addEventListener("click", function () {
  if (isAnimating) {
    cancelAnimationFrame(animationId);
    isAnimating = false;
  }
  bounceCount = 0; // Reset the bounce
  draw(); // Restart the animation
});

canvas.addEventListener("click", function (event) {
  if (isAnimating) {
    cancelAnimationFrame(animationId);
    isAnimating = false;
  }

  const clickX = event.clientX - canvas.getBoundingClientRect().left;
  const clickY = event.clientY - canvas.getBoundingClientRect().top;

  // Keep the ball within the canvas boundaries
  ball.x = Math.max(ball.radius, Math.min(clickX, canvas.width - ball.radius));
  ball.y = Math.max(ball.radius, Math.min(clickY, canvas.height - ball.radius));

  draw(); // Restart the animation
});

draw();
