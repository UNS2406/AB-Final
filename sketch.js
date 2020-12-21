/* class 24-34 angrybirds
 developer: Avani 
 topics: PhysicsEngine,Inheritence,JSON,API,functions,Arrays,Push() and pop()
*/

//Declare variables for game objects and behaviour indicators(FLAGS)
//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var userEngine, userWorld;

var bird;
var pig1, pig2;
var platform, ground;
var log1, log2, log3, log4;
var box1, box2, box3, box4, box5;
var rubberBand;

var backgroundImg, bg;
var score;

var timesPlayed;
var gameState;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
    //function call to set background image based on time
    setBackgroundImg();
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
    var canvas = createCanvas(1200, 400);

    userEngine = Engine.create();
    userWorld = userEngine.world;

    score = 0;

    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    //creation of 1st layer using matter.js
    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    //creation of 2nd layer using matter.js
    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig2 = new Pig(810, 220);
    log2 = new Log(810, 180, 300, PI / 2);

    //creation of 3rd layer using matter.js
    box5 = new Box(810, 160, 70, 70);
    log3 = new Log(760, 120, 150, PI / 7);
    log4 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(200, 50);
    rubberBand = new SlingShot(bird.body, { x: 200, y: 50 });

    timesPlayed = 0;
    gameState = "onSling";


}

//All changes, conditions, manipulations, actions to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
    if (backgroundImg)
        background(backgroundImg);

    //display SCORE
    noStroke();
    textSize(35);
    fill("white");
    text("Score: " + score, width - 300, 50);

    Engine.update(userEngine);

    ground.display();
    platform.display();

    //display  of 1st layer using matter.js
    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    //display of 2nd layer using matter.js
    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log2.display();

    //display of 3rd layer using matter.js
    box5.display();
    log3.display();
    log4.display();

    bird.display();
    rubberBand.display();
    //console.log(bird);

    //function call to display smoke Image as cool effect for bird flying through canvas
    displayRunnerPoofs();

    console.log(gameState);
    if (timesPlayed == 4) {
        //display GAMEOVER
        noStroke();
        textSize(50);
        fill("white");
        text("GAME OVER", width / 2, height / 2);
    }
}


//function triggered when a mouse is clicked and dragged
function mouseDragged() {
    if (gameState == "onSling") {
        //function for bird to move with repsect to mouse
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
    }
}


//function triggered when a clicked mouse is released
function mouseReleased() {
    //function call to detach(release) a body from constraint (this.sling.bodyA)
    rubberBand.fly();
    gameState = "released";
}


//function triggered when a key on keyboard is pressed
function keyPressed() {
    if (keyCode === 32 && timesPlayed < 4) {
        //function call to attach a body to constraint (this.sling.bodyA)
        rubberBand.attach(bird.body);
        timesPlayed += 1;
    }
}


//function definition to display smoke Image as cool effect for bird flying through canvas
function displayRunnerPoofs() {
    if (bird.body.position.x > 220 && bird.body.velocity.x > 10 && slingshot.sling.bodyA == null) {
        var position = [bird.body.position.x, bird.body.position.y];
        bird.trajectory.push(position);
    }

    for (var i = 0; i < bird.trajectory.length; i++) {
        image(bird.smokeImage, bird.trajectory[i][0], bird.trajectory[i][1]);//image(preloaded variable, x, y);
    }
}

//function definition to set background image based on time
async function setBackgroundImg() {
    var response = await fetch("http://worldclockapi.com/api/json/est/now");
    var responseJSON = await response.json();

    var datetime = responseJSON.currentDateTime;
    var hour = datetime.slice(11, 13);


    if (hour >= 06 && hour < 19) {
        bg = "sprites/day.png";
    }
    else {
        bg = "sprites/night1.jpeg";
    }

    backgroundImg = loadImage(bg);

    console.log(backgroundImg);
}



/* READING MATERIAL READING MATERIAL READING MATERIAL

JSON stands for JavaScript Object Notation. JSON is a lightweight format for storing and transporting data. JSON is often used when data is sent from a server to a web page.

The slice() method returns the selected elements in an array, as a new array object. The slice() method selects the elements starting at the given start argument, and ends at, but does not include, the given end argument.

https://www.javascripttutorial.net/web-apis/javascript-translate/

https://www.javascripttutorial.net/web-apis/javascript-rotate/

READING MATERIAL READING MATERIAL READING MATERIAL */