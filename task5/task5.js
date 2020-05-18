function getArg(id) {
    return Number(document.getElementById(id).value);
}

// z = x² - y²
function F(x, y) {
    return x * x - y * y;
}

onRedraw = function() {
    ctx.fillStyle = 'red';
    const xMin = getArg('xMin');
    const xMax = getArg('xMax');
    const yMin = getArg('yMin');
    const yMax = getArg('yMax');

    const top = [];
    const bottom = [];
    for (let x = 0; x < canvas.width; x++){
        top[x] = canvas.height;
        bottom[x] = 0;
    }

    const n = 100;

    for (let i = 0; i <= n; i++) {
        const x = xMin + i * (xMax - xMin) / n;

        for (let j = 0; j <= n; j++) {
            const y = yMin + j * (yMax - yMin) / n;
            const z = F(x, y);

            let [xx, yy] = getCanvasPoint(x, y, z);

            if (yy > bottom[xx]){
                drawPixel(x, y, z, 'blue');
                bottom[xx] = yy;
            }
            if (yy < top[xx]) {
                drawPixel(x, y, z, 'red');
                top[xx] = yy;
            }
        }
    }

    //
    // for (let xx = 0; xx < window.innerWidth; xx++) {
    //     const x = getRealX(xx);
    //     const y = F(x, a, b);
    //     const yy = getCanvasY(y);
    //     const yy2 = getCanvasY(-y);
    //
    //     if (isNaN(prevY)) prevY = yy;
    //     if (isNaN(prevY2)) prevY2 = yy2;
    //
    //     linkPoints(xx, yy, prevY);
    //     linkPoints(xx, yy2, prevY2);
    //
    //     prevY = yy;
    //     prevY2 = yy2;
    // }
};