let capture;

var colorChannels = 4;

let numSegments = 50;//determine how many segments to make
let segments = [];//where we'll store individual segment
let drawSegments = true
var mosaicGrid = [];
let mosaicSize = 25;

let customCursor1;
let customCursor2;
let offsetX,offsetY;
let offsetX2,offsetY2;

let isPressed =false;
let song;
function mousePressed(){
    isPressed =true;
    song.loop();

}

function mouseReleased(){
    isPressed =false;
    song.stop();
}
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");
    song = loadSound("music/bobo.mp3");
    customCursor1 = createImg('img/cat.gif');
    customCursor2 = createImg('img/eat.gif');
    customCursor1.style('width', '50px');
    customCursor1.style('height', '50px');
    customCursor2.style('width', '50px');
    customCursor2.style('height', '50px');
    customCursor2.position(-200,-200);
    customCursor1.elt.onload = function() {

        gifWidth = customCursor1.width;
        gifHeight = customCursor1.height;

        offsetX = gifWidth / 2;
        offsetY = gifHeight / 2;
    };

    customCursor2.elt.onload = function() {

        gifWidth2 = customCursor2.width;
        gifHeight2 = customCursor2.height;

        offsetX2 = gifWidth2 / 2;
        offsetY2 = gifHeight2 / 2;

    };

    capture = createCapture(VIDEO);

    capture.position(0, 0);
    capture.size(800, 450);

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
    background(0);
    textAlign(CENTER,CENTER);
    fill(255);
    textSize(50);
    text("When you depressed...",width/2,height/10);
    rectMode(CENTER);
    imageMode(CENTER);
    push();
    translate(width/2-400,height/2-225);
    mosaicEffect();
    pop();

    if(!isPressed){
        customCursor1.position(mouseX -offsetX, mouseY - offsetY);
        customCursor2.position(-200,-200);
    }else{
        customCursor2.position(mouseX -offsetX2, mouseY - offsetY2);
        customCursor1.position(-200,-200);
    }

    fill(255);
    textSize(20);
    text("All wiped clean!",width/2,height/2+225+80);



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
            if (mouseX-width/2+400 >= x && mouseX-width/2+400 < x + mosaicSize && mouseY-height/2+225 > y && mouseY-height/2+225 < y + mosaicSize) {
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

