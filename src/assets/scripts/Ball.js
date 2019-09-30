let ball;
let catcherTop;
//let root = document.documentElement;
let ballRadius;

export function stopBall() {
    document.removeEventListener('mousemove', moveBall)
}
export function startMovingBall(catcherCoords, ballDiameter) {
    ball.style.transform = `translate(${catcherCoords.x0 - ballRadius + (catcherCoords.width / 2)}px, ${catcherCoords.y0 - ballDiameter}px)`;
    document.addEventListener('mousemove', moveBall);
}

function moveBall(event) {
   ball.style.transform = `translate(${event.x - ballRadius}px, ${catcherTop}px)`;
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
