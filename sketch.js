const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var corda
var chao;
var fruta
var link
var fundo
var coelhoimg
var frutaimg
var coelho
var botao
var idle
var comendo
var triste
var somcomendo
var somtriste
var somcorte
var sombalaodear
var sommusiquinha
var balao
var mutar
var corda2
var Link2
var botao2
function preload(){

  fundo= loadImage("images/background.png")
  coelhoimg= loadImage("images/rabbit1.png")
  frutaimg= loadImage("images/melon.png")
  idle= loadAnimation("images/rabbit1.png","images/rabbit2.png", "images/rabbit3.png")
 comendo= loadAnimation("images/eat.png","images/eat_2.png","images/eat_3.png","images/eat_4.png")
 triste= loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
somcomendo= loadSound("sounds/eating_sound.mp3")
somtriste= loadSound("sounds/sad.wav")
somcorte= loadSound("sounds/rope_cut.mp3")
sombalaodear= loadSound("sounds/air.wav")
sommusiquinha= loadSound("sounds/sound1.mp3")
 comendo.looping=false
 triste.looping=false
}


function setup() {
  createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = Bodies.rectangle(250, 690, 500, 20, { isStatic: true });
  World.add(world, chao);
  corda=new Rope(8,{x:250,y:30})
  corda2=new Rope(6,{x:100,y:100})
  fruta=Bodies.circle(250,300,20)
  Composite.add(corda.body,fruta)
link = new Link(corda,fruta)
Link2 = new Link(corda2,fruta)
idle.frameDelay= 20 
comendo.frameDelay= 20
triste.frameDelay= 20
coelho=createSprite(100,550)

coelho.addAnimation("coelho", idle)
coelho.addAnimation("eat", comendo)
coelho.addAnimation("sad",triste)
coelho.scale=0.3
botao=createImg("images/cut_btn.png")
botao.size(50,50)
botao.position(230,30)
botao.mouseClicked(drop)


botao2=createImg("images/cut_btn.png")
botao2.size(50,50)
botao2.position(90,100)
botao2.mouseClicked(drop2)




balao=createImg("images/balloon.png")
balao.size(150,100)
balao.position(50,300)
balao.mouseClicked(soprar)
sommusiquinha.play()
sommusiquinha.setVolume(0.2)
mutar=createImg("images/mute.png")
mutar.size(50,50)
mutar.position(10,10)
mutar.mouseClicked(mute)
}


function draw() {
  background(50);
  Engine.update(engine);

  rect(chao.position.x, chao.position.y, 500, 20);
image(fundo,250,350,500,700)

  corda.show()
  corda2.show()

  if(fruta!=null){image(frutaimg,fruta.position.x, fruta.position.y,60,60)}
  if(fruta!=null&&fruta.position.y>=500){

  coelho.changeAnimation("sad")
 somtriste.play()
 fruta=null
}

if(collision(fruta,coelho)==true){

coelho.changeAnimation("eat")
somcomendo.play()
}



drawSprites()

}
function drop(){

corda.break()
link.break()
somcorte.play()
Link=null

}
function collision(body,sprite){

if(body!=null){

var distancia=dist(body.position.x, body.position.y, sprite. position.x, sprite.position.y)

if(distancia<=80){

World.remove(world,fruta)
fruta=null
return true


}
else{

return false;

}
}



}
function soprar(){

Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.05,y:0})
sombalaodear.play()
}
function mute(){

if(sommusiquinha.isPlaying()){

sommusiquinha.stop()


}
else{

sommusiquinha.play()

}
}
function drop2() {

corda2.break()
Link2.break()
somcorte.play()
Link2=null

}

