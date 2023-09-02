// Variáveis da bolinha
let xCircle = 300;
let yCircle = 200;
let diameter = 15;
let radius = diameter / 2;

// Variáveis da velocidade da bolinha
let xCircleVelocity = 12;
let yCircleVelocity = 12;

// Variáveis da raquete 1
let xRect1 = 5;
let yRect1 = 150;
let widthRect = 7;
let heightRect = 90;

// Variáveis da raquete 2 (Possui o mesmo comprimento e largura que a raquete 1)
let xRect2 = 589;
let yRect2 = 150;

// Variável validadora da colisão da bolinha com as raquetes 1 e 2
let colide = false;

// Variáveis do placar
let scoreP1 = 0;
let scoreP2 = 0;

// Variáveis de som do jogo
let racket;
let points;
let ost;

function preload() {
  ost = loadSound("trilha.mp3");
  points = loadSound("ponto.mp3");
  racket = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  ost.loop();
}

function draw() {
  background(0);
  drawCircle();
  drawRect(xRect1, yRect1);
  drawRect(xRect2, yRect2);
  moveCircle();
  moveRectP1();
  moveRectP2();
  backgroundCollision();
  circleRectCollision(xRect1, yRect1);
  circleRectCollision(xRect2, yRect2);
  scoreboard();
  scorePoints();
}

// Função para desenhar a bolinha na tela
function drawCircle() {
  circle(xCircle, yCircle, diameter);
}

// Função para desenhar as raquetes 1 e 2
function drawRect(x, y) {
  rect(x, y, widthRect, heightRect);
}

// Função para movimentar a bolinha
function moveCircle() {
  xCircle += xCircleVelocity;
  yCircle += yCircleVelocity;
}

// Função para movimentar a raquete do P1
function moveRectP1() {
  if (keyIsDown(UP_ARROW)) {
    yRect1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRect1 += 10;
  }
  yRect1 = constrain(yRect1, 10, 300);
}

// Função para movimentar a raquete do P2
function moveRectP2() {
  if (keyIsDown(87)) {
    yRect2 -= 10;
  }
  if (keyIsDown(83)) {
    yRect2 += 10;
  }
  yRect2 = constrain(yRect2, 10, 300);
}

// Função para colidir a bolinha com a tela
function backgroundCollision() {
  if (xCircle + radius > width || xCircle - radius < 0) {
    xCircleVelocity *= -1;
  }
  if (yCircle + radius > height || yCircle - radius < 0) {
    yCircleVelocity *= -1;
  }
}

// Função para colidir a bolinha com as raquetes 1 e 2
function circleRectCollision(x, y) {
  colide = collideRectCircle(x, y, widthRect, heightRect, xCircle, yCircle, radius);
  if (colide) {
    xCircleVelocity *= -1;
  }
}

// Função para o placar
function scoreboard() {
  textAlign(CENTER);
  stroke(255);
  textSize(20);
  fill(color(123,104,238));
  rect(145, 7, 60, 24);
  rect(395, 7, 60, 24);
  fill(255);
  text(scoreP1, 175, 26);
  text(scoreP2, 425, 26);
}

// Função que conta os pontos e toca o som
function scorePoints() {
  if (xCircle > 590) {
    pointScored();
    scoreP1 += 1;
  }
  if (xCircle < 10) {
    pointScored();
    scoreP2 += 1;
  }
}

function pointScored() {
  points.play();
  xCircle = 300;
  yCircle = 200;
  xCircleVelocity = 6;
  yCircleVelocity = 6;
  
  let randomDirection = Math.random();
  
  if (randomDirection < (1/4)) {
    //Inverter somente o eixo X de velocidade da bolinha
    xCircleVelocity *= -1;
  } else if (randomDirection < (2/4)) {
    // Inverter somente o eixo Y de velocidade da bolinha
    yCircleVelocity *= -1;
  } else if (randomDirection < (3/4)) {
    // Inverter ambos eixos de velocidade da bolinha
    xCircleVelocity *= -1;
    yCircleVelocity *= -1;
  } else {
    // Continuar a trajetória (Não inverte nenhum eixo da bolinha)
    xCircleVelocity *= 1;
    yCircleVelocity *= -1;
  }
}