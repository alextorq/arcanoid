let ball;
let catcherTop;
let root = document.documentElement;

export function stopBall() {
    document.removeEventListener('mousemove', moveBall)
}

function moveBall(event) {
   ball.style.transform = `translate(${event.x}px, ${catcherTop}px)`;
}

export function createBall(ballDiameter, catcherEl, appWrapper) {
    catcherTop = catcherEl.getBoundingClientRect().top - ballDiameter;
    ball = document.createElement('div');
    ball.classList.add('ball');
    ball.id = 'ball';
    appWrapper.appendChild(ball);
    let root = document.documentElement;
    root.style.setProperty('--ball-width', ballDiameter + "px");

    document.addEventListener('mousemove', moveBall)

    return ball;
}
