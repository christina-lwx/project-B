
let song;

let isPlay  =false;
function  preload(){
  song = loadSound("music/back.mp3");

}
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvasContainer");
  song.play();
  background(0);
}
function draw() {

  //sets random stroke colour
  stroke(random(0,255), random(0, 255), random(0,255));

  //stroke weight
  strokeWeight(10);
  let val = sqrt(pow(pmouseX-mouseX, 2)+pow(pmouseY-mouseY,2))

  val = map(val, 0, 280, 0, 200);
  fill(0,50);

  //draws line in direction of mouse X/Y movements
  line (mouseX, mouseY, pmouseX, pmouseY);//draw line


}



function mousePressed(){
  if(isPlay==false){

    song.play();
    isPlay=true;
  }

}