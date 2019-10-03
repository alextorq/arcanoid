let scoreWrapper;

/**
 * Ставим флаг check о том что этот элемент уже обработан
 * @description Show score after change direction
 * @param {array} allCell 
 * @return {Boolean}
 */
export function showScore(allCell) {
    let all = allCell.length;
    for (let iterator of allCell) {
        if (!iterator.visible) {
            all--;
        }
    }
    setTimeout(() => {
        scoreWrapper.innerHTML = `${all}`;
    }, 0)
   return all === 0;
}

/**
 * show initial score
 * @param {array} allCell 
 * @param {object} appWrapper 
 */
export function initialScore(appWrapper, allCell) {
    if (!scoreWrapper) {
        let div = document.createElement('div');
        div.classList.add('score_wrapper');
        div.id = 'score_wrapper';
        appWrapper.appendChild(div)
        scoreWrapper = div;
    }

    scoreWrapper.innerHTML = allCell.length;
}