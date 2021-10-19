const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const drawConstraint = Matter.Constraint;


const drawBody = Helpers.drawBody;


let engine;

let rect01;
let rect02;

let quad01;
let quad05;
let quad05a;

let constraint01;
let constraint02;

let ground;
let wallleft;
let wallright;



//CODE START
function setup() {
  createCanvas(600, 600);


  // create an engine
  engine = Engine.create();


  // create rect01
  rect01 = Bodies.rectangle(225, 105, 190, 120);


  // create rect02
  rect02 = Bodies.rectangle(200, 100, 184, 100);


  quad01 = Bodies.fromVertices(0, 0, [
    {x: 100, y: 400},
    {x: 420, y: 400},
    {x: 518, y: 320},
    {x: 220, y: 320},
  ]);


  // create quad05 as first half of triangle
  quad05 = Bodies.trapezoid(100, 105, 80, 80, 1);
  // create quad05 as second half of triangle
  quad05a = Bodies.trapezoid(100, 105, 80, 80, 1);

  // World.add(engine.world, [rect01, quad01, quad05, quad05a, rect02]);
  World.add(engine.world, [quad01]);
    // World.add(engine.world, [quad05, quad05a]);

  //Tie long end of triangle together
  constraint01 = Constraint.create({
    bodyA: quad05,
    pointA: { x:0, y:-53 },
    // pointB: { x:0, y:0 },
    bodyB: quad05a,
    pointB: { x:0, y:-53 },
    stiffness: 0.04,
    damping: 0.05,
    length: 0
    });

    //Tie long end of triangle together
    constraint02 = Constraint.create({
      bodyA: quad05,
      pointA: { x:0, y:24 },
      // pointB: { x:0, y:0 },
      bodyB: quad05a,
      pointB: { x:0, y:24 },
      stiffness: 0.04,
      damping: 0.05,
      length: 0
      });
      // World.add(engine.world, [quad05, quad05a, constraint01, constraint02]);
      World.add(engine.world, [quad05, quad05a, constraint02]);


//FOR THE GROUND AND WALLS
  wallleft = Bodies.rectangle(0, 0, 10, 2000, {
    isStatic: true
  });
  wallright = Bodies.rectangle(600, 0, 10, 2000, {
    isStatic: true
  });
  ground = Bodies.rectangle(500, 600, 1000, 10, {
    isStatic: true, angle: Math.PI * 0.06

  });


  // add all of the bodies to the world
  World.add(engine.world, [wallleft, wallright, ground]);


  //MOUSE
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);


  // run the engine
  Engine.run(engine);
}


//DRAW IN THE FUNCTIONS
function draw() {
  background(255);


  fill(220);
  // drawBody(rect01);

  fill(10);
  // drawBody(rect02);

  fill('blue');
  drawBody(quad01);

  fill('red');
  drawBody(quad05);
  drawBody(quad05a);


  fill(255);
  drawBody(wallleft);
  drawBody(wallright);

  fill(0);
  drawBody(ground);
}
