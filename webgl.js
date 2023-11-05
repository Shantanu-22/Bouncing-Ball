
const backgroundCanvas = document.getElementById("webglCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");

// Set the background canvas size to match the viewport
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

const spheres = [];

// random spheres and animations
for (let i = 0; i < 50; i++) {
  const x = Math.random() * backgroundCanvas.width;
  const y = Math.random() * backgroundCanvas.height;
  const radius = Math.random() * 20 + 10;
  const dx = (Math.random() - 0.5) * 2;
  const dy = (Math.random() - 0.5) * 2;
  spheres.push({ x, y, radius, dx, dy });
}

function animateBackground() {
  backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  for (const sphere of spheres) {
    backgroundCtx.fillStyle = "rgba(255, 255, 255, 0.3)";

    backgroundCtx.beginPath();
    backgroundCtx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
    backgroundCtx.fill();

    sphere.x += sphere.dx;
    sphere.y += sphere.dy;

    // Bounce off the canvas boundaries
    if (sphere.x + sphere.radius > backgroundCanvas.width || sphere.x - sphere.radius < 0) {
      sphere.dx = -sphere.dx;
    }
    if (sphere.y + sphere.radius > backgroundCanvas.height || sphere.y - sphere.radius < 0) {
      sphere.dy = -sphere.dy;
    }
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();