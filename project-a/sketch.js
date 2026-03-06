function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
}

function draw() {
    background(10, 40, 90);

    jelly(100, 120, 0.8, color(180, 120, 200, 180), 1);
    jelly(250, 250, 1.3, color(150, 100, 220, 180), 0.6);
    jelly(350, 180, 0.6, color(200, 150, 255, 180), 1.5);
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

    let moveX = cx + sin(frameCount / 60 * speed) * 30;

    let moveY = cy - (frameCount * 0.2 * speed) % height;

    translate(moveX, moveY);
    scale(size);

    drawBody(col, speed);
    drawTentacles(speed);

    pop();
}