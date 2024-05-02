let capture;

var colorChannels = 4;

let numSegments = 50;//determine how many segments to make
let segments = [];//where we'll store individual segment
let drawSegments = true
var mosaicGrid = []; 
let mosaicSize = 25;
function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent("canvasContainer");

    capture = createCapture(VIDEO);
  
    capture.position(0, 0);
    capture.size(width, height);

    capture.hide();


    for (var y = 0; y < capture.height; y += mosaicSize) {
        mosaicGrid[y / mosaicSize] = []; 
        for (var x = 0; x < capture.width; x += mosaicSize) {
            mosaicGrid[y / mosaicSize][x / mosaicSize] = 0;
        }
    }


}

function mouseMoved() {

    for (var y = 0; y < capture.height; y += mosaicSize) {
        for (var x = 0; x < capture.width; x += mosaicSize) {
         
            if (mouseX >= x && mouseX < x + mosaicSize && mouseY >= y && mouseY < y + mosaicSize) {
                mosaicGrid[y / mosaicSize][x / mosaicSize] = 1; 
            }
        }
    }
}


function uniqueCoordinates(array) {
    let uniqueArray = [];
    let uniqueMap = new Map(); 

    array.forEach(coord => {
        
        let key = coord[0] + '-' + coord[1];
        if (!uniqueMap.has(key)) {
            uniqueArray.push(coord);
            uniqueMap.set(key, true);
        }
    });

    return uniqueArray;
}

let coordinatesArray = [];

function draw() {


    mosaicEffect();


}


function mosaicEffect() {
    var mosaicSize = 25; 
    capture.loadPixels(); //Accessing the pixel array is required to proceed.

    for (var y = 0; y < capture.height; y += mosaicSize) {
        for (var x = 0; x < capture.width; x += mosaicSize) {
            var index = (y * capture.width + x) * colorChannels;
            var r = capture.pixels[index + 0];
            var g = capture.pixels[index + 1];
            var b = capture.pixels[index + 2];
            var c = color(r, g, b + 100); 
            if (mouseX >= x && mouseX < x + mosaicSize && mouseY > y && mouseY < y + mosaicSize) {
                let img = capture.get(x, y, mosaicSize, mosaicSize);
                image(img, x, y);
                coordinatesArray.push([x, y]);
            } else {
                coordinatesArray = uniqueCoordinates(coordinatesArray);
                let isExist = false
                for (let i = 0; i < coordinatesArray.length; i++) {
                    if (coordinatesArray[i][0] === x && coordinatesArray[i][1] === y) {

                        isExist = true;

                    }
                }
                if (isExist) {
                    let img = capture.get(x, y, mosaicSize, mosaicSize);

                    image(img, x, y);
                } else {
                    fill(c);
                    noStroke();
                    rect(x, y, mosaicSize, mosaicSize);
                }

            }

        }
    }
}

