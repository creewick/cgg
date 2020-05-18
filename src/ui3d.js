inputs = document.getElementsByTagName('input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let onRedraw = () => {};
let zero = [canvas.width / 2, canvas.height / 2];
let zoom = 50;

function getCanvasPoint(x, y, z) {
    [x, y, z] = [x * zoom, y * zoom, z * zoom];
    const [x0, y0] = zero;
    return [
        Math.round(x0 + (y - x) * Math.sqrt(3) / 2),
        Math.round(y0 + (x + y) / 2 - z)
    ];
}

const keys = {
    'ArrowUp': n => zero[1] -= n,
    'ArrowDown': n => zero[1] += n,
    'ArrowLeft': n => zero[0] -= n,
    'ArrowRight': n => zero[0] += n,
    '=': n => zoom += n,
    '-': n => zoom -= n,
    '_': n => zoom -= n,
    '+': n => zoom += n,
    'Backspace': () => zoom = 50,
    'Enter': () => zero = [canvas.width / 2, canvas.height / 2]
};

window.onkeydown = function(e) {
    const delta = e.shiftKey ? 10 : 1;

    if (e.key in keys) {
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
    window.onresize(null);
    zero = [canvas.width / 2, canvas.height / 2];
    redraw();
};

for (let i = 0; i < inputs.length; i++) {
    inputs.item(i).onchange = redraw;
}

function redraw() {
    clear();
    onRedraw();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPixel(x, y, z, color) {
    ctx.fillStyle = color;
    const [xx, yy] = getCanvasPoint(x, y, z);
    ctx.fillRect(xx-1, yy-1, 2, 2);
}