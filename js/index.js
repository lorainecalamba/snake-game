'use strict';

let inputDir = { x: 0, y: 0 };

// const board = document.querySelector('#board');
// const scoreBox = document.querySelector('.scoreBox');
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: 13,
    y: 15
  }
];
let food = {
  x: 6,
  y: 7
};

const isCollide = function (snake) {
  // if snake bumps into itself
  for (let index = 1; index < snakeArr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  }

  // if snake collides with boundary of the board
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }

  return false;
}

// game functions
const gameEngine = function () {
  // part 1: updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert('Game Over, Press any key to play again');
    snakeArr = [{ x: 13, y: 15 }];
    scoreBox.innerHTML = "Score: 0";
    score = 0;
    speed = 4;
  }

  // if snake has eaten the food, increment the score and generate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    speed++;

    if (speed > 20) {
      speed = 20;
    }

    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem('highScore', JSON.stringify(highScoreVal));
      highScoreBox.innerHTML = 'High Score: ' + highScoreVal;
    }
    scoreBox.innerHTML = 'Score: ' + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;

    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    console.log(speed);
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part 2: display the snake and food
  // display the snake
  board.innerHTML = '';
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }

    board.appendChild(snakeElement);
  });

  // display the food
  let foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
};

const main = function (ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();

};

// main logic starts here

let highScore = localStorage.getItem('highScore');
let highScoreVal = null;
if (highScore == null) {
  highScoreVal = 0;
  localStorage.setItem('highScore', JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "High Score: " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case 'ArrowLeft':
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case 'ArrowRight':
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  };

  console.log(e.key);


});