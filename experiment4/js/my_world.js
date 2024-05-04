// sketch.js - infinite world
// Author: Steven Hernandez
// Date: 5/2/2024

let worldSeed;
let ripples = [];

let waveTime = 10;  
let waveAmplitude = 10;  
let waveLength = 35; 
let waveSpeed = 0.1; 

function p3_preload() {}

function p3_setup() {
  frameRate(60);  
}

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}


function p3_tileWidth() {
  return 16;
}

function p3_tileHeight() {
  return 6;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

function p3_tileClicked(i, j) {
  ripples.push({ x: i, y: j, time: 0 });  
}


function p3_drawTile(i, j) {
  noStroke();
  

  let waveOffset = waveAmplitude * sin(TWO_PI / waveLength * (i + j + waveTime));


  ripples.forEach(ripple => {
    let distance = dist(ripple.x,  ripple.y, i, j);  
   
    if (distance < ripple.time) {
      let rippleWave = 5 * sin(TWO_PI / 10 * (ripple.time - distance)); 
      waveOffset += rippleWave;
    }
  });


  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
 
    let deepWater = color('#2E3A8DAD'); 
    let shallowWater = color('#15A0CE96'); 
    let depthWater = (sin(frameCount * 0.1 + (i + j) * 0.5) + 1) / 2;
    let tileColor = lerpColor(deepWater, shallowWater, depthWater);
  
    fill(tileColor);
  } else {
    fill('#55819BED');  
  }

  push();
  translate(0, waveOffset); 

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke('#40984D');

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}


function p3_drawAfter() {
  waveTime += waveSpeed;  

  
  ripples.forEach((ripple, index) => {
    ripple.time += 0.2;  
    if (ripple.time > 25) {  
      ripples.splice(index, 1);
    }
  });
}

