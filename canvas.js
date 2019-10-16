// setup canvas =============================
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// setup GUI =============================
const gui = new dat.GUI();

const controls = {
  dx: 0, // Speed on the x-axis
  dy: 0, // Speed on the y-axis
  tail: -5,
  pause: false
};

gui.add(controls, 'dx', -20, 20);
gui.add(controls, 'dy', -20, 20);
gui.add(controls, 'tail', -10, 0);
gui.add(controls, 'pause');

// setup Ball =============================
class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
}

Ball.prototype.draw = function () {
  c.beginPath();
  c.fillStyle = this.color;
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fill();
  c.closePath();
};

const init = () => {
  newBall.draw();
}

const colors = [
  '#e53935',
  '#d81b60',
  '#8e24aa',
  '#5e35b1',
  '#3949ab',
  '#1e88e5',
  '#039be5',
  '#00acc1',
  '#00897b',
  '#43a047',
  '#ffeb3b',
  '#ef6c00'
];

// Returns a color between 0 and the length of our color array
const randomColor = colors => colors[Math.floor(Math.random() * colors.length)];
const newBall = new Ball(innerWidth / 2, innerHeight / 2, 50, randomColor(colors));

// animate =============================
Ball.prototype.update = function () {
  if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    this.color = randomColor(colors);
    controls.dy = -controls.dy;
  };
  this.y -= controls.dy;

  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.color = randomColor(colors);
    controls.dx = -controls.dx;
  };
  this.x += controls.dx;

  this.draw();
};

const animate = () => {
  if (!controls.pause) {
    requestAnimationFrame(animate);
  }
  c.fillStyle = `rgba(33, 33, 33, ${-controls.tail / 10})`; // Lower opacity creates a longer tail
  c.fillRect(0, 0, canvas.width, canvas.height);

  newBall.update();
};

init();
animate();

gui.__controllers[3].onChange(animate)
