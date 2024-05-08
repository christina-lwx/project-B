



let cat4Image;
let backImage;

let mic;

let catWuGif;
function  preload(){


}
let video;
let font;
let isPlayEnd = false;

let videos=[];

let wuCatSize=0;

let isLoud =false;

let song ;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  mic = new p5.AudioIn();
  mic.start();
  song = loadSound("music/wu.mp3");
  video = createVideo("video/pg4.mp4");
  video.hide();
  video.loop();
  cat4Image = loadImage("img/cat4.png")
  pg = createGraphics(800, 450);
  background(0);
  backImage = loadImage("img/back4.jpg")
  font = loadFont("font/gingercat-pgg21.ttf");


  catWuGif = createImg('img/wu.gif');
  catWuGif.style('width', wuCatSize+'px');
  catWuGif.style('height', wuCatSize+'px');
  catWuGif.position(width/2-wuCatSize/2,height/2-wuCatSize/2);
  nextButton = {
    x:
        width - width / 10 - 50, y:
        height / 2, w:
        width / 10, h:
        50, text:
        "Next",
    font:
    font, text_size:
        30,
    color:
        'rgb(255,255,255)',
    border_color:
        '#FFDAB9',
    //shadow effect when button is hovered over
    hover_shadow:
        {
          blur:
              10, color:
              'rgb(128,0,0)', offset_x:
              1, offset_y:
              4
        }
    ,
    corners:
        [10, 10, 10, 10]
  };

  mouseCat = new MouseCat(cat4Image);
}

let pg;
let time;

let isOver =false;
function draw() {



  if(isOver==true){
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(50);
    noStroke();
    fill(255);
    let msg = "Your cat love you.\n"+"Your dog loves you.\n" +
        "I love you. \n" +
        "You love yourself."
  text(msg, width / 2, height /2);
  }else{
    image(video, width / 2, height / 2, width, height);


    let vol = mic.getLevel();
    console.log(vol);




    imageMode(CENTER);
    rectMode(CENTER);


    image(cat4Image, mouseX, mouseY, 100, 100);

    push();
    rectMode(CORNER);
    // button(nextButton);
    pop();

    noFill();
    stroke(255,0,0);
    strokeWeight(10);
    if(vol>0.2){
      if(isLoud==false){
        isLoud =true;
        song.loop();
        time = millis();
      }
    }




    if(isLoud==true){



      if(wuCatSize<400){
        wuCatSize+=5;
        catWuGif.style('width', wuCatSize+'px');
        catWuGif.style('height', wuCatSize+'px');
        catWuGif.position(width/2-wuCatSize/2,height/2-wuCatSize/2);
      }
    }


    let num =map(vol,0,0.2,0,20);
    let size = 100;
    for (let i = 0; i <int(num) ; i++) {

      ellipse(width/2,height/2,size,size);
      size+=50;

    }
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(50);
    noStroke();
    fill(255,0,0);
    text("When you are angry...", width / 2, height / 10);

    if(millis()-time>=5000){

      isOver = true;
      song.stop();
      catWuGif.position(-1000,-1000);
    }

  }


}



function mousePressed(){

  nextButton.on_clicked = function () {
    window.location.href = "page4.html";
  }

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}

class MouseCat{

  constructor(img) {
    this.img = img;

  }

  disPlay(){
    image( this.img,mouseX,mouseY,50,50);
  }


}
