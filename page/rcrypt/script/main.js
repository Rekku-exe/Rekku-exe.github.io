String.prototype.hexEncode = function () {
    let hex, i

    let result = ""
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16)
        result += ("000" + hex).slice(-4)
    }

    return result
}

String.prototype.hexDecode = function () {
    let j
    let hexes = this.match(/.{1,4}/g) || []
    let back = ""
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16))
    }

    return back;
}

function componentToHex(c) {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function hexToRgb(hex) {
    let result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

function crypt() {
    let hex = document.getElementById("myText").value.hexEncode()
    let hexs = []
    while (hex.length > 0) {
        hexs.push(hex.slice(0, 6))
        hex = hex.slice(6)
    }
    while (hexs[hexs.length - 1].length < 6) {
        hexs[hexs.length - 1] += "0"
    }
    let s = Math.sqrt(hexs.length)
    let width = (Math.floor(s) == s ? s : Math.floor(s) + 1)
    let height = Math.floor(s)
    let buffer = new Uint8ClampedArray(width * height * 4)
    for (let i = 0; i < hexs.length; i++) {
        let rgb = hexToRgb(hexs[i])
        let pos = i * 4
        buffer[pos] = rgb.r
        buffer[pos + 1] = rgb.g
        buffer[pos + 2] = rgb.b
        buffer[pos + 3] = 255
    }

    // create off-screen canvas element
    let ctx = document.createElement("canvas").getContext("2d")

    ctx.canvas.width = width
    ctx.canvas.height = height

    // create imageData object
    let idata = ctx.createImageData(width, height)

    // set our buffer as source
    idata.data.set(buffer)

    // update canvas with new data
    ctx.putImageData(idata, 0, 0)

    let dataUri = ctx.canvas.toDataURL("image/png"); // produces a PNG file

    //document.getElementById("img").src = dataUri
    let link = document.createElement("a")
    link.download = "message.png"
    link.href = dataUri
    link.click();
}

function uncrypt() {
    let ctx = document.createElement("canvas").getContext("2d")

    let img = new Image;
    img.onload = function () {
        ctx.drawImage(img, 0, 0)
        let imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
        readImage(imageData);
    }
    img.src = URL.createObjectURL(document.getElementById("file").files[0]);
}

function readImage(imageData) {
    let array = imageData.data
    let res = ""
    for (let i = 0; i + 4 < array.length; i += 4) {
        if(array[i] == 0 && array[i + 1] == 0 && array[i + 2] == 0) break
        res += rgbToHex(array[i], array[i + 1], array[i + 2])
    }
    document.getElementById("myText").value = res.hexDecode()
}