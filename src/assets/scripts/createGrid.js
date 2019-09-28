import levels from './levels'



function creteItem() {
    let element = document.createElement('div');
    element.classList.add('grid_item');
    element.classList.add('grid_item_visible');
    element.grid_item_visible = true;
    element.style.backgroundColor = randomColor();
    return element;
}

function setItemWidth(column) {
    let root = document.documentElement;
    let width = 100 / column;
    root.style.setProperty('--grid-item-width', width + "vw");
}


function randomColor() {
    let colors = ['#F38181', '#FCE38A', '#EAFFD0', '#95E1D3'];
    let random = Math.floor(Math.random() * colors.length);
    let color = colors[random];
    return color;
}

export function createGrid() {
    let gridWrapper = document.getElementById('grid');
    let currentLevel = levels.getCurrentLevel();
    let index =  currentLevel.row *  currentLevel.column;
    setItemWidth(currentLevel.column);
    while (index) {
        gridWrapper.appendChild(creteItem())  
        index--;
    }

    return Array.from(gridWrapper.childNodes);
}

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

export function findElem(x, y, nodes) {
    for (const node of nodes) {
        if (node.x0 < x && node.x1 > x) {
            if(node.y0 < y && node.y1 > y) {
                return node.node;
            }
        }
    }
}