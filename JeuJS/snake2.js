//Youcef KARKAR

var canvas, ctx, w, h;

var ax = ay = 5;
var ts = 24;
var tc = 24;
var vx = vy = 0;
var gameOverMenu;
var restartButton;

var snake = [];
var queue;
var score;
var scoreBoard;

var player = {
  x: 7,
  y: 7,
  width: 18,
  height: 18
}


window.onload = function init() {
  // called AFTER the page has been loaded
  canvas = document.querySelector("#snakeScreen");
  
  // often useful
  w = canvas.width; 
  h = canvas.height;  
  
  // important, we will draw with this object
  ctx = canvas.getContext('2d');

  gameOverMenu = document.getElementById("gameOver")
  centerMenu(gameOverMenu);

  restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", gameRestart);

  score = document.getElementById("score");
  scoreBoard = document.getElementById("scoreBoard");

  setInterval(mainLoop, 1000/10);
  setState("PLAY");
};


function mainLoop() {

  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, tc*ts, tc*ts);

  if (gameState == "PLAY"){
    drawApple();
    drawFilledSnake(player);
  
    player.x += vx;
    player.y += vy;
  
    if(player.x >= tc) {
      player.x = 0;
    }
    if(player.x < 0) {
      player.x = tc - 1;
    }
    if(player.y >= tc) {
      player.y = 0;
    }
    if(player.y < 0) {
      player.y = tc - 1;
    }
  }
}


function drawFilledSnake(snaky) {
  // GOOD practice: save the context, use 2D trasnformations
  ctx.save();

  ctx.fillStyle = 'lime';
  for(var i = 0; i < snake.length; i++){
      ctx.fillRect(snake[i].x*ts, snake[i].y*ts, snaky.width, snaky.height);
      if(snaky.x === snake[i].x && snaky.y === snake[i].y){
          queue = 3;
      }
  }

  ctx.fillStyle = 'blue';
  ctx.fillRect(snaky.x*ts, snaky.y*ts, snaky.width, snaky.height);

  snake.push({x: snaky.x, y: snaky.y});
  while(snake.length > queue){
    snake.shift();
  }

  testFoodCollision(player);
  testWallCollision(player);

  // GOOD practice: restore the context
  ctx.restore();
}

function testFoodCollision(snaky){
  if(snaky.x === ax && snaky.y === ay){
    queue++;
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }
}


function testWallCollision(snaky){
  if(snaky.x *ts >= w || snaky.x *ts < 1){
    setState("GAME OVER");
  }

  if(snaky.y *ts >= h  || snaky.y *ts < 1){
    setState("GAME OVER");
  }
}


function drawApple(){
  // GOOD practice: save the context, use 2D trasnformations
  ctx.save();
      
  ctx.fillStyle = 'red';
  ctx.fillRect(ax*ts, ay*ts, ts-8, ts-8);
      
  // GOOD practice: restore the context
  ctx.restore();
}

function setState(state){
  gameState = state ;
  showMenu(state);
}

function displayMenu(menu){
  menu.style.visibility = "visible";
}


function hiddenMenu(menu){
  menu.style.visibility = "hidden";
}


function showMenu (state){
  if(state == "GAME OVER"){
    displayMenu(gameOverMenu);
  }

  else if(state == "PLAY"){
    displayMenu(score);
  }
}

document.addEventListener('keydown', direction);

function direction(e){
    console.log(e.keyCode);
    switch(e.keyCode){
        case 37:
          vx = -1;
          vy = 0;
          break;
        case 38:
          vx = 0;
          vy = -1;
          break;
        case 39:
          vx = 1;
          vy = 0;
          break;
        case 40:
          vx = 0;
          vy = 1;
          break;
    }
}

function centerMenu(menu){
  menu.style.top = 400 + "px";
  menu.style.left = 530 + "px";
}

function gameRestart(){
    hiddenMenu(gameOverMenu);

    // called AFTER the page has been loaded
    canvas = document.querySelector("#snakeScreen");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;  
    
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    gameOverMenu = document.getElementById("gameOver")
    centerMenu(gameOverMenu);
  
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    setState("PLAY");
}

function drawScore(){
  scoreBoard.innerHTML = "Score : " + queue;
}