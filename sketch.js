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
}

function draw() {
  if (!started) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("CLICK TO START", width / 2, height / 2); //시작 화면
    return;
  }

  background(20);

  let spectrum = fft.analyze(); // 소리 분석

  noStroke();
  fill(0, 200, 255);

  // 간단한 막대 그래프
  for (let i = 0; i < spectrum.length; i += 10) {
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(i, height - h, 8, h);
  }
}

function mousePressed() {
  if (!started) {
    started = true;
    mySound.play();
  }
}

