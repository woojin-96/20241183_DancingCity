let mySound;      
let started = false; 
let fft;          

function preload() {
  soundFormats("mp3");
  mySound = loadSound("Touched.mp3");
}

function setup() {
  createCanvas(600, 400);
  fft = new p5.FFT(); 
  noStroke();
}

function draw() {
  if (!started) {
    // 시작 화면
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("CLICK TO START", width / 2, height / 2);
    return; 
  }

  background(20); 
let soundValues = fft.analyze(); 

let spaceBetween = 20;  // 건물 사이 간격
let buildingWidth = 15; // 건물 폭

for (let i = 0; i < soundValues.length; i += 5) {
  
  // 음악 따라 건물 높이 만들기
  let buildingHeight = map(soundValues[i], 0, 255, 10, height / 2);
  
  // 건물 위치
  let posX = i * spaceBetween / 5;
  let posY = height - buildingHeight;
  
  // 건물 색상 (음악에 따라 변함)
  let redColor = map(soundValues[i], 0, 255, 50, 255);
  let greenColor = map(soundValues[i], 0, 255, 50, 200);
  let blueColor = map(soundValues[i], 0, 255, 100, 255);
  fill(redColor, greenColor, blueColor);
  
  // 건물 몸통
  rect(posX, posY, buildingWidth, buildingHeight);
  
  // 건물 지붕 (높이에 맞춰서 변함)
  fill(redColor + 20, greenColor + 20, blueColor + 20);
  let roofHeight = map(soundValues[i], 0, 255, 5, 20);
  triangle(posX, posY, posX + buildingWidth, posY, posX + buildingWidth / 2, posY - roofHeight);
}
}

function mousePressed() {
  if (!started) {
    started = true;
    mySound.play();
  }
}
