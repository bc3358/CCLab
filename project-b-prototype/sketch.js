let yellowDucks = [];
let grayDucks = [];

let yellowBullets = [];
let grayBullets = [];

function setup() {
  createCanvas(800, 500);
  resetBattlefield();
}

function draw() {
  background(180, 220, 255);

  drawScene();
  drawManual();

  updateDucks();
  updateBullets();
}

// =====================
// RESET
// =====================

function resetBattlefield() {
  yellowDucks = [];
  grayDucks = [];
  yellowBullets = [];
  grayBullets = [];

  // yellow side
  yellowDucks.push(new Duck(120, 235, "yellow"));
  yellowDucks.push(new Duck(95, 305, "yellow"));
  yellowDucks.push(new Duck(160, 365, "yellow"));

  // gray side
  grayDucks.push(new Duck(680, 235, "gray"));
  grayDucks.push(new Duck(705, 305, "gray"));
  grayDucks.push(new Duck(640, 365, "gray"));
}

// =====================
// BACKGROUND + MANUAL
// =====================

function drawScene() {
  // sky
  background(180, 220, 255);

  // sun
  noStroke();
  fill(255, 220, 80);
  ellipse(70, 70, 70, 70);

  // water
  fill(80, 150, 230);
  rect(0, 300, width, 200);

  // simple waves
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

function drawManual() {
  fill(0);
  textAlign(LEFT, TOP);

  textSize(24);
  text("WORLD WAR DUCKS: 2026", 20, 15);

  textSize(14);
  text("Manual:", 20, 50);
  text("Click mouse = yellow ducks shoot", 20, 70);
  text("Press E = gray ducks shoot", 20, 88);
  text("One hit = duck falls over", 20, 106);
  text("Press R = reset battlefield", 20, 124);
}

// =====================
// DUCK MANAGEMENT
// =====================

function updateDucks() {
  for (let i = 0; i < yellowDucks.length; i++) {
    yellowDucks[i].update();
    yellowDucks[i].display();
  }

  for (let i = 0; i < grayDucks.length; i++) {
    grayDucks[i].update();
    grayDucks[i].display();
  }
}

// =====================
// BULLET MANAGEMENT
// =====================

function updateBullets() {
  // yellow bullets hit gray ducks
  for (let i = yellowBullets.length - 1; i >= 0; i--) {
    let b = yellowBullets[i];

    b.update();
    b.display();

    for (let j = 0; j < grayDucks.length; j++) {
      let grayDuck = grayDucks[j];

      if (grayDuck.isAlive) {
        let d = dist(b.x, b.y, grayDuck.x, grayDuck.y);

        if (d < 45) {
          grayDuck.die();
          yellowBullets.splice(i, 1);
          break;
        }
      }
    }

    if (i < yellowBullets.length && b.x > width) {
      yellowBullets.splice(i, 1);
    }
  }

  // gray bullets hit yellow ducks
  for (let i = grayBullets.length - 1; i >= 0; i--) {
    let b = grayBullets[i];

    b.update();
    b.display();

    for (let j = 0; j < yellowDucks.length; j++) {
      let yellowDuck = yellowDucks[j];

      if (yellowDuck.isAlive) {
        let d = dist(b.x, b.y, yellowDuck.x, yellowDuck.y);

        if (d < 45) {
          yellowDuck.die();
          grayBullets.splice(i, 1);
          break;
        }
      }
    }

    if (i < grayBullets.length && b.x < 0) {
      grayBullets.splice(i, 1);
    }
  }
}

// =====================
// DUCK CLASS
// =====================

class Duck {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;

    this.yOffset = 0;

    this.isAlive = true;
    this.fallAngle = 0;

    this.isShooting = false;
    this.shootTimer = 0;

    this.bobSpeed = random(0.035, 0.06);
    this.bobAmount = random(5, 9);
  }

  update() {
    if (this.isAlive) {
      this.yOffset = sin(frameCount * this.bobSpeed) * this.bobAmount;
    }

    if (this.shootTimer > 0) {
      this.shootTimer--;
    } else {
      this.isShooting = false;
    }

    // fall animation after death
    // yellow ducks fall one way, gray ducks fall the other way
    // both stop after reaching the correct angle
    if (!this.isAlive) {
      if (this.side === "yellow" && this.fallAngle < HALF_PI) {
        this.fallAngle += 0.05;
      }

      if (this.side === "gray" && this.fallAngle > -HALF_PI) {
        this.fallAngle -= 0.05;
      }
    }
  }

  display() {
    push();

    let drawY = this.y + this.yOffset;

    translate(this.x, drawY);
    rotate(this.fallAngle);

    if (this.side === "yellow") {
      this.drawYellowDuck();
    } else if (this.side === "gray") {
      this.drawGrayDuck();
    }

    pop();
  }

  drawYellowDuck() {
    // body
    noStroke();
    fill(255, 230, 40);
    ellipse(0, 0, 100, 65);

    // tail
    triangle(-42, -8, -68, -24, -58, 8);

    // head
    ellipse(32, -28, 45, 45);

    // beak
    fill(255, 140, 0);
    ellipse(55, -24, 24, 12);

    // eye
    fill(0);
    ellipse(37, -33, 5, 5);

    // wing
    fill(240, 210, 30);
    ellipse(-5, 0, 38, 24);

    // gun
    fill(60);
    rect(2, -10, 38, 8);
    rect(35, -14, 8, 16);

    // shooting flash
    if (this.isShooting && this.isAlive) {
      fill(255, 220, 0);
      triangle(40, -14, 40, -2, 60, -8);
    }
  }

  drawGrayDuck() {
    // body
    noStroke();
    fill(220);
    ellipse(0, 0, 100, 65);

    // tail
    triangle(42, -8, 68, -24, 58, 8);

    // head
    ellipse(-32, -28, 45, 45);

    // beak
    fill(255, 100, 0);
    ellipse(-55, -24, 24, 12);

    // eye
    fill(255, 0, 0);
    ellipse(-37, -33, 5, 5);

    // wing
    fill(180);
    ellipse(5, 0, 38, 24);

    // gun
    fill(30);
    rect(-40, -10, 38, 8);
    rect(-43, -14, 8, 16);

    // shooting flash
    if (this.isShooting && this.isAlive) {
      fill(255, 80, 0);
      triangle(-40, -14, -40, -2, -60, -8);
    }
  }

  shoot() {
    if (!this.isAlive) {
      return;
    }

    this.isShooting = true;
    this.shootTimer = 12;

    if (this.side === "yellow") {
      yellowBullets.push(new Bullet(this.x + 55, this.y - 10, 1, "yellow"));
    } else if (this.side === "gray") {
      grayBullets.push(new Bullet(this.x - 55, this.y - 10, -1, "gray"));
    }
  }

  die() {
    this.isAlive = false;
    this.isShooting = false;
  }
}

// =====================
// BULLET CLASS
// =====================

class Bullet {
  constructor(x, y, direction, side) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.side = side;
    this.speed = 7;
  }

  update() {
    this.x = this.x + this.speed * this.direction;
  }

  display() {
    noStroke();

    if (this.side === "yellow") {
      fill(30);
    } else {
      fill(120, 0, 0);
    }

    ellipse(this.x, this.y, 8, 8);
  }
}

// =====================
// INTERACTION
// =====================

function mousePressed() {
  let aliveYellowDucks = [];

  for (let i = 0; i < yellowDucks.length; i++) {
    if (yellowDucks[i].isAlive) {
      aliveYellowDucks.push(yellowDucks[i]);
    }
  }

  if (aliveYellowDucks.length > 0) {
    let shooter = random(aliveYellowDucks);
    shooter.shoot();
  }
}

function keyPressed() {
  if (key === "e" || key === "E") {
    let aliveGrayDucks = [];

    for (let i = 0; i < grayDucks.length; i++) {
      if (grayDucks[i].isAlive) {
        aliveGrayDucks.push(grayDucks[i]);
      }
    }

    if (aliveGrayDucks.length > 0) {
      let shooter = random(aliveGrayDucks);
      shooter.shoot();
    }
  }

  if (key === "r" || key === "R") {
    resetBattlefield();
  }
}