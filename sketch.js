var helicopterIMG, helicopterSprite, helicopterState, packageSprite,packageIMG;
var packageBody, box_Down, ground, holder1, holder2, holder3;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;
var edges, gameState;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	helicopterState = "Fly";
	gameState = "play";

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 160, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,20);
	groundSprite.shapeColor=color(255)

	var holder_options= {
		isStatic : true
	}

	holder1 = createSprite(300,600,20,70,holder_options);
	holder1.shapeColor = "red";

	holder2 = createSprite(500,600,20,70,holder_options);
	holder2.shapeColor = "red";
	
	holder3 = createSprite(400,625,200,40,holder_options);
	holder3.shapeColor = "red";

	engine = Engine.create();
	world = engine.world;

	var package_options = 
	{
		restitution:0.3,
		isStatic : true
	}

	packageBody = Bodies.circle(width/2 , 160 , 5, package_options);
	World.add(world, packageBody);
	
	var ground_options =
	{
		isStatic:true
	}

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 30, ground_options );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
//  Engine.update(engine);
  edges = createEdgeSprites();
  background(0);
 // console.log(packageBody.position.x);
  packageSprite.x = packageBody.position.x ;
  packageSprite.y = packageBody.position.y ;


  packageBody.position.x = helicopterSprite.x;

  helicopterSprite.collide(edges);

  drawSprites();
}

function keyPressed() {

	if (helicopterState === "Fly") {	
		if (keyCode===DOWN_ARROW) {
			// Look at the hints in the document and understand how to make the package body fall only on
			helicopterState = "Drop";
			helicopterSprite.velocityX = 0;
			Matter.Body.setStatic(packageBody, false);
		}
		else if (keyCode === RIGHT_ARROW) 
		{
			helicopterSprite.velocityX = 7;
		}
		else if (keyCode===LEFT_ARROW) 
		{
			helicopterSprite.velocityX = -7;
		}
	}
}

