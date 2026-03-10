function setup() {
    let canvas = createCanvas(800, 500);

    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
}

function draw() {
    drawWaterBackground();
    drawReefs();
    jelly(400, 250, 0.8, color(180, 120, 220, 180), 1);
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    drawBody();
    drawTentacles();

    // YOUR CODE GOES HERE
    // introduce additional functions
    // for parts of your creature that
    // are repeated, and call them from
    // here

    pop();
}

function drawWaterBackground() {
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(
            color(80, 170, 220),
            color(5, 20, 60),
            inter
        );
        stroke(c);
        line(0, y, width, y);
    }
}

function drawBody(col, speed) {
    push();
    noStroke();

    let breathe = map(sin(frameCount / 30 * speed), -1, 1, -5, 5);

    fill(col);
    ellipse(0, 20 + breathe, 180, 120);

    fill(255, 255, 255, 70);
    ellipse(-35, 10 + breathe, 40, 25);

    pop();
}


function drawTentacles(speed) {
    stroke(160, 100, 200, 180);
    strokeWeight(3);
    noFill();

    for (let i = -70; i <= 70; i += 20) {
        drawTentacle(i, speed);
    }
}

function drawTentacle(xOffset, speed) {
    push();
    translate(xOffset, 60);

    beginShape();

    for (let y = 0; y <= 120; y += 15) {
        let xWave = map(
            sin(frameCount / 20 * speed + y * 0.2 + xOffset),
            -1, 1,
            -10, 10
        );
        vertex(xWave, y);
    }

    endShape();
    pop();
}


function jelly(cx, cy, size, col, speed) {
    push();

    let moveX = cx + sin(frameCount / 100 * speed) * 30;
    moveX = constrain(moveX, 120, width - 120);

    let moveY = cy + sin(frameCount / 140 * speed) * 120;
    moveY = constrain(moveY, 120, height - 120);

    let d = dist(mouseX, mouseY, moveX, moveY);

    let proximity = map(d, 200, 0, 0, 1, true);
    let panic = proximity * proximity;

    if (d < 40) {
        panic = 1;
    }

    let tentacleSpeed = speed + panic * 4;
    let intensity = 1 + panic * 4;

    translate(moveX, moveY);
    scale(size);

    drawBody(col, speed);
    drawTentacles(tentacleSpeed, intensity);

    pop();
}
function drawReefs() {
    noStroke();

    fill(210, 140, 90);
    ellipse(120, height - 40, 180, 100);

    fill(230, 170, 120);
    ellipse(180, height - 50, 140, 90);

    fill(180, 120, 80);
    ellipse(width - 120, height - 30, 200, 110);

    fill(200, 150, 100);
    ellipse(width - 200, height - 50, 150, 90);
}