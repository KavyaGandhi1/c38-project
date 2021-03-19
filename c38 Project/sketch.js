var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameover,restart,win;
var score;
var GameState = 1
var gameover_img,restart_img,win_img;
var losea_img,lose ;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  win_img = loadImage("win.png");
  lose_img= loadImage("you-lose-neon-signs_118419-1023.jpg");
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("rectangle",0,0,40,50)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover = createSprite(300,100);
   gameover.addImage(gameover_img)
   gameover.scale = 0.5

   restart = createSprite(300,130,30,30);
   restart.addImage(restart_img)
   restart.scale = 0.3

    win= createSprite(300,150);
   win.addImage(win_img)
  score = 0;

  
  lose= createSprite(300,150);
  lose.addImage(lose_img)
 score = 0;




}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,100);

  if(GameState === 1){
    gameover.visible = false;
    restart.visible = false;
    win.visible = false;
    lose.visible = false;
    score = score + Math.round(getFrameRate()/60);
    if(trex.collide(invisibleGround)){
      if(keyDown("space")) {
        trex.velocityY = -10;
      }
    }
    
    
    trex.velocityY = trex.velocityY + 0.5

    spawnClouds();
  spawnObstacles();

  if (ground.x < 0){
    ground.x = ground.width/2;
  
  }

 
  
 
  
  if(score === 200 && GameState === 1){
    GameState = 2
  }
}
if(trex.isTouching(obstaclesGroup)){
 GameState =0
}


  if(GameState === 0){
    gameover.visible = false;
    restart.visible = false;
    win.visible = false;
    lose.visible = true;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    
  }
  
  if(GameState === 2){
    gameover.visible = false;
    restart.visible = false;
    win.visible = true;
    lose.visible = false;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.velocityY = 0;
  }
  
  
  
  
  //trex.collide(invisibleGround);
  
  camera.position.y = trex.y;

  //camera.position.x = obstaclesGroup().x;
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;

    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   // camera.position.x = obstacle.x;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
