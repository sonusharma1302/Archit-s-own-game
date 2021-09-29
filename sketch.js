var gameState;
var home = 0;
var play = 1;
var LoseEnd =2;
var WinEnd = 3;

var back12;
var player , playerImg;
var climber, climberImg;
var enemy , enemyImg;
var climberGroup , enemyGroup;
var rest , restImg ; 
var lives , livesImg
var livesScore = 1;
var LiSc , LiscImg;
var overS , punchS;
var game , gameImg;
var score = 0 ; 
var scoreImg , scoree;
var QuizBtn , QuizBtnImg
var quiz1 , quiz1Img;
var btnGroup , restGroup;
var one , two , three , four;
var Img
var oneS , wrongS , WinS



var play; 
function preload(){
  playImg= loadImage("images/play.png")
  backImg = loadImage("images/home.jpg")
  back1Img = loadImage("images/back-1.png")
  back2Img = loadImage("images/tower.png")
  climberImg = loadImage("images/climber.png")
  restImg = loadImage("images/gameOver.png")
  livesImg = loadImage("images/lives.png")
  LiscImg = loadImage("images/heart.png")
  overS = loadSound("over.wav")
  punchS = loadSound("punch.wav")
  scoreImg = loadImage("images/score.png")
  gameImg = loadImage("images/game.png")
  QuizBtnImg = loadImage("images/quiz.png")
  quiz1Img = loadImage("images/quiz1.jpg");
  Img = loadImage("images/checkBox.png");
  playerImg = loadImage("images/player.png")
  enemyImg = loadImage("images/enemy.png")
  oneS = loadSound("one.wav")
  WinS = loadSound("write.wav")
  wrongS = loadSound("wrong.wav")
}
function setup() {

  createCanvas(windowWidth,windowHeight);
 play = createSprite(windowWidth/2-400, windowHeight/2-100, 50, 50);
 play.addImage(playImg);
 play.scale = 0.5;
 
 back12 = createSprite(windowWidth/2 , windowHeight/2-200 , windowWidth , windowHeight);
 back12.addImage(back1Img);
 back12.scale = 0.3
 back12.visible = false;

 player = createSprite(windowWidth/2 , windowHeight-300, 30 , 70);
//  player.shapeColor = "red";
 player.visible = false;
 player.addImage(playerImg)
 player.scale = 0.2 

 lives = createSprite(100 , 130 , 40 ,40);
 lives.addImage(livesImg);
 lives.scale = 0.7;
 lives.visible = false;

 LiSc = createSprite(250 , 50 , 40 ,40);
 LiSc.addImage(LiscImg);
 LiSc.scale = 0.3;
 LiSc.visible = false;

 scoree = createSprite(1100 , 100 , 30 ,  30)
 scoree.addImage(scoreImg);
 scoree.scale = 0.5
 scoree.visible = false;

 game = createSprite(100 , 70 , 40 , 40)
 game.addImage(gameImg)
 game.visible = false;
 game.scale = 0.8

 quiz1 = createSprite(windowWidth/2 , windowHeight/2 , windowWidth , windowHeight)
 quiz1.addImage(quiz1Img)
 quiz1.visible = false;

 one = createSprite(596 , 391 , 50 ,50)
 one.addImage(Img) ;
 one.scale= 0.2
 one.visible = false;

 two = createSprite(1270 , 391 , 50 ,50)
 two.addImage(Img) ;
 two.scale= 0.2;
 two.visible = false

 three = createSprite(616 , 551 , 50 ,50)
 three.addImage(Img) ;
 three.scale= 0.2
 three.visible = false

 four = createSprite(1280 , 551 , 50 ,50)
 four.addImage(Img) ;
 four.scale= 0.2
 four.visible = false

 climberGroup = new Group();
 enemyGroup = new Group();
 btnGroup = new Group();
 restGroup = new Group();
}

function draw() {
  background(backImg);  
 
  

  

  if(mousePressedOver(play)){
    gameState = 1;
    console.log("1")
    play.visible = false;
    back12.visible = true;
    player.visible = true;
    oneS.play()
   
  }
  if(gameState===1){
    background(back2Img)
    SpawnClimber();
    lives.visible = true;
    LiSc.visible = true;
    strokeWeight(4)
    stroke(30 , 60 , 70)
    textSize(35)
    fill(255 , 0 ,0 )
    textFont("arial")
    text(score , 1170 , 110);
    scoree.visible = true;
    game.visible = true

  }
  if(gameState === 2){
    background(back2Img);
    back12.destroy();
    enemyGroup.destroyEach();
    lives.destroy();
    LiSc.destroy();
    fill(0 , 70 , 70)
    textSize(24);
    text("You Want to score more points than play a quiz to score 100 points." , windowWidth/2-400 , windowHeight/2+100)
    restart()
    quiz()
    game.visible=false;
    scoree.visible = false;
  }
  // player.y = canvas.height/2;
  // player.x = canvas.width/2;

  // camera.position.y = displayHeight/2;

  if(keyDown(UP_ARROW)){
    player.y = player.y-10;
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player.y+10;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x = player.x+10;
  }
  if(keyDown(LEFT_ARROW)){
    player.x = player.x-10;
  }


  if(player.y < 0){
    player.y = windowHeight-30;
  }
  if(player.y > 620){
    player.y = 50
  }

  if(player.x<145){
    player.x = 1080;
  }
  if(player.x> 1099){
    player.x = 160;
  }
  

  if(back12.y=== 600){
    back12 = windowHeight/2
  }
   
  // if(player.x === windowWidth/2+200){
  //   player.x = windowWidth/2-140
  // }

  if(player.isTouching(climberGroup)){
    gameState = 2;
    player.destroy()
    climberGroup.destroyEach()
    overS.play()
  }
  if(player.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    punchS.play();
    score = score+10;
  }

  // if(livesScore === 1){

  // }

   if(gameState === 3){
    // quiz1.visible = true;
    btnGroup.destroyEach()
    restGroup.destroyEach()
    game.visible = false ; 
    scoree.visible = false;
    background(quiz1Img)

    four.visible = true
    three.visible = true
    two.visible = true
    one.visible = true

    if (mousePressedOver(one)){
      alert("wrong answer , try again")
      wrongS.play()
    }
    if (mousePressedOver(three)){
      alert("wrong answer , try again")
      wrongS.play()
    }
    if (mousePressedOver(four)){
      alert("wrong answer , try again")
      wrongS.play()
    }
    if (mousePressedOver(two)){
      alert("Congratulation , you are  a true patriotic")
      WinS.play()
    }

   } 

 if( mousePressedOver(QuizBtn)){
     
     gameState = 3 ;
  }



  drawSprites();
}
// function mousePressed(){
//   if(mousePressed)
// }
function SpawnClimber(){
  if(frameCount%120 === 0){

    climber = createSprite(Math.round(random(windowWidth/2-140 , windowWidth/2+200)), windowHeight-windowHeight-10 , 50 , 20)
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climberGroup.add(climber)
    enemy = createSprite(climber.x , climber.y-30 , 20 , 50)
    enemy.addImage(enemyImg)
    enemy.scale = 0.3
    enemy.velocityY = 3;
    enemyGroup.add(enemy)
   }
}

function restart(){
  if(gameState === 2){
   rest = createSprite(windowWidth/2 , windowHeight/2 , 40 ,40)
   rest.addImage(restImg)
   restGroup.add(rest)
  }
}
function quiz() {
  if(gameState === 2){
    QuizBtn = createSprite(windowWidth/2 , windowHeight/2 + 200 , 30 ,30)
    QuizBtn.addImage(QuizBtnImg)
    btnGroup.add(QuizBtn)
  }
  
}
