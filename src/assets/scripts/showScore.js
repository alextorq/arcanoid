let scoreWrapper;

export function showScore(allCell) {
    let all = allCell.length;
    for (let iterator of allCell) {
        if (!iterator.grid_item_visible) {
            iterator.classList.remove('grid_item_visible');
            all--;
        }
    }
    setTimeout(() => {
        scoreWrapper.innerHTML = `${all}`;
    }, 0)
   return all === 0;
}

export function initialScore(allCell, appWrapper) {
    if (!scoreWrapper) {
        let div = document.createElement('div');
        div.classList.add('score_wrapper');
        div.id = 'score_wrapper';
        appWrapper.appendChild(div)
        scoreWrapper = div;
    }

    scoreWrapper.innerHTML = allCell.length;
}