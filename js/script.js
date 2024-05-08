let backImage;
let video;
let isPlay = false;
let song;
let font;
let nextButton;
let cat;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");
    backImage = loadImage("img/backPage1.png");
    video = createVideo("video/pg1.mp4");
    song = loadSound("music/cat.wav");
    video.hide();
    font = loadFont("font/gingercat-pgg21.ttf");
    nextButton = {
        x: (width - width / 10 - 50),
        y: height / 2,
        w: width / 10,
        h: 50,
        text: "Next",
        font: font,
        text_size: 30,
        color: 'rgb(255,255,255)',
        border_color: '#FFDAB9',
        hover_shadow: {
            blur: 10,
            color: 'rgb(128,0,0)',
            offset_x: 1,
            offset_y: 4
        },
        corners: [10, 10, 10, 10],

    };
    cat = new Cat();
    background(255);
}

function draw() {
    image(backImage, width / 2, height / 2, windowWidth, windowHeight + 100);
    rectMode(CENTER);
    imageMode(CENTER);
    fill(255);
    rect(width / 2, height / 2, 800, 450);
    if (isPlay) {
        image(video, width / 2, height / 2, 800, 450);
    }
    fill(255);
    textSize(50);
    text("Click me to start!", width / 2 + width / 6, height - height / 6);
    fill(0);
    rectMode(CORNER);
    button(nextButton);
}

function mousePressed() {


    cat.click();

  
if(    mouseX >= ((width - width / 10 - 50))&&
    mouseX <= (((width - width / 10 - 50))+width / 10) &&
    mouseY >= height / 2 &&
    mouseY <= height / 2+50){
    window.location.href = "page2.html";
}

    // nextButton.on_clicked = function () {
    //     window.location.href = "page2.html";
    // }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


class Cat{


    constructor() {

    }


    click(){
        if (
            mouseX >= width / 2 + width / 6 - 400 &&
            mouseX <= width / 2 + width / 6 &&
            mouseY >= height - height / 4 &&
            mouseY <= height
        ) {
            isPlay = true;
            video.time(0);
            song.play();
            video.play();
        }
    }


}