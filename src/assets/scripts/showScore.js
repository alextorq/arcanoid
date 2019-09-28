import levels from './levels'

let scoreWrapper = document.getElementById('score_wrapper');

let currentLevel = levels.getCurrentLevel();
let all = currentLevel.row *  currentLevel.column;

export default function showScore(count, allCell) {
    if (!count) {return}
    setTimeout(() => {
        let all = allCell.length;
        for (let iterator of allCell) {
            if (!iterator.grid_item_visible) {
                iterator.classList.remove('grid_item_visible');
                all--;
            }
        }
        scoreWrapper.innerHTML = `${all}`;
    }, 0)
   
}