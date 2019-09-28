let ball;
let catcherTop;

export function stopBall() {
    document.removeEventListener('mousemove', moveBall)
}

function moveBall(event) {
 
   ball.style.transform = `translate(${event.x}px, ${catcherTop}px)`;
}

export function createBall(ballRadius, catcherEl) {
    catcherTop = catcherEl.getBoundingClientRect().top - (ballRadius * 2);
    let appWrapper = document.getElementById('app');
    ball = document.createElement('div');
    ball.classList.add('ball');
    ball.id = 'ball';
    appWrapper.appendChild(ball);
    let root = document.documentElement;
    root.style.setProperty('--ball-width', (ballRadius * 2) + "px");

    document.addEventListener('mousemove', moveBall)

    return ball;
}