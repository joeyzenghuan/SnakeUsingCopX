// Initialize canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const canvasWidth = 600;
const canvasHeight = 400;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Set game variables
const blockSize = 10;
let snake = [{x: 10, y: 10}];
let food = {x: 0, y: 0};
let score = 0;
let direction = 'right';


// Initialize obstacles array
let obstacles = [];

// Add obstacles to the array
obstacles.push({x: 10, y: 30});
obstacles.push({x: 100, y: 150});

// Draw the obstacles on the canvas
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, blockSize, blockSize);
    }
  }

// Generate random food location
function generateFood() {
  food.x = Math.floor(Math.random() * (canvasWidth / blockSize)) * blockSize;
  food.y = Math.floor(Math.random() * (canvasHeight / blockSize)) * blockSize;
}

// Draw the snake and food on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the snake
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
  });

  // Draw the food
  ctx.fillStyle = '#FF5722';
  ctx.fillRect(food.x, food.y, blockSize, blockSize);

  drawObstacles();
}

// Move the snake
function move() {
  // Move the snake's body
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  // Move the snake's head
  switch (direction) {
    case 'up':
      snake[0].y -= blockSize;
      break;
    case 'down':
      snake[0].y += blockSize;
      break;
    case 'left':
      snake[0].x -= blockSize;
      break;
    case 'right':
      snake[0].x += blockSize;
      break;
  }
}

// Check for collisions with the walls, the snake's own body, and the obstacles
function checkCollisions() {
    // Wrap the snake's position around to the opposite side of the canvas if it goes out of bounds
    if (snake[0].x < 0) {
      snake[0].x = canvasWidth - blockSize;
    } else if (snake[0].x >= canvasWidth) {
      snake[0].x = 0;
    } else if (snake[0].y < 0) {
      snake[0].y = canvasHeight - blockSize;
    } else if (snake[0].y >= canvasHeight) {
      snake[0].y = 0;
    }
  
    // Check for collision with the snake's own body
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        gameOver();
      }
    }
  
    // Check for collision with obstacles
    for (let i = 0; i < obstacles.length; i++) {
      if (snake[0].x === obstacles[i].x && snake[0].y === obstacles[i].y) {
        gameOver();
      }
    }
  }

// Check if the snake has eaten the food
function checkFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // Increase the score
    score++;

    // Add a new segment to the snake
    snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});

    // Generate new food
    generateFood();
  }
}

// Game over function
function gameOver() {
  alert(`Game over! Your score is ${score}.`);

  // Reset game variables
  snake = [{x: 10, y: 10}];
  food = {x: 0, y: 0};
  score = 0;
  direction = 'right';

  // Generate new food
  generateFood();
}

// Initialize touch variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Add touch event listeners to the canvas element
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);


// Handle touch start event
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

// Handle touch move event
function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
  touchEndY = event.touches[0].clientY;

  // Calculate touch direction based on start and end positions
  const touchDirectionX = touchEndX - touchStartX;
  const touchDirectionY = touchEndY - touchStartY;

  // Set snake direction based on touch direction
  if (Math.abs(touchDirectionX) > Math.abs(touchDirectionY)) {
    if (touchDirectionX > 0) {
      direction = 'right';
    } else {
      direction = 'left';
    }
  } else {
    if (touchDirectionY > 0) {
      direction = 'down';
    } else {
      direction = 'up';
    }
  }
}

// Handle keyboard input
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // Left arrow
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 38: // Up arrow
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 39: // Right arrow
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 40: // Down arrow
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
});

// Game loop
function gameLoop() {
  move();
  checkCollisions();
  checkFood();
  draw();
}

// Start the game loop
generateFood();
setInterval(gameLoop, 100);