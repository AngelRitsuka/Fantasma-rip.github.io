var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fantasma, torre, janela, grupo_Janelas, GameOver;

//imagens do jogo
var fantasma_parado, fantasma_pulando, torre_Imagem, janela_Imagem;

//sons
var som_Fundo, som_Pulo;

var parede_Direita, parede_Esquerda;

//imagens, sons, animações 
function preload()
{
    
  torre_Imagem =  loadImage("tower.png");
  fantasma_parado = loadImage("g.png")
  fantasma_pulando = loadImage("gjump.png") 


  //som de fundo
  som_Fundo = loadSound("tema.mp3");
  som_Pulo = loadSound("pulo.mp3");

  janela_Imagem = loadImage("door.png");
  GameOver = loadImage("gameover.jpg");
    
}

//configurações do game (criar tela, sprite, inicio da pontuação)
function setup() 
{
  createCanvas(600,600);

  //torre
  torre = createSprite(300,200);
  torre.addImage(torre_Imagem);
  torre.scale = 1
 
 //coisas do fantasma
  fantasma = createSprite(200,200,20,20);
  fantasma.addImage(fantasma_parado);
  fantasma.addImage(fantasma_pulando);
  fantasma.scale = 0.3;

//joao parede DA ESQ 10
parede = createSprite()


//arthur parede direita 590


//tocar o som de fundo
som_Fundo.play();
som_Fundo.setVolume(0.2); 


//criar grupo das janelas
grupo_Janelas =  new Group();

}


function draw() 
{
  background(255);


  if(gameState === PLAY)
  {

     //torre ir para baixo
  torre.velocityY = 2;
  if(torre.y > 400)
  {
    torre.y = 300;
  }  

  
  //mover para direita Joao
  if(keyDown("right"))
  {
    fantasma.x = fantasma.x + 3;
  }

  //mover para esquerda Arthur
  if(keyDown("left"))
  {
    fantasma.x = fantasma.x - 3;
  
  }

  
  //fazer o personagem pular
  if(keyDown("space"))
  {
    fantasma.velocityY = -10;
    //para tocar o som de pulo
    som_Pulo.play();
    som_Pulo.setVolume()
  }
  //gravidade
  fantasma.velocityY = fantasma.velocityY + 0.5; 

  criar(); 

  if(grupo_Janelas.isTouching(fantasma))
  {
    gameState = END;
  }

  }

  if(gameState === END)
  {
    var tela_preta = createSprite(300,300,600,600);
    tela_preta.addImage(GameOver);
    tela_preta.scale = 0.4
  
    grupo_Janelas.setVelocityYEach(0);
    torre.velocityY = 0;

    


  }
 


  


  //todo mundo aparecer
  drawSprites();


}

//função para criar as janelas

function criar()
{
  if(frameCount % 120 === 0)
  {
    //criar sprite
    janela = createSprite(100, 80);
    //adiciona imagem, aleatorio
    janela.addImage(janela_Imagem);
    grupo_Janelas.add(janela);
    janela.x = Math.round(random(100, 500));
    janela.velocityY = 5; 

  }


}