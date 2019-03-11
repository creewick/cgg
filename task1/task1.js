function getArg(id) {
    return document.getElementById(id).value;
}

F = (a, b, x) => a - x + Math.sqrt(Math.pow(x, 3) / (x + b));

onRedraw = function() {
    ctx.fillStyle = 'red';

    const a = Number(getArg('a'));
    const b = Number(getArg('b'));
    const xMin = Math.max(0, getCanvasX(getArg('xMin')));
    const xMax = Math.min(canvas.width, getCanvasX(getArg('xMax')));

    let prevY = NaN;

    for (let x = xMin; x <= xMax; x++) {
        const realX = getRealX(x);
        const realY = F(a, b, realX);
        const y = getCanvasY(realY);
        if (!Number.isNaN(y)) {
            if (Number.isNaN(prevY)) prevY = y;
            linkPoints(x, prevY, y);
        }
        prevY = y;
    }
};

function linkPoints(x, y1, y2) {
    if (y1 === y2) {
        drawPixel(x, y1);
    }

    if (y1 < y2) {
        drawVerticalLine(x, y1, (y1 + y2) / 2);
        drawVerticalLine(x+1, (y1 + y2) / 2, y2);
    }
    if (y2 < y1) {
        drawVerticalLine(x, (y1 + y2) / 2, y1);
        drawVerticalLine(x+1, y2, (y1 + y2) / 2);
    }
}