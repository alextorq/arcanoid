import createGrid from './createGrid'
import showScore from './showScore'
import createCatcher from './createCatcher'
import {createBall, stopBall} from './createBall'


let ball;
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let randomDirection = Math.random() > 0.5;
let dx = randomDirection ? -5 : 5;
let dy = -5;
let xPos = 0;
let yPos = 0;
let allCell;

let id;
let ballRadius = 11;


document.addEventListener('DOMContentLoaded', () => {
  let catcher = createCatcher();
  ball = createBall(ballRadius, catcher);
  allCell = createGrid();
})

document.addEventListener('click', () => {
  stopBall();
  id = startGame();
}, {once: true})



function startGame() {
  xPos = ball.getBoundingClientRect().left;
  yPos = ball.getBoundingClientRect().top;
  return window.requestAnimationFrame(animateBall);
}

function checkElementFromPoint(x, y) {
  let el = document.elementFromPoint(x, y) || document.body; //left top
  let el2 = document.elementFromPoint(x + ballRadius, y) || document.body; //right top
  let el3 = document.elementFromPoint(x + ballRadius, y + ballRadius) || document.body; //tight bottom
  let el4 = document.elementFromPoint(x, y + ballRadius) || document.body; //left bottom
  let status = false;
  let count = 0;

  let classArray = [
        el.grid_item_visible, 
        el2.grid_item_visible,
        el3.grid_item_visible, 
        el4.grid_item_visible
      ]


  if (classArray[0]) {
      el.grid_item_visible = false;
      count++;
      //status = {x: true, y: false};;
  }
  if (classArray[1]) {
    el2.grid_item_visible = false;
    count++;
    //status = {x: true, y: false};
  }
  if (classArray[2]) {
   
    el3.grid_item_visible = false;
    count++;
    //status = {x: false, y: true};
  }
  if (classArray[3]) {
    el4.grid_item_visible = false;
    count++;
    //status = {x: false, y: true};
  }

  if (classArray[0] || classArray[3]) {
    status = {x: false, y: true, count: count};
  }

  if (classArray[0] && classArray[3] || classArray[2] && classArray[1]) {
    status = {x: true, y: false, count: count};
  }


  if (el3.catcher) {
    status = {x: false, y: true};
  }

  
  return status;

}


function animateBall() {
    if(xPos + dx > (maxWidth - ballRadius) || xPos + dx < 0) {
        dx = -dx;
    }

    if(yPos + dy < 0) {
        dy = -dy;
    }

    let status = checkElementFromPoint(xPos, yPos)

    if(yPos + dy > maxHeight - ballRadius) {
      cancelAnimationFrame(id);
      return;
    }

    if (status) {
      dx = status.x ? -dx : dx;
      dy = status.y ? -dy : dy;
      showScore(status.count, allCell);
      
    }

    xPos += dx;
    yPos += dy;

    ball.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    id = window.requestAnimationFrame(animateBall)
  // 
}

