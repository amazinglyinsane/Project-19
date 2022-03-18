var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dracula, dracula_riding, dracula_sheild;
var invisibleGround;

var farmersGroup, farmer, farmer2;
var foodImage;

var score=0;

var gameOver, restart;


function preload(){

    dracula_riding= loadAnimation("dracula.png", "dracula-2.png");
    dracula_sheild= loadAnimation("dracula-3.png");

    groundImage = loadImage("castle .png");
    foodImage = loadImage("brains .png");

    farmer = loadImage("farmer-1.png");
    farmer2 = loadImage("farmer-2.png")

    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    dracula = createSprite(50,height-100,20,50);
  
    dracula.addAnimation("running", dracula_riding);
    dracula.scale = 0.5;

    gameOver = createSprite(width/2,height/2-50);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,height-80,400,10);
  invisibleGround.visible = false;

    foodGroup = new Group();
  farmersGroup = new Group();
  
  score = 0;

}

function draw() {
 
    //dracula.debug = true;
    background("castle.png");
    text("Score: "+ score, width-400,50);
    fill("red");

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        background.velocityX = -(6 + 3*score/100);
      
        if(keyDown("space") && dracula.y >= 159) {
          dracula.velocityY = -12;
        }
        if(keyDown("UP_ARROW")){
         dracula.changeAnimation(dracula_sheild);
        } 
        
        if (farmersGroup.isTouching(dracula_sheild)) {
          farmers.destroy();
        }

        dracula.velocityY = dracula.velocityY + 0.8

        if (foodGroup.isTouching(dracula)) {
          foodGroup.destroyEach();
          foodCollection=foodCollection + 5;
        }
      
        if(farmersGroup.isTouching(dracula)){
            gameState = END;
        }
        
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
      
        background.velocityX = 0;
        trex.velocityY = 0;
        farmersGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
       
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
      
    dracula.collide(invisibleGround);
    spawnFarmers();
    createFood()

   drawSprites();
   textSize(20);
  fill("red");
  text("Food Count: "+ foodCollection,width-150,30);

}

    function spawnFarmers() {
    if(frameCount % 60 === 0) {
      var farmers = createSprite(600,height-100,10,40);
      //farmers.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
    
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: farmer.addImage(farmer);
                break;
        case 2: farmer.addImage(farmer2);
                break;
        default: break;
      }
      
             
      farmers.scale = 0.5;
      farmers.lifetime = 300;
    
      farmersGroup.add(farmers);
    }
  }

  function createFood() {
    if (World.frameCount % 200 == 0) {
    var food = createSprite(Math.round(random(50, width-50),40, 10, 10));
    food.addImage(foodImg);
    food.scale=0.15;
    food.velocityX = -(6 + 3*score/100);
    food.lifetime = 200;
    foodGroup.add(food);
    }
  }

function reset(){ 
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    foodGroup.destroyEach()
    farmersGroup.destroyEach()
    
    dracula.changeAnimation("running",dracula_riding);
    
    score = 0;
}

}
