function getArg(id) {
    return JSON.parse(document.getElementById(id).value);
}

onRedraw = function() {
    ctx.fillStyle = 'red';
    const pyramid = math.transpose(math.matrix(getArg('pyramid')));
    const box = math.transpose(math.matrix(getArg('box')));
    console.log(box);
};

