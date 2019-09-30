let ball;
let catcherTop;
//let root = document.documentElement;
let ballRadius;
let catcherWidth;
let maxWidth = window.innerWidth;

export function stopBall() {
    document.removeEventListener('mousemove', moveBall)
}
export function startMovingBall(catcherCoords, ballDiameter) {
    ball.style.transform = `translate(${catcherCoords.x0 - ballRadius + (catcherCoords.width / 2)}px, ${catcherCoords.y0 - ballDiameter}px)`;
    document.addEventListener('mousemove', moveBall);
    catcherWidth = catcherCoords.width;
}

function moveBall(event) {
   if (event.x < (catcherWidth / 2)) {
     ball.style.transform = `translate(${(catcherWidth / 2) - ballRadius}px, ${catcherTop}px)`;
   }else {
    let x = Math.min(event.x - ballRadius, maxWidth - (catcherWidth / 2))
    ball.style.transform = `translate(${x}px, ${catcherTop}px)`;
   }
  
}

export function createBall(ballDiameter, catcherEl, appWrapper) {
    catcherTop = catcherEl.getBoundingClientRect().top - ballDiameter;
    ball = document.createElement('div');
    ball.classList.add('ball');
    ball.id = 'ball';
    appWrapper.appendChild(ball);
    let root = document.documentElement;
    root.style.setProperty('--ball-width', ballDiameter + "px");
    ballRadius = ballDiameter / 2;

    return ball;
}
