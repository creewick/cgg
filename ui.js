const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let fontSize = 30;
let xPos = 0;
let yPos = 0;
let zoomSize = 50;
let zoomValue = 1;

const keys = {
    'ArrowUp': n => yPos -= n,
    'ArrowDown': n => yPos += n,
    'ArrowLeft': n => xPos -= n,
    'ArrowRight': n => xPos += n,
    '=': changeZoom,
    '-': n => changeZoom(-n),
    '+': changeZoom,
    '_': n => changeZoom(-n),
    '0': resetZoom
};

window.onkeydown = function(e) {
    const delta = e.shiftKey ? 10 : 1;

    if (e.key in keys){
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
    xPos = window.innerWidth / 2;
    yPos = window.innerHeight / 2;
    window.onresize(null);
};

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

function redraw() {
    clear();
    drawGrid();
    drawCenter();
    drawNumbers();
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

    for (let x = xPos % zoomSize - zoomSize; x < canvas.width; x += zoomSize)
        ctx.fillText((x - xPos) * zoomValue / zoomSize, x + 2, yPos - 2);

    for (let y = yPos % zoomSize; y < canvas.height + zoomSize; y += zoomSize)
        ctx.fillText((y - yPos) * zoomValue / zoomSize, xPos + 2, y - 2);
}