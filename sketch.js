let mySound;      
let started = false; 
let fft;          
let amp;

function preload() {
  soundFormats("mp3");
  mySound = loadSound("Touched.mp3");
}

function setup() {
  createCanvas(600, 400);
  fft = new p5.FFT(); 
  amp = new p5.Amplitude();
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

  let vol = amp.getLevel();

  // 소리 크기에 따라 낮/밤 배경 색 바꾸기
  if (vol > 0.05) { // 소리가 크면 낮
    background(135, 206, 250); // 하늘색
    fill(255, 255, 0); // 해 색
    ellipse(width - 80, 80, 50, 50); // 해
  } else { // 소리가 작으면 밤
    background(20, 24, 82); // 어두운 색
    fill(255, 255, 200); // 달 색
    ellipse(width - 80, 80, 40, 40); // 달
  }
  
  // background(20); 
let soundValues = fft.analyze(); 
//건
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
