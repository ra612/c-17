var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var pc,pci1;
var yc,yci1;
var END =0;
var PLAY =1;
var gameState = PLAY;
var rc,rci1,rci2 
var distance=0;
var bellSound;
var pinkGroup;
var redGroup;
var yellowGroup;
var distance;
var gameOver,gameOverImage;
var bellSound,miniSound;
var rcFall;
 var mcFall;
var ycFall;
var obstacle,obstacle1Image;
var obstacle2Image;
var obstacle3Image;
var obstacleGroup;
var pcFall;
function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
pci1=loadAnimation("images/opponent1.png","images/opponent2.png");
yci1=loadAnimation("images/opponent4.png","images/opponent5.png");
rci1=loadAnimation("images/opponent7.png");
gameOverImage=loadImage("images/gameOver.png");
rcFall=loadAnimation("images/opponent9.png")
mcFall=loadAnimation("images/mainPlayer3.png")
ycFall=loadAnimation("images/opponent6.png")
pcFall=loadAnimation("images/opponent3.png")
obstacle1Image=loadImage("images/obstacle1.png")
obstacle2Image=loadImage("images/obstacle2.png")
obstacle3Image=loadImage("images/obstacle3.png")
}

function setup(){
  
createCanvas(600,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

 pinkGroup=new Group();    
redGroup=new Group();
yellowGroup=new Group();  
 obstacleGroup=new Group(); 
gameOver=createSprite(300,150);
gameOver.addImage(gameOverImage);





}

function draw() {
  background(0);
 
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
 
    var rand=Math.round(random(1,3));
  if (World.frameCount%170==0){
  if (rand==1){
  pinkCyclist();    
      }
 else if(rand==2){
   redCyclist();      
         }
 else {
   yellowCyclist();
 }
    
    
    
    
    }
 
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
 }
 
gameOver.visible=false;  
 
if (mainCyclist.isTouching(redGroup)){
    gameState = END;   
rc.addAnimation ("ccycling",rcFall);   




}  
 if (mainCyclist.isTouching(yellowGroup)){
   gameState=END;
 yc.addAnimation("bcycling",ycFall);
 }
  
 if (mainCyclist.isTouching(pinkGroup)){
     gameState=END;
    pc.addAnimation("acycling",pcFall); 
 } 
 
  
  
  

  
  
  
  
  
  
 spawnObstacles(); 
 distance= distance + Math.round(getFrameRate()/60);
 if (obstacleGroup.isTouching(mainCyclist)){
     gameState=END;
     }
  
  
  
  
  
  }
 if (gameState===END){
 gameOver.visible=true;    
 pinkGroup.setVelocityXEach(0);
 redGroup.setVelocityXEach(0)
  yellowGroup.setVelocityXEach(0) 
 path.velocityX=0;
 mainCyclist.addAnimation("SahilRunning",mcFall);
 obstacleGroup.setVelocityXEach(0);
 obstacleGroup.setLifetimeEach(-1);  
 pinkGroup.setLifetimeEach(-1);  
yellowGroup.setLifetimeEach(-1);  
 redGroup.setLifetimeEach(-1);  
 
   if(keyDown("UP_ARROW")){
 reset();
    }
 
 
 }
function reset(){
gameState=PLAY  
gameOver.visible=false;  
pinkGroup.destroyEach();
redGroup.destroyEach();
yellowGroup.destroyEach();
distance=0;

}







}

function pinkCyclist(){
  
  pc=createSprite(500,Math.round(random(50,250)),20,20);
  pc.addAnimation("acycling",pci1);
  pc.scale=0.06;
  pc.velocityX=-3;
  pc.lifetime=200;
  pinkGroup.add(pc);
}
function yellowCyclist(){
  yc=createSprite(500,Math.round(random(50,250)),20,20);
  yc.addAnimation("bcycling",yci1);
  yc.scale=0.06;
  yc.lifetime=200;
  yc.velocityX=-3; 
  yellowGroup.add(yc);
  
}
function redCyclist(){
 rc=createSprite(500,Math.round(random(50,250)),20,20);
  rc.addAnimation("ccycling",rci1);
  rc.scale=0.06;
  rc.velocityX=-3; 
  rc.lifetime=200;
  redGroup.add(rc);
 
}
function spawnObstacles(){
if (frameCount % 200 === 0){
  obstacle=createSprite(600,145,10,40)
obstacle.lifetime=200;
obstacle.scale=0.07;
obstacle.velocityX=-3;
obstacleGroup.add(obstacle);  
 
  var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;           
              default: break;
    }






}
}  