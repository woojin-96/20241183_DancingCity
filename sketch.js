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
    text("CLICK TO START", width / 2, height / 2); //시작 화면(오류방지)
    return;
  }

  background(50);
  
  let spectrum = fft.analyze();

  noStroke();
  fill(250, 200, 0);

  for (let i = 0; i < spectrum.length; i += 20) {
    let h = spectrum[i];
    rect(i, height - h, 10, h);
  }
} //음악 반응 확인

function mousePressed() {
  if (!started) {
    started = true;
    mySound.play();
  }
}
