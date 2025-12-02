let mySound;
let started = false;
let fft;
let amp;
let colorTheme = "default";
let playButton;

function preload() {
  soundFormats("mp3");
  mySound = loadSound("Touched.mp3");
}

function setup() {
  createCanvas(600, 400);
  fft = new p5.FFT();
  amp = new p5.Amplitude();
  noStroke();
  
  // 재생, 일시정지 버튼 만들기
  playButton = createButton("Play/Pause");
  playButton.position(10, 10);
  playButton.mousePressed(togglePlay);

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
  if (vol > 0.05) {
    // 소리가 크면 낮
    background(135, 206, 250); // 하늘색
    fill(255, 255, 0); // 해 색
    ellipse(width - 80, 80, 50, 50); // 해
  } else {
    // 소리가 작으면 밤
    background(20, 24, 82); // 어두운 색
    fill(255, 255, 200); // 달 색
    ellipse(width - 80, 80, 40, 40); // 달
  }

  let soundValues = fft.analyze();
  let spaceBetween = 20; // 건물 사이 간격
  let buildingWidth = 15; // 건물 폭

  // 음악 따라 건물 높이 만들기
  for (let i = 0; i < soundValues.length; i += 5) {
    let h = map(soundValues[i], 0, 255, 10, height / 2);
    // 건물 위치
    let x = (i * spaceBetween) / 5;
    let y = height - h;

    let r, g, b;

    // 키 입력에 따른 건물 색상
    if (colorTheme === "red") {
      r = 200;
      g = map(soundValues[i], 0, 255, 0, 80);
      b = map(soundValues[i], 0, 255, 0, 80);
    } else if (colorTheme === "blue") {
      r = map(soundValues[i], 0, 255, 0, 70);
      g = map(soundValues[i], 0, 255, 80, 120);
      b = 255;
    } else if (colorTheme === "green") {
      r = map(soundValues[i], 0, 255, 0, 40);
      g = map(soundValues[i], 0, 255, 120, 200);
      b = map(soundValues[i], 0, 255, 0, 60);
    } else if (colorTheme === "yellow") {
      r = 255;
      g = 255;
      b = map(soundValues[i], 0, 255, 0, 80);
    } else {
      // 기본 모드
      r = map(soundValues[i], 0, 255, 50, 255);
      g = map(soundValues[i], 0, 255, 50, 200);
      b = map(soundValues[i], 0, 255, 100, 255);
    }

    fill(r, g, b);
    // 건물 몸통
    rect(x, y, buildingWidth, h);
    // 건물 지붕 (높이에 맞춰서 변함)
    fill(r + 20, g + 20, b + 20);
    let roofHeight = map(soundValues[i], 0, 255, 5, 20);
    triangle(x, y, x + buildingWidth, y, x + buildingWidth / 2, y - roofHeight);
  }
}

function mousePressed() {
  if (!started) {
    started = true;
    mySound.play();
  }
}

function keyPressed() {
  if (key === "R" || key === "r") colorTheme = "red";
  if (key === "B" || key === "b") colorTheme = "blue";
  if (key === "G" || key === "g") colorTheme = "green";
  if (key === "Y" || key === "y") colorTheme = "yellow";
}

// 버튼 클릭 시 음악 재생/일시정지
function togglePlay() {
  if (mySound.isPlaying()) {
    mySound.pause();
  } else {
    mySound.play();
  }
}
