let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;


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
export function drawGrid(ctx, coords) {

    for(let index = 0; index < coords.length; index++) {
        let item = coords[index];
        if (item.visible) {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x0, item.y0, item.width, 40);
            ctx.strokeStyle="#ffffff";
            ctx.lineWidth = 4;
            ctx.strokeRect(item.x0, item.y0, item.width, 40);
        }
  
    }
}

/**
 * 
 * @param {array} nodes
 * @return {array} 
 */
export function createGridCoords(currentLevel) {
    let matr = [];
    let rowHeight = 40;
    let itemWidth = maxWidth / currentLevel.column;;
    let currentCol = currentLevel.column;
    let currentRow = 0;
    let allRow = currentLevel.row;
  
    while(currentRow < allRow) {
        for (let index = 0; index < currentCol; index++) {
            let col = {
                color: randomColor(),
                x0: itemWidth * index,
                x1: itemWidth * (index + 1),
                y0: rowHeight * currentRow,
                y1: rowHeight * (currentRow + 1),
                number: index,
                width: itemWidth,
                visible: true
            }
            matr.push(col)
        }
        currentRow++;
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
                return node;
            }
        }
    }
    return {}
}