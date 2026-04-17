let isShooting = false;
let shootTimer = 0;
let enemyShooting = false;
let enemyShootTimer = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(180, 220, 255);

  // water
  noStroke();
  fill(80, 150, 230);
  rect(0, 300, width, 200);

  let bob1 = sin(frameCount * 0.05) * 8;
  let bob2 = sin(frameCount * 0.05) * 8;

  drawDuck(120, 260 + bob1);
  drawEnemyDuck(680, 260 + bob2);

  if (shootTimer > 0) {
    shootTimer--;
  } else {
    isShooting = false;
  }

  if (enemyShootTimer > 0) {
    enemyShootTimer--;
  } else {
    enemyShooting = false;
  }
}
function drawDuck(x, y) {
  // body
  fill(255, 230, 40);
  ellipse(x, y, 100, 65);

  // tail
  triangle(x - 42, y - 8, x - 68, y - 24, x - 58, y + 8);

  // head
  ellipse(x + 32, y - 28, 45, 45);

  // beak
  fill(255, 140, 0);
  ellipse(x + 55, y - 24, 24, 12);

  // eye
  fill(0);
  ellipse(x + 37, y - 33, 5, 5);

  // wing
  fill(240, 210, 30);
  ellipse(x - 5, y, 38, 24);

  // gun
  fill(60);
  rect(x + 2, y - 10, 38, 8);
  rect(x + 35, y - 14, 8, 16);

  if (isShooting) {
    fill(255, 220, 0);
    triangle(x + 40, y - 14, x + 40, y - 2, x + 58, y - 8);
  }
}

function drawEnemyDuck(x, y) {
  // body
  fill(220, 220, 220);
  ellipse(x, y, 100, 65);

  // tail
  triangle(x + 42, y - 8, x + 68, y - 24, x + 58, y + 8);

  // head
  ellipse(x - 32, y - 28, 45, 45);

  // beak
  fill(255, 100, 0);
  ellipse(x - 55, y - 24, 24, 12);

  // eye
  fill(255, 0, 0);
  ellipse(x - 37, y - 33, 5, 5);

  // wing
  fill(180, 180, 180);
  ellipse(x + 5, y, 38, 24);

  // gun
  fill(30);
  rect(x - 40, y - 10, 38, 8);
  rect(x - 43, y - 14, 8, 16);

  if (enemyShooting) {
    fill(255, 80, 0);
    triangle(x - 40, y - 14, x - 40, y - 2, x - 58, y - 8);
  }
}

function mousePressed() {
  isShooting = true;
  shootTimer = 15;
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    enemyShooting = true;
    enemyShootTimer = 15;
  }
}