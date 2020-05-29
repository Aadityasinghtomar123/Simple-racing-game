var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var track, runner1_img, runner2_img, runner3_img, runner4_img, hurdle, invisibleGround1, invisibleGround2;

function preload() {
    
    track = loadImage("../track.jpg");
    runner1_img = loadImage("bike1.png");
    runner2_img = loadImage("bike2.png");
    runner3_img = loadImage("bike3.png");
    runner4_img = loadImage("bike4.png");


    
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw(){
    if(playerCount === 4){
      game.update(1);
    }
    if(gameState === 1){
      clear();
      game.play();
    }
    if(gameState === 2){
      game.end();
    }
  }
  