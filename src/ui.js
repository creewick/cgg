const canvas = document.getElementById('canvas');
let redrawTimeout = setTimeout(() => {});
const ctx = canvas.getContext('2d');
let onRedraw = () => {};
let fontSize = 30;
let zoomSize = 50;
let zoomValue = 1;
let xPos = 0;
let yPos = 0;

const keys = {
    'ArrowUp': n => yPos -= n,
    'ArrowDown': n => yPos += n,
    'ArrowLeft': n => xPos -= n,
    'ArrowRight': n => xPos += n,
    '=': changeZoom,
    '-': n => changeZoom(-n),
    '+': changeZoom,
    '_': n => changeZoom(-n),
    'Backspace': resetZoom,
    'Enter': resetPos
};

window.onkeydown = function(e) {
    const delta = e.shiftKey ? 10 : 1;

    if (e.key in keys) {
        clearTimeout(redrawTimeout);
        keys[e.key](delta);
        redraw();
    }
};

window.onresize = function() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    redraw();
};

window.onload = function() {
    resetPos();
    window.onresize(null);
};

inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
    inputs.item(i).onchange = redraw;
}


function changeZoom(size){
    zoomSize += size;

    if (zoomSize < 50) {
        zoomValue *= 2;
        zoomSize = 99;
    }
    if (zoomSize >= 100) {
        zoomValue /= 2;
        zoomSize = 50
    }

    fontSize = 33 - 3 * zoomValue.toString().replace('.', '').length;
}

function resetZoom() {
    zoomSize = 50;
    zoomValue = 1;
    fontSize = 30;
}

function resetPos() {
    xPos = Math.floor(window.innerWidth / 2) + 0.5;
    yPos = Math.floor(window.innerHeight / 2) + 0.5;
}

function redraw() {
    clear();
    drawGrid();
    drawCenter();
    drawNumbers();
    redrawTimeout = setTimeout(onRedraw, 50);
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawVertical(x) {
    drawLine(x, 0, x, canvas.height);
}

function drawHorizontal(y) {
    drawLine(0, y, canvas.width, y);
}

function drawGrid() {
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';
    ctx.lineWidth = 1;

    for (let x = xPos % zoomSize; x < canvas.width; x += zoomSize)
        drawVertical(x);

    for (let y = yPos % zoomSize; y < canvas.height; y += zoomSize)
        drawHorizontal(y);
}

function drawCenter() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    drawVertical(xPos);
    drawHorizontal(yPos);
}

function drawNumbers() {
    ctx.font = `${fontSize}px Segoe UI Light`;
    ctx.fillStyle = 'black';

    for (let x = xPos % zoomSize - zoomSize; x < canvas.width; x += zoomSize)
        ctx.fillText(getRealX(x), x + 2, yPos - 2);

    for (let y = yPos % zoomSize; y < canvas.height + zoomSize; y += zoomSize)
        ctx.fillText(getRealY(y), xPos + 2, y - 2);
}

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

function drawVerticalLine(x, y1, y2) {
    for (let y = Math.ceil(y1); y < y2; y++) {
        drawPixel(x, y);
    }
}

function getRealX(x) {
    return (x - xPos) * zoomValue / zoomSize;
}

function getRealY(y) {
    return - (y - yPos) * zoomValue / zoomSize;
}

function getCanvasX(x) {
    return Math.floor(xPos + x * zoomSize / zoomValue);
}

function getCanvasY(y) {
    return Math.floor(yPos - y * zoomSize / zoomValue);
}