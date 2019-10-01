import levels from './levels'

let gridWrapper;


/**
 * @return {object}
 */
function creteItem() {
    let element = document.createElement('div');
    element.classList.add('grid_item');
    element.classList.add('grid_item_visible');
    element.grid_item_visible = true;
    element.style.backgroundColor = randomColor();
    return element;
}


/**
 * 
 * @param {number} column 
 */
function setItemWidth(column) {
    let root = document.documentElement;
    let width = 100 / column;
    root.style.setProperty('--grid-item-width', width + "vw");
}

/**
 * @return {string}
 */
function randomColor() {
    let colors = ['#F38181', '#FCE38A', '#EAFFD0', '#95E1D3'];
    let random = Math.floor(Math.random() * colors.length);
    let color = colors[random];
    return color;
}

/**
 * 
 * @param {object} appWrapper 
 * @return {array}
 */
export function createGrid(appWrapper) {
    if (!gridWrapper) {
        let div = document.createElement('div');
        div.classList.add('grid_wrapper');
        div.id = 'grid';
        appWrapper.appendChild(div)
        gridWrapper = div;
    }
    gridWrapper.innerHTML = '';
    let currentLevel = levels.getCurrentLevel();
    let index =  currentLevel.row *  currentLevel.column;
    setItemWidth(currentLevel.column);
    while (index) {
        gridWrapper.appendChild(creteItem())  
        index--;
    }

    return Array.from(gridWrapper.childNodes);
}

/**
 * 
 * @param {array} nodes
 * @return {array} 
 */
export function createGridCoords(nodes) {
    let matr = [];
    for (let index in nodes) {
        let node = nodes[index]
        let cor = node.getBoundingClientRect();
        let col = {
            x0: cor.left,
            x1: cor.right,
            y0: cor.top,
            y1: cor.bottom,
            node
        }
        matr.push(col)
    }

    return matr;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {array} nodes 
 * @return {object}
 */
export function findElem(x, y, nodes) {
    for (let i =  0; i< nodes.length; i++) {
        let node = nodes[i];
        if (node.x0 < x && node.x1 > x) {
            if(node.y0 < y && node.y1 > y) {
                return node.node;
            }
        }
    }
    return {}
}