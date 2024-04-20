// sketch.js - Main scene
// Author: Steven Hernandez
// Date: 4/19/24


let canvasContainer;
let centerHorz, centerVert;
let treePlacement = [];



function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $("#fullscreen").click(() => {
    let full = fullscreen();
    fullscreen(!full);
  });
  document.addEventListener("fullscreenchange", (event) => {
    resizeScreen();
  });
}

function resizeScreen() {
  clearTimeout(window.resizingFinished);
  window.resizingFinished = setTimeout(function () {
    let PositionX = fullscreen() ? windowWidth : canvasContainer.width();
    let PositionY = fullscreen() ? windowHeight : canvasContainer.height();

    resizeCanvas(PositionX, PositionY);
    centerHorz = width / 2;
    centerVert = height / 2;
    redraw();
  }, 250);
}

function seed() {
  $("#Reimagine").click(function () {
    location.reload();
  });
}

function draw() {
  SkyBackground();
  RedMountain();
  FrontRedMountain();
  Shadows();
  tree();
  seed();
}

function SkyBackground() {
  this.MainColor = color("#006699");
  this.atmosphereColor = color("#FFFFFF");

  for (let y = 0; y < height; y++) {
    this.mix = map(y, 0, height, 0, 1.2);
    this.mix - constrain(this.mix, 0, 1);
    this.x = lerpColor(this.MainColor, this.atmosphereColor, this.mix);
    stroke(this.x);
    line(0, y, width, y);
  }
}

function FrontRedMountain() {
  stroke("#CF8663");
  strokeWeight(3);
  fill("#F6A075");

  this.run = millis() * 0.02;

  this.fullElevate = fullscreen() ? height * 0.25 : height * 0.3;

  beginShape();
  for (let i = 0; i < width; i++) {
    this.NoiseAmount = noise((i + this.run) * 0.005);
    let Elevate = map(this.NoiseAmount, 0, 2, this.fullElevate, height * 0.8);

    vertex(i, Elevate);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function RedMountain() {
  stroke("#B46D36");
  strokeWeight(3);

  fill("#CF8663");

  this.run2 = millis() * 0.01;

  this.fullElevate2 = fullscreen() ? height * 0.2 : height * 0.1;

  beginShape();
  for (let i = 0; i < width; i++) {
    this.NoiseAmount = noise((i + this.run2) * 0.004);
    let Elevate = map(
      this.NoiseAmount,
      0,
      1.7,
      this.fullElevate2,
      height * 0.8
    );

    vertex(i, Elevate);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function Shadows() {
  noStroke();
  fill("#EFE6D2");
  ellipse(width / 2, height - 200, 100 * 90, 700);
}

function tree() {
  let timeNow = millis();

  if (treePlacement.length === 0) {
    for (let i = 0; i < 50; i++) {
      let scale = random(0.7, 1);
      let treeY = fullscreen()
        ? height - -100 * scale
        : height - 200 * scale - random(0, 400);
      let tree = {
        baseX: random(width),
        y: treeY,
        scale: scale,
        startTime: timeNow,
        x: random(width),
      };
      treePlacement.push(tree);
    }
  }

  for (let i = treePlacement.length - 1; i >= 0; i--) {
    let tree = treePlacement[i];
    let elapsedTime = (timeNow - tree.startTime) / 1000;
    let speed = 50;

    tree.x = tree.baseX + elapsedTime * speed * tree.scale;

    if (tree.x > width + 100) {
      tree.baseX = -100;
      tree.x = tree.baseX;
      tree.startTime = timeNow;
      tree.y = fullscreen()
        ? height - -100 * tree.scale
        : height - 100 * tree.scale - random(0, 400);
    }

    push();
    translate(tree.x, tree.y);
    scale(tree.scale);
    fill("#34312C");
    stroke("#34312C");
    beginShape();

    vertex(-25, 50);
    vertex(0, -100);
    vertex(25, 50);

    endShape(CLOSE);
    pop();
  }
}

function checkFullscreen() {
  this.showFull = fullscreen();
  fullscreen(!this.showFull);
  if (!this.showFull) {
    for (let tree of treePlacement) {
      tree.startTime = millis();
      tree.y = height - -125 * tree.scale - random (0,400);
      tree.baseX =
        tree.x - ((millis() - tree.startTime) / 1000) * 100 * tree.scale;
    }
  } else {
    for (let tree of treePlacement) {
      tree.startTime = millis();
      tree.y = height - -125 * tree.scale - random(0,400);
      tree.baseX =
        tree.x - ((millis() - tree.startTime) / 1000) * 5 * tree.scale;
    }
  }
  resizeScreen();
  redraw();
}

$("#fullscreen").click(checkFullscreen);
