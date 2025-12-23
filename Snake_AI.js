const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = canvas.width;

let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box
};

let score = 0;

// 🔑 FIXED KEYBOARD CONTROLS
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";

  e.preventDefault(); // 🚨 VERY IMPORTANT
});

// 🧠 AI HINT FUNCTION
function getAIHint() {
  const head = snake[0];

  if (food.x < head.x) return "LEFT";
  if (food.x > head.x) return "RIGHT";
  if (food.y < head.y) return "UP";
  if (food.y > head.y) return "DOWN";

  return direction;
}

// 🎮 GAME LOOP
function drawGame() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // AI Hint text
  const hint = getAIHint();
  document.getElementById("hint").innerText =
    "AI Hint: Move " + hint;

  // Move snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Game Over conditions
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    alert("Game Over! Score: " + score);
    clearInterval(game);
    return;
  }

  snake.unshift(newHead);
}

// 🔥 Collision check
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// ▶️ START GAME
const game = setInterval(drawGame, 150);
