/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.

*/
let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);
  // ...except to adjust the dancer's name on the next line:
  dancer = new BrendanDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);


  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class BrendanDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.startX = startX;
    this.startY = startY;

    this.floatOffsetX = 0;
    this.floatOffsetY = 0;
    this.bodyTilt = 0;
    this.armSwing = 0;
    this.legSwing = 0;
  }
  update() {
    this.floatOffsetX = sin(frameCount * 0.03) * 25;
    this.floatOffsetY = cos(frameCount * 0.04) * 18;

    this.x = this.startX + this.floatOffsetX;
    this.y = this.startY + this.floatOffsetY;

    this.bodyTilt = sin(frameCount * 0.025) * 0.12;
    this.armSwing = sin(frameCount * 0.06) * 0.2;
    this.legSwing = cos(frameCount * 0.06) * 0.12;
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);


    // ******** //
    // ⬇️ draw your dancer here ⬇️

    rotate(this.bodyTilt);

    this.drawBody();
    this.drawHead();
    this.drawLegs();
    this.drawArms();

    // ⬆️ draw your dancer here ⬆️

    // ******** //
    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    //this.drawHead();
    pop();

    push();
    translate(this.x, this.y);
    // this.drawReferenceShapes()
    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }

  drawBody() {
    fill(250);
    rect(-35, -10, 70, 80, 20);
    rect(-38, 40, 75, 10, 15);
    rect(-14, 38, 25, 15, 5);
    rect(-1, 38, 15, 15, 5);
    noStroke();
    fill("#adcfe6");
    circle(-7, 45, 10);
  }
  drawHead() {
    noStroke();

    fill(245);
    ellipse(0, -30, 95, 95);

    ellipse(38, -30, 22, 38);
    ellipse(-38, -30, 22, 38);

    fill(50, 70, 95);
    ellipse(0, -25, 70, 50);

    fill(180, 210, 230, 160);
    ellipse(12, -37, 12, 8);
  }
  drawLegs() {
    push();
    translate(-12, 55);
    rotate(this.legSwing);
    fill(245);
    rect(-8, 0, 16, 35, 8);
    pop();

    push();
    translate(12, 55);
    rotate(-this.legSwing);
    fill(245);
    rect(-8, 0, 16, 35, 8);
    pop();
  }
  drawArms() {
    push();
    translate(-35, 12);
    rotate(-this.armSwing);
    fill(245);
    rect(-28, -6, 28, 12, 8);
    pop();

    push();
    translate(35, 12);
    rotate(this.armSwing);
    fill(245);
    rect(0, -6, 28, 12, 8);
    pop();
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmomize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 

*/