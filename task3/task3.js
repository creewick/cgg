function getArg(id) {
    return Number(document.getElementById(id).value);
}

// x^2 / a^2 + y^2 / b^2 = 1
function F(x, a, b) {
    return Math.sqrt((b*b) * (1 - (x*x / (a*a))));
}

let prevY = NaN;
let prevY2 = NaN;

onRedraw = function() {
    ctx.fillStyle = 'red';
    const a = getArg('a');
    const b = getArg('b');

    for (let xx = 0; xx < window.innerWidth; xx++) {
        const x = getRealX(xx);
        const y = F(x, a, b);
        const yy = getCanvasY(y);
        const yy2 = getCanvasY(-y);

        if (isNaN(prevY)) prevY = yy;
        if (isNaN(prevY2)) prevY2 = yy2;

        linkPoints(xx, yy, prevY);
        linkPoints(xx, yy2, prevY2);

        prevY = yy;
        prevY2 = yy2;
    }
};

function linkPoints(x, y1, y2) {
    if (y1 === y2) {
        drawPixel(x, y1);
    }

    if (y1 < y2) {
        drawVerticalLine(x, y1, (y1 + y2) / 2);
        drawVerticalLine(x-1, (y1 + y2) / 2, y2);
    } else {
        drawVerticalLine(x, (y1 + y2) / 2, y1);
        drawVerticalLine(x-1, y2, (y1 + y2) / 2);
    }
}