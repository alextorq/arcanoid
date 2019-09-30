import {createGridCoords, createGrid, findElem} from './Grid'
import {initialScore, showScore} from './Score'
import {createCatcher, catcherMove, checkCatcherPosition} from './Catcher'
import {createBall, stopMovingBall, startMovingBall} from './Ball'
import gameOver from './gameOver'
import gameWin from './win'

let appWrapper = document.getElementById('app');

let ball;
let ballRadius = 11;
let ballDiameter = ballRadius * 2;

let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;


let catcherCoords;
let cellCoords;
let allCell;

let randomDirection = Math.random() > 0.5;
let dx = randomDirection ? -5 : 5;
let dy = -5;
let xPos = 0;
let yPos = 0;

//let root = document.documentElement;

let animationID;



document.addEventListener('DOMContentLoaded', () => {
  let catcher = createCatcher();
  catcherCoords = catcherMove(catcher);
  ball = createBall(ballDiameter, catcher, appWrapper);
  startMovingBall(catcherCoords, ballDiameter);
  allCell = createGrid(appWrapper);
  cellCoords = createGridCoords(allCell);
  initialScore(allCell, appWrapper)

  document.addEventListener('click', () => {
    stopMovingBall();
    animationID = startGame();
  }, {once: true})

})


function reloadGame() {
  allCell = createGrid(appWrapper);
  cellCoords = createGridCoords(allCell);
  initialScore(allCell, appWrapper);

  startMovingBall(catcherCoords, ballDiameter);

  document.addEventListener('click', () => {
    stopMovingBall();
    animationID = startGame();
  }, {once: true});
  dy = -5;

}




function startGame() {
  xPos = ball.getBoundingClientRect().left;
  yPos = ball.getBoundingClientRect().top;
  return window.requestAnimationFrame(animateBall);
}

function stopGame(animationID) {
  cancelAnimationFrame(animationID);
}

//tableCoords
function checkCellFromPoint(x, y) {
  let el = findElem(x, y, cellCoords); //left top
  let el2 = findElem(x + ballDiameter, y, cellCoords); //right top
  let el3 = findElem(x + ballDiameter, y + ballDiameter, cellCoords); //tight bottom
  let el4 = findElem(x, y + ballDiameter, cellCoords); //left bottom

  let status = false;


  let classArray = [
        el.grid_item_visible, 
        el2.grid_item_visible,
        el3.grid_item_visible, 
        el4.grid_item_visible
      ]


  if (classArray[0]) {
      el.grid_item_visible = false;
      status = {x: true, y: false};;
  }
  if (classArray[1]) {
    el2.grid_item_visible = false;
    status = {x: true, y: false};
  }
  if (classArray[2]) {
   
    el3.grid_item_visible = false;
    status = {x: false, y: true};
  }
  if (classArray[3]) {
    el4.grid_item_visible = false;
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


function animateBall() {
    // оттолкнулся от правой стены
    if(xPos + dx > (maxWidth - ballDiameter) || xPos + dx < 0) {
        dx = -dx;
    }
    // оттолкнулся от левой стены
    if(yPos + dy < 0) {
        dy = -dy;
    }

    let status = checkCellFromPoint(xPos, yPos);
    let catchBall = checkCatcherPosition(xPos + dx, yPos + ballDiameter, catcherCoords);

    if (catchBall) {
      dy = -dy;
    }

    if(yPos + dy > maxHeight - ballDiameter) {
      stopGame();
      gameOver(appWrapper, reloadGame);
      return;
    }

    if (status) {
      dx = status.x ? -dx : dx;
      dy = status.y ? -dy : dy;
      let isWin = showScore(allCell);

      if (isWin) {
        stopGame();
        gameWin(appWrapper, reloadGame);
        return;
      }
    }

    xPos += dx;
    yPos += dy;

    // root.style.setProperty('--ball-x', xPos + "px");
    // root.style.setProperty('--ball-y', yPos + "px");
 
    ball.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    animationID = window.requestAnimationFrame(animateBall)
  // 
}

