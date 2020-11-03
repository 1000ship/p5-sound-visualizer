var {innerWidth: stageWidth, innerHeight: stageHeight} = window;
var canvas;
var ctx;

function preload() {
  sound = loadSound("/audio/sound.mp3");
}

function setup() {
  fft = new p5.FFT(0.9, 256); //(smoothing, bins)
  sound.amp(0.2);

  window.addEventListener("click", togglePlay);

  canvas = document.createElement("canvas");
  canvas.setAttribute("width", stageWidth);
  canvas.setAttribute("height", stageHeight);
  document.body.innerHTML = "";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  setInterval(()=>draw(), 1000 / 60);
}

function draw() {
  ctx.clearRect(0, 0, stageWidth, stageHeight);
  ctx.fillStyle = "#000000";

  if(!sound.isPlaying())
  {
    ctx.font = "25px serif";
    ctx.fillText("Click/Touch anywhere to play music", 10, stageHeight/2 );
    return;
  }

  var spectrum = fft.analyze();
  
  spectrum.forEach((value, index) => {
    const vSize = (value/256) * stageHeight / 2;
    ctx.fillRect( stageWidth / 2 + stageWidth / 2 * (index/spectrum.length), stageHeight / 2 - vSize / 2, 5, vSize);
    ctx.fillRect( stageWidth / 2 - stageWidth / 2 * (index/spectrum.length), stageHeight / 2 - vSize / 2, -5, vSize);
  });
}

function togglePlay() {
  sound.amp(0.2);
  if (sound.isPlaying()) sound.stop();
  else sound.loop();
}

