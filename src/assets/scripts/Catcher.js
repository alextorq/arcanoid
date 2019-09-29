let maxWidth = window.innerWidth;

export function createCatcher() {
    let catcher = document.createElement('div');
    catcher.classList.add('catcher');
    catcher.catcher =  true;
    let app = document.getElementById('app');
    app.appendChild(catcher);
    return catcher;
}




export function catcherMove(catcher) {
    let coords = {
        x0: 0, 
        y0: catcher.getBoundingClientRect().top, 
        y1: catcher.getBoundingClientRect().bottom,
        width: catcher.getBoundingClientRect().left - catcher.getBoundingClientRect().right
    }
    document.addEventListener('mousemove', function(event) {
        if ((event.x - 90) < 0) {
            catcher.style.transform = `translateX(0px)`;
            coords.x0 = 0;
            coords.x1 = 180;

        }else {
            catcher.style.transform = `translateX(${Math.min((event.x - 90), maxWidth - 180)}px)`;
            coords.x0 = Math.min((event.x - 90), maxWidth - 180)
            coords.x1 = Math.min((event.x - 90), maxWidth - 180) + 180
        }
    })

    return coords;
}

export function checkCatcherPosition(x, y, catcherPosition) {
    let isStatus = false;

    if (y > catcherPosition.y0 && y < catcherPosition.y1) {
        if (x > catcherPosition.x0 && x < catcherPosition.x1) {
            isStatus = true;
        }
       
    }
    return isStatus;
}