function getArg(id) {
    return document.getElementById(id).value;
}

F = (a, b, x) => a - x + Math.sqrt(Math.pow(x, 3) / (b + x));

onRedraw = function() {
    const a = getArg('a');
    const b = getArg('b');
    ctx.fillStyle = 'red';
    const xMin = Math.max(0, getCanvasX(getArg('xMin')));
    const xMax = Math.min(canvas.width, getCanvasX(getArg('xMax')));

    for (let x = xMin; x <= xMax; x++) {
        const realX = getRealX(x);
        const realY = F(a, b, realX);
        const y = getCanvasY(realY);
        if (!Number.isNaN(y) && y >= 0 && y <= canvas.height)
            drawPixel(x, y);
    }
};
