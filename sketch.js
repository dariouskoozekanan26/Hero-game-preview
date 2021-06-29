var player
var playerRightImage
var playerLeftImage
var playerJumpImage
var playerAttackImage
var backgroundImage
var secondBackgroundImage
var ground
var door
var doorImage
var groundImage
var obstacle
var laser
var obstacleGroup
var laserGroup
var gameState="start"
var distance=0
var lifetime= 0
var score=0
var goldCoin
var coinGroup
function preload(){
playerRightImage= loadAnimation("sprite1.png","sprite2.png","sprite3.png","sprite4.png","sprite5.png","sprite6.png","sprite7.png","sprite8.png")
playerLeftImage= loadAnimation("sprite1-left.png","sprite2-left.png","sprite3-left.png","sprite4-left.png")
playerJumpImage= loadAnimation("sprite9.png","sprite10.png","sprite11.png","sprite12.png","sprite13.png","sprite14.png","sprite15.png")
backgroundImage=loadImage("background.png")
secondBackgroundImage= loadImage("aboveground.jpg")
groundImage= loadImage("ground1.png")
obstacleImage= loadImage("obstacle.png")
laserImage= loadImage("laser.png")
coinImage= loadImage("gold-coin.png")
doorImage= loadImage("door.png")
}


function setup() {
  createCanvas(1200,600);
  player= createSprite(200,200,50,50)
  player.addAnimation("running",playerRightImage)
  
  player.scale=1.5
  ground= createSprite(600,590,1220,20)
  
  obstacleGroup= new Group();
  laserGroup= new Group();
  coinGroup= new Group();  
  ground.visible=false

}

function draw() {
  background(backgroundImage);  
  player.collide(ground)

  
  if(gameState==="start"){
if(keyDown(RIGHT_ARROW)){
player.x= player.x +2
player.changeAnimation("running",playerRightImage)
  }
 else if(keyDown(LEFT_ARROW)){
    player.x= player.x-2
    player.changeAnimation("running",playerLeftImage)
  }
  if(keyDown("space")){
    player.velocityY= -12
    player.changeAnimation("running",playerJumpImage)
    


  }
  if(score===20){
door= createSprite(1130,500,50,50)
door.scale=0.4
door.addImage(doorImage)

  }
  player.velocityY= player.velocityY+0.8
  distance= distance+ Math.round(getFrameRate()/60)
for(var i=0;i<coinGroup.length;i++){
  if(player.isTouching(coinGroup)){
    score=score+5
    coinGroup.get(i).destroy()
    }
}

    
  
  
 
 
  
  spawnIceCubes();
  spawnLasers();
  spawnCoins();
  if(player.isTouching(door)){
    gameState="2ndlevel"

  }

  if(player.isTouching(obstacleGroup)||player.isTouching(laserGroup)){
gameState="end"
 }

  }
  if(gameState==="2ndlevel"){
background(secondBackgroundImage)
    if(keyDown(RIGHT_ARROW)){
      player.x= player.x +2
      player.changeAnimation("running",playerRightImage)
        }
       else if(keyDown(LEFT_ARROW)){
          player.x= player.x-2
          player.changeAnimation("running",playerLeftImage)
        }
        if(keyDown("space")){
          player.velocityY= -12
          player.changeAnimation("running",playerJumpImage)
          

  }
}
  //if(gameState==="end"){
  


  
  
  

  drawSprites();
  textSize(30)
  fill("white")
  text("Score:"+score,850,70)
  text("Distance Traveled:"+distance,850,40)

  
}
function spawnIceCubes(){
  if(frameCount%240===0){
     obstacle= createSprite(600,540,50,50)
    obstacle.velocityX=-4
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.6
    obstacleGroup.add(obstacle)

  }
  


}
function spawnLasers(){
if(frameCount%350===0){
   laser= createSprite(1000,540,50,50)
  laser.velocityX=-4
  laser.addImage(laserImage)
  laser.scale=0.3
  laserGroup.add(laser)

}
}
function spawnCoins(){
if(frameCount%150===0){
  goldCoin= createSprite(1200,470,50,50)
  goldCoin.y= random(350,400)
  goldCoin. velocityX=-4
  goldCoin.addImage(coinImage)
  goldCoin.scale=0.1
  coinGroup.add(goldCoin)

}


}



