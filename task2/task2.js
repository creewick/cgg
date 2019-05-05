function getArg(id) {
    return Number(document.getElementById(id).value);
}

let prevX = NaN;
let prevY = NaN;

onRedraw = function() {
    ctx.fillStyle = 'red';
    prevX = NaN;
    prevY = NaN;
    let p = getArg('xMin');
    const pEnd = getArg('xMax');
    let step = Math.PI / 180;

    while (p < pEnd) {
        const r = Math.sqrt(6 * Math.cos(2 * p));
        const x = r * Math.cos(p);
        const y = r * Math.sin(p);
        const xx = getCanvasX(x);
        const yy = getCanvasY(y);

        if (isNaN(prevX)) {
            draw(xx, yy);
        } else if (farAway(prevX, prevY, xx, yy)) {
            p -= step;
            step /= 2;
        } else if (samePoint(prevX, prevY, xx, yy)) {
            p -= step;
            step *= 3;
        } else {
            draw(xx, yy);
        }

        p += step;
    }
};

function samePoint(x1, y1, x2, y2) {
    return x1 === x2 && y1 === y2;
}

function farAway(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) > 1;
}

function draw(x, y) {
    drawPixel(x, y);
    //drawLine(prevX, prevY, x, y);
    prevX = x;
    prevY = y;
}