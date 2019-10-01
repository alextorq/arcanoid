let maxWidth = window.innerWidth;


/**
 * 
 * @return {object}
 */
export function createCatcher() {
    let catcher = document.createElement('div');
    catcher.classList.add('catcher');
    catcher.catcher =  true;
    let app = document.getElementById('app');
    app.appendChild(catcher);
    return catcher;
}


/**
 * 
 * @param {object} catcher 
 * @return {object}
 */
export function catcherMove(catcher) {
    let catcherWidth = catcher.getBoundingClientRect().right - catcher.getBoundingClientRect().left;
    let coords = {
        x0: 0, 
        y0: catcher.getBoundingClientRect().top, 
        y1: catcher.getBoundingClientRect().bottom,
        width: catcherWidth
    }
    document.addEventListener('mousemove', function(event) {
        if ((event.x - 90) < 0) {
            catcher.style.transform = `translateX(0px)`;
            coords.x0 = 0;
            coords.x1 = catcherWidth;

        }else {
            catcher.style.transform = `translateX(${Math.min((event.x - (catcherWidth / 2)), maxWidth - catcherWidth)}px)`;
            coords.x0 = Math.min((event.x - (catcherWidth / 2)), maxWidth - catcherWidth)
            coords.x1 = Math.min((event.x - (catcherWidth / 2)), maxWidth - catcherWidth) + catcherWidth
        }
    })

    return coords;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {object} catcherPosition 
 * @return {Boolean}
 */
export function checkCatcherPosition(x, y, catcherPosition) {
    let isStatus = false;

    if (y > catcherPosition.y0 && y < catcherPosition.y1) {
        if (x > catcherPosition.x0 && x < catcherPosition.x1) {
       
            isStatus = true;
        }
       
    }
    return isStatus;
}