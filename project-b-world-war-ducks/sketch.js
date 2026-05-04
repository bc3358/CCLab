let yellowDucks = [];
let grayDucks = [];

let yellowBullets = [];
let grayBullets = [];

let playerDuck;

let gameState = "story";
let storyStep = 0;
let countdown = 180;

let grayShootTimer = 0;

function setup() {
  createCanvas(800, 500);
  resetGame();
}

function draw() {
  drawBackground();

  if (gameState === "story") {
    drawStory();
  }

  if (gameState === "countdown") {
    drawCountdown();
  }

  if (gameState === "battle") {
    drawInstructions();

    movePlayer();
    moveGrayDucks();
    grayDucksShoot();

    drawAllDucks();
    updateBullets();

    checkWin();
    checkLose();
  }

  if (gameState === "victory") {
    drawVictoryScreen();
  }

  if (gameState === "defeat") {
    drawDefeatScreen();
  }
}

function resetGame() {
  yellowDucks = [];
  grayDucks = [];
  yellowBullets = [];
  grayBullets = [];

  playerDuck = new Duck(120, 305, "yellow", true);
  yellowDucks.push(playerDuck);

  yellowDucks.push(new Duck(90, 235, "yellow", false));
  yellowDucks.push(new Duck(90, 365, "yellow", false));
  yellowDucks.push(new Duck(160, 235, "yellow", false));
  yellowDucks.push(new Duck(160, 365, "yellow", false));

  grayDucks.push(new Duck(680, 215, "gray", false));
  grayDucks.push(new Duck(700, 275, "gray", false));
  grayDucks.push(new Duck(650, 335, "gray", false));
  grayDucks.push(new Duck(710, 395, "gray", false));
  grayDucks.push(new Duck(620, 305, "gray", false));

  grayShootTimer = 90;
}

function drawBackground() {
  background(180, 220, 255);

  noStroke();
  fill(255, 220, 80);
  ellipse(70, 70, 70, 70);

  fill(80, 150, 230);
  rect(0, 300, width, 200);

  stroke(40, 110, 200);
  strokeWeight(2);
  noFill();

  for (let x = 0; x < width; x += 80) {
    let waveY = 335 + sin(frameCount * 0.04 + x * 0.03) * 5;
    line(x, waveY, x + 40, waveY + 5);
    line(x + 40, waveY + 5, x + 80, waveY);
  }

  noStroke();
}

function drawStory() {
  drawAllDucks();

  fill(0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(30);
  text("WORLD WAR DUCKS", width / 2, 70);

  textSize(18);

  if (storyStep === 0) {
    text("The yellow ducks used to live peacefully on their side of the pond.", width / 2, 180);
  }

  if (storyStep === 1) {
    text("Then the gray ducks stole the Golden Bread Crumb.", width / 2, 180);
  }

  if (storyStep === 2) {
    text("The yellow ducks had no choice. They had to fight back.", width / 2, 180);
  }

  if (storyStep === 3) {
    text("Now the pond is split in two. Only one side can win.", width / 2, 180);
  }

  textSize(15);
  text("Press SPACE to continue", width / 2, 350);
}

function drawCountdown() {
  drawAllDucks();

  fill(0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(28);
  text("Get ready...", width / 2, 160);

  textSize(65);

  if (countdown > 120) {
    text("3", width / 2, 250);
  } else if (countdown > 60) {
    text("2", width / 2, 250);
  } else if (countdown > 0) {
    text("1", width / 2, 250);
  } else {
    gameState = "battle";
  }

  countdown--;
}

function drawInstructions() {
  fill(0);
  textAlign(CENTER, TOP);

  textSize(22);
  text("WORLD WAR DUCKS: 2026", width / 2, 15);

  textSize(14);
  text("WASD = move     SPACE = shoot     R = restart", width / 2, 45);

  textSize(13);
  text("Beat the gray ducks before they hit your leader.", width / 2, 65);
}

function movePlayer() {
  if (!playerDuck.alive) {
    return;
  }

  let speed = 4;

  if (keyIsDown(87)) {
    playerDuck.y -= speed;
  }

  if (keyIsDown(83)) {
    playerDuck.y += speed;
  }

  if (keyIsDown(65)) {
    playerDuck.x -= speed;
  }

  if (keyIsDown(68)) {
    playerDuck.x += speed;
  }

  playerDuck.x = constrain(playerDuck.x, 50, 370);
  playerDuck.y = constrain(playerDuck.y, 190, 420);
}

function moveGrayDucks() {
  for (let i = 0; i < grayDucks.length; i++) {
    let duck = grayDucks[i];

    if (duck.alive) {
      duck.x += duck.xSpeed;
      duck.y += duck.ySpeed;

      if (duck.x < 520 || duck.x > 740) {
        duck.xSpeed *= -1;
      }

      if (duck.y < 190 || duck.y > 420) {
        duck.ySpeed *= -1;
      }

      if (random(1) < 0.01) {
        duck.xSpeed = random(-1.4, 1.4);
        duck.ySpeed = random(-1.2, 1.2);
      }
    }
  }
}

function grayDucksShoot() {
  grayShootTimer--;

  if (grayShootTimer <= 0) {
    let aliveGray = [];

    for (let i = 0; i < grayDucks.length; i++) {
      if (grayDucks[i].alive) {
        aliveGray.push(grayDucks[i]);
      }
    }

    if (aliveGray.length > 0) {
      let shooter = random(aliveGray);
      shooter.shoot();
    }

    grayShootTimer = int(random(45, 90));
  }
}

function drawAllDucks() {
  for (let i = 0; i < yellowDucks.length; i++) {
    yellowDucks[i].update();
    yellowDucks[i].show();
  }

  for (let i = 0; i < grayDucks.length; i++) {
    grayDucks[i].update();
    grayDucks[i].show();
  }
}

function updateBullets() {
  for (let i = yellowBullets.length - 1; i >= 0; i--) {
    let b = yellowBullets[i];

    b.move();
    b.show();

    for (let j = 0; j < grayDucks.length; j++) {
      let duck = grayDucks[j];

      if (duck.alive && dist(b.x, b.y, duck.x, duck.y) < 42) {
        duck.die();
        yellowBullets.splice(i, 1);
        break;
      }
    }

    if (i < yellowBullets.length && b.x > width) {
      yellowBullets.splice(i, 1);
    }
  }

  for (let i = grayBullets.length - 1; i >= 0; i--) {
    let b = grayBullets[i];

    b.move();
    b.show();

    for (let j = 0; j < yellowDucks.length; j++) {
      let duck = yellowDucks[j];

      if (duck.alive && dist(b.x, b.y, duck.x, duck.y) < 42) {
        duck.die();
        grayBullets.splice(i, 1);
        break;
      }
    }

    if (i < grayBullets.length && b.x < 0) {
      grayBullets.splice(i, 1);
    }
  }
}

function checkWin() {
  let grayLeft = 0;

  for (let i = 0; i < grayDucks.length; i++) {
    if (grayDucks[i].alive) {
      grayLeft++;
    }
  }

  if (grayLeft === 0) {
    gameState = "victory";
  }
}

function checkLose() {
  if (!playerDuck.alive) {
    gameState = "defeat";
  }
}

function drawVictoryScreen() {
  background(255, 210, 80);

  fill(80, 150, 230);
  rect(0, 330, width, 170);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("VICTORY!", width / 2, 50);

  textSize(18);
  text("The yellow ducks took back the Golden Bread Crumb.", width / 2, 90);
  text("The pond now belongs to the yellow army.", width / 2, 118);

  push();
  translate(width / 2, 285);
  scale(1.55);
  drawLeaderDuck();
  pop();

  // army of yellow ducks
  for (let i = 0; i < 9; i++) {
    drawSmallDuck(80 + i * 80, 360);
  }

  for (let i = 0; i < 8; i++) {
    drawSmallDuck(120 + i * 80, 420);
  }

  fill(0);
  textSize(15);
  text("Press R to restart", width / 2, 475);
}

function drawDefeatScreen() {
  background(120);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("DEFEAT", width / 2, 170);

  textSize(18);
  text("The yellow duck leader has fallen.", width / 2, 220);
  text("The gray ducks keep the Golden Bread Crumb.", width / 2, 250);

  textSize(15);
  text("Press R to try again", width / 2, 330);
}

function drawSmallDuck(x, y) {
  push();
  translate(x, y);

  noStroke();
  fill(255, 230, 40);
  ellipse(0, 0, 55, 35);

  triangle(-22, -3, -38, -14, -32, 5);

  ellipse(18, -17, 25, 25);

  fill(255, 140, 0);
  ellipse(31, -15, 14, 8);

  fill(0);
  ellipse(20, -21, 3, 3);

  pop();
}

function drawLeaderDuck() {
  noStroke();

  fill(255, 230, 40);
  ellipse(0, 0, 110, 70);

  triangle(-48, -8, -76, -28, -64, 8);

  ellipse(35, -35, 52, 52);

  fill(255, 140, 0);
  ellipse(66, -31, 30, 15);

  fill(0);
  ellipse(42, -41, 6, 6);

  fill(255, 200, 0);
  triangle(15, -65, 25, -88, 35, -65);
  triangle(30, -65, 42, -92, 54, -65);
  triangle(48, -65, 58, -88, 68, -65);
  rect(15, -67, 53, 10);

  fill(240, 210, 30);
  ellipse(-8, 3, 42, 26);
}

class Duck {
  constructor(x, y, team, player) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.player = player;

    this.alive = true;

    this.bobSpeed = random(0.035, 0.06);
    this.bobAmount = random(5, 9);
    this.bob = 0;

    this.xSpeed = random(-1.4, 1.4);
    this.ySpeed = random(-1.2, 1.2);

    this.shooting = false;
    this.shootTimer = 0;

    this.fallAngle = 0;
  }

  update() {
    if (this.alive) {
      this.bob = sin(frameCount * this.bobSpeed) * this.bobAmount;
    }

    if (this.shootTimer > 0) {
      this.shootTimer--;
    } else {
      this.shooting = false;
    }

    if (!this.alive) {
      if (this.team === "yellow" && this.fallAngle < HALF_PI) {
        this.fallAngle += 0.05;
      }

      if (this.team === "gray" && this.fallAngle > -HALF_PI) {
        this.fallAngle -= 0.05;
      }
    }
  }

  show() {
    push();

    translate(this.x, this.y + this.bob);
    rotate(this.fallAngle);

    if (this.team === "yellow") {
      this.drawYellowDuck();
    } else {
      this.drawGrayDuck();
    }

    pop();
  }

  drawYellowDuck() {
    noStroke();

    fill(255, 230, 40);
    ellipse(0, 0, 100, 65);

    triangle(-42, -8, -68, -24, -58, 8);

    ellipse(32, -28, 45, 45);

    fill(255, 140, 0);
    ellipse(55, -24, 24, 12);

    fill(0);
    ellipse(37, -33, 5, 5);

    fill(240, 210, 30);
    ellipse(-5, 0, 38, 24);

    fill(60);
    rect(2, -10, 38, 8);
    rect(35, -14, 8, 16);

    if (this.player && this.alive) {
      fill(255, 0, 0);
      triangle(22, -60, 32, -78, 42, -60);
    }

    if (this.shooting && this.alive) {
      fill(255, 220, 0);
      triangle(40, -14, 40, -2, 60, -8);
    }
  }

  drawGrayDuck() {
    noStroke();

    fill(220);
    ellipse(0, 0, 100, 65);

    triangle(42, -8, 68, -24, 58, 8);

    ellipse(-32, -28, 45, 45);

    fill(255, 100, 0);
    ellipse(-55, -24, 24, 12);

    fill(255, 0, 0);
    ellipse(-37, -33, 5, 5);

    fill(180);
    ellipse(5, 0, 38, 24);

    fill(30);
    rect(-40, -10, 38, 8);
    rect(-43, -14, 8, 16);

    if (this.shooting && this.alive) {
      fill(255, 80, 0);
      triangle(-40, -14, -40, -2, -60, -8);
    }
  }

  shoot() {
    if (!this.alive) {
      return;
    }

    this.shooting = true;
    this.shootTimer = 12;

    if (this.team === "yellow") {
      yellowBullets.push(new Bullet(this.x + 58, this.y - 10, 1, "yellow"));
    }

    if (this.team === "gray") {
      grayBullets.push(new Bullet(this.x - 58, this.y - 10, -1, "gray"));
    }
  }

  die() {
    this.alive = false;
    this.shooting = false;
  }
}

class Bullet {
  constructor(x, y, direction, team) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.team = team;
    this.speed = 7;
  }

  move() {
    this.x += this.speed * this.direction;
  }

  show() {
    noStroke();

    if (this.team === "yellow") {
      fill(30);
    } else {
      fill(120, 0, 0);
    }

    ellipse(this.x, this.y, 8, 8);
  }
}

function keyPressed() {
  if (gameState === "story" && key === " ") {
    storyStep++;

    if (storyStep > 3) {
      gameState = "countdown";
      countdown = 180;
    }
  } else if (gameState === "battle" && key === " ") {
    playerDuck.shoot();
  }

  if (key === "r" || key === "R") {
    resetGame();
    gameState = "story";
    storyStep = 0;
    countdown = 180;
  }
}