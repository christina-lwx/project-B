
let song;

let isPlay  =false;
let cat3Image;
let backImage;
let motuoMusic
let catchCatImage
function  preload(){
  song = loadSound("music/back.mp3");
  motuoMusic = loadSound("music/motuo.mp3");
}
let video;
let font;
let isPlayEnd = false;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  song.play();
  video = createVideo("video/pg3.mov");
  video.hide();
  video.play();
  cat3Image = loadImage("img/cat3.png");
  catchCatImage= loadImage("img/catchCat.png");
  pg = createGraphics(800, 450);
  background(0);
  backImage = loadImage("img/back3.jpg")
  font = loadFont("font/gingercat-pgg21.ttf");

  motuoCar = createImg('img/motuoCat.gif');
  motuoCar.style('width', '100px');
  motuoCar.style('height', '100px');
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
}
let isPlayMusic=false;
let pg;
let clickNum=0;
function draw() {
  image(backImage, width / 2, height / 2, width, height);

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);
  noStroke();
  fill(0);
  text("When you are anxious...", width / 2, height / 10);



  if (video.time() >= video.duration()) {
    isPlayEnd = true;
    if(isPlayMusic==false){
      motuoMusic.loop();
      isPlayMusic=true;
    }
  }
  imageMode(CENTER);
  rectMode(CENTER);
  if (isPlayEnd) {

    pg.stroke(255);
    //stroke weight
    pg.strokeWeight(10);
    let val = sqrt(pow(pmouseX-mouseX, 2)+pow(pmouseY-mouseY,2))

    val = map(val, 0, 280, 0, 200);
    pg.fill(0,50);

    //draws line in direction of mouse X/Y movements
    pg.line (mouseX-width/2+400, mouseY-height/2+230, pmouseX-width/2+400, pmouseY-height/2+230);//draw line
    image(pg, width / 2, height / 2, 800, 450);
    stroke(0);
    strokeWeight(5);
    noFill();
    rect( width / 2, height / 2, 800, 460);


    if(mouseX>width / 2-400&&mouseX<width / 2+400&&mouseY>=height/2-225&&mouseY<=height/2+225){
      if(clickNum>=2){
        image(catchCatImage,mouseX,mouseY,100,100);
        motuoCar.position(-200, -200);
        motuoMusic.stop();
        pg.clear();
      }else{
        motuoCar.position(mouseX-50, mouseY-50);
      }

    }else{
      motuoCar.position(-200, -200);
      image(cat3Image,mouseX,mouseY,50,50);
    }
  } else {

    image(video, width / 2, height / 2, 800, 450);
    motuoCar.position(-200, -200);
    image(cat3Image,mouseX,mouseY,50,50);
  }



  push();
  rectMode(CORNER);
  button(nextButton);
  pop();
  fill(0);
  textSize(30);
  text("Double click to pat pat!", width / 2, height / 2 + 225 + 80);
}



function mousePressed(){

  if(isPlayEnd){
    clickNum+=1;
  }
  nextButton.on_clicked = function () {
    window.location.href = "page4.html";
  }

}
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}