let capture;
// colorChannels 是用来表示每个像素在图像中所包含的颜色通道的数量。在一般的图像处理中，通常使用红色（R）、绿色（G）、蓝色（B）三个通道来表示颜色。而在一些图像格式中，还可能包含透明度通道（通常称为 Alpha 通道），用于控制像素的透明度。
//
// 在代码中，colorChannels 的值被设置为 4，表示每个像素有四个颜色通道（R、G、B、Alpha）。这是因为 p5.js 使用的图像数据结构中，每个像素都以四个连续的数字表示（R、G、B、Alpha），所以这个参数的作用是帮助正确地从像素数组中提取颜色信息。
//
// 如果图像是灰度图像，只有一个颜色通道，那么 colorChannels 可以被设置为 1。在处理不同类型的图像时，这个参数的值可能会有所不同。
var colorChannels = 4;

let numSegments = 50;//determine how many segments to make
let segments = [];//where we'll store individual segment
let drawSegments = true
var mosaicGrid = []; // 二维数组存储马赛克块的颜色信息
let mosaicSize = 25; // 马赛克块的大小
function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent("canvasContainer");

    capture = createCapture(VIDEO);
    // 设置捕获对象的位置和尺寸
    capture.position(0, 0);
    capture.size(width, height);
    // 隐藏默认的视频播放元素
    capture.hide();


    for (var y = 0; y < capture.height; y += mosaicSize) {
        mosaicGrid[y / mosaicSize] = []; // 创建二维数组的行
        for (var x = 0; x < capture.width; x += mosaicSize) {
            mosaicGrid[y / mosaicSize][x / mosaicSize] = 0; // 将每个马赛克块的初始颜色设为黑色
        }
    }


}

function mouseMoved() {

    for (var y = 0; y < capture.height; y += mosaicSize) {
        for (var x = 0; x < capture.width; x += mosaicSize) {
            // 检查鼠标是否在当前马赛克块的区域内
            if (mouseX >= x && mouseX < x + mosaicSize && mouseY >= y && mouseY < y + mosaicSize) {
                mosaicGrid[y / mosaicSize][x / mosaicSize] = 1; // 如果是，将值设为 1
            }
        }
    }
}

// 定义一个自定义的去重函数，根据坐标值进行比较
function uniqueCoordinates(array) {
    let uniqueArray = [];
    let uniqueMap = new Map(); // 使用Map对象来存储已经出现过的坐标值

    array.forEach(coord => {
        // 将坐标值转换成字符串格式，作为Map对象的键
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
    var mosaicSize = 25; // 马赛克块的大小
    capture.loadPixels(); //Accessing the pixel array is required to proceed.

    for (var y = 0; y < capture.height; y += mosaicSize) {
        for (var x = 0; x < capture.width; x += mosaicSize) {
            var index = (y * capture.width + x) * colorChannels;
            var r = capture.pixels[index + 0];
            var g = capture.pixels[index + 1];
            var b = capture.pixels[index + 2];
            var c = color(r, g, b + 50); // 这里加了50的蓝色分量
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

