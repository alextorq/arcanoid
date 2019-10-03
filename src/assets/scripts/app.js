import {createGridCoords, drawGrid, findElem} from './Grid'
import {initialScore, showScore} from './Score'
import {createCatcher, drawCatcher, checkCatcherPosition} from './Catcher'
import drawBall from './Ball'
import gameOver from './gameOver'
import gameWin from './win'
import levels from './levels'
let currentLevel = levels.getCurrentLevel();

let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;

var canvas = document.getElementById('arcanoid');
var ctx = canvas.getContext('2d');
canvas.setAttribute('width', `${maxWidth}px`)
canvas.setAttribute('height', `${maxHeight}px`)


let mouseX = 0;


canvas.addEventListener('mousemove' , (event) => {
  mouseX = event.x;
})


let appWrapper = document.getElementById('app');

let ballRadius = 11;


let catcherCoords;
let allCell;

let randomDirection = Math.random() > 0.5;
let dx = randomDirection ? -5 : 5;
let dy = -5;
let xPos = 0;
let yPos = 0;


let animationID;



document.addEventListener('DOMContentLoaded', reloadGame)


function reloadGame() {
  allCell = createGridCoords(currentLevel);
  initialScore(appWrapper, allCell)
  initialGame()

  document.addEventListener('click', () => {
    stopGame()
    xPos = mouseX;
    yPos = currentLevel.catcherPositionTop - ballRadius;
    dy = -5;
    animationID = startGame();
  }, {once: true});
  dy = -5;

}


function startGame() {
  return window.requestAnimationFrame(animateBall);
}

function stopGame(animationID) {
  cancelAnimationFrame(animationID);
}


/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @return {Boolean|object}
 */
function checkCellFromPoint(x, y) {
  let el = findElem(x - ballRadius, y - ballRadius, allCell); //left top
  let el2 = findElem(x + ballRadius, y, allCell); //right top
  let el3 = findElem(x + ballRadius, y + ballRadius, allCell); //tight bottom
  let el4 = findElem(x, y + ballRadius, allCell); //left bottom

  let status = false;

  let classArray = [
        el.visible, 
        el2.visible,
        el3.visible, 
        el4.visible
      ]


  if (classArray[0]) {
      el.visible = false;
      status = {x: true, y: false};
  }
  if (classArray[1]) {
    el2.visible = false;
    status = {x: true, y: false};
  }
  if (classArray[2]) {
   
    el3.visible = false;
    status = {x: false, y: true};
  }
  if (classArray[3]) {
    el4.visible = false;
    status = {x: false, y: true};
  }

  if (classArray[0] || classArray[3]) {
    status = {x: false, y: true};
  }

  if (classArray[0] && classArray[3] || classArray[2] && classArray[1]) {
    status = {x: true, y: false};
  }

  return status;

}

function initialGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  catcherCoords = drawCatcher(ctx, mouseX);
  drawBall(ctx, catcherCoords.half, currentLevel.catcherPositionTop - ballRadius , ballRadius);
  drawGrid(ctx, allCell)

  animationID = window.requestAnimationFrame(initialGame)

}


function animateBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // оттолкнулся от правой стены
    if(xPos + dx > (maxWidth - ballRadius) || xPos + dx < 0) {
        dx = -dx;
    }
    if(yPos + dy < 0) {
        dy = -dy;
    }

    let status = checkCellFromPoint(xPos, yPos);
    catcherCoords = drawCatcher(ctx, mouseX);

    let catchPos = checkCatcherPosition(xPos, yPos + ballRadius, catcherCoords);
    if(catchPos) {
      dy = -dy;
    }

    if(yPos + dy > maxHeight + ballRadius) {
      drawGrid(ctx, allCell)
      stopGame(animationID);
      gameOver(appWrapper, reloadGame);
      return
    }

    if (status) {
      dx = status.x ? -dx : dx;
      dy = status.y ? -dy : dy;
      
      let isWin = showScore(allCell)
      if (isWin) {
        stopGame(animationID);
        drawGrid(ctx, allCell);
        drawBall(ctx, xPos, yPos, ballRadius);
        gameWin(appWrapper, reloadGame);
        return
      }
    }
   
    xPos += dx;
    yPos += dy;
   
    drawBall(ctx, xPos, yPos, ballRadius);
    drawGrid(ctx, allCell)
 
    animationID = window.requestAnimationFrame(animateBall)
  // 
}

