function isPhoneGap() {
    return ('cordova' in window || 'PhoneGap' in window || 'phonegap' in window)
        && /^file:\/{3}[^\/]/i.test(window.location.href)
        && /ios|iphone|ipod|ipad|android|/i.test(navigator.userAgent);
}

function generateGradient(grad, length) {
    // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, length);

    canvas.width = 1;
    canvas.height = length;

    for (var i in grad) {
        gradient.addColorStop(i, grad[i]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, length);

    var grad = ctx.getImageData(0, 0, 1, length).data;

    return grad;
}