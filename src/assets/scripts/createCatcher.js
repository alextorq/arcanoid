let maxWidth = window.innerWidth;

export default function catcher() {
    let catcher = document.createElement('div');
    catcher.classList.add('catcher');
    catcher.catcher =  true;
    
    document.addEventListener('mousemove', function(event) {
        if ((event.x - 90) < 0) {
            catcher.style.left = 0 + 'px'
        }else {
            catcher.style.left = Math.min((event.x - 90), maxWidth - 180) + 'px'
        }
    })


    let app = document.getElementById('app');
    app.appendChild(catcher);
    return catcher;
}