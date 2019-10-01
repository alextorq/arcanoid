let gameOverWrapper;


/**
 * 
 * @param {Object} appWrapper general wrapper 
 * @param {Function} cb 
 */
export default function win(appWrapper, cb) {
    if(!gameOverWrapper) {
        let div = document.createElement('div');
        div.classList.add('veil');
        div.innerHTML = `
            <div class="modal">
                <h2>You are win</h2>
                <button class="button">Try again</button>
            </div>
        `
        let button = div.querySelector('button');
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            cb();
            setTimeout(() => {
                gameOverWrapper.remove();
           
            }, 50)
        });
        gameOverWrapper = div;
    }

    appWrapper.appendChild(gameOverWrapper)
}