function GameFreakInvaders() {
  this.defencePoints = 0;
  this.actualLevel = 1;
  this.defensePodVidas=3;
  this.canvas = document.getElementById("freakinvaders");
  this.ctx = this.canvas.getContext("2d");
  this.imageback = new Image();
  this.imageback.src = "images/stars900.gif";
  this.cleanBoard();

  // SECCION  DE CREACION DE TODOS LOS OBJETOS DEL JUEGO
  this.background = new BackgroundImage(this.ctx, this.imageback, this.canvas);
  this.freakinvaders = new OffensiveInvaders(
    this.ctx,
    this.canvas,
    this.actualLevel
  );
  this.freakinvaders.createInvadersMatrix();
  this.freakinvaders.createOvni();
  this.defensepod = new DefensePod(this.ctx, this.canvas, this.freakinvaders);
  // FIN DE SECCION DE CREACION INICIAL DE ELEMENTOS DEL JUEGO

  // SECCION DE INICIALZACION DEL AUDIO DEL TEMA DEL JUEGO (LOOP INFINITO) ///
  this.gameAudio = new Audio();
  this.gameAudio.src = 'sounds/FreakInvadersTheme.ogg';
  this.gameAudio.loop = true;

  /* SECCION DE VARIABLES: Se definen variables necesarias para la operatividad y generación
     aleatoria de elementos como los disparos */
  that = this;
  var segundos = 60;
  var numSeg = 1;
  var contador = 0;
  var contadorOvni = 0;
  this.ctx.save();
  this.updateCanvas = function() {
    
  // SECCION PARA LA CONDICION DE SALIDA O GAME OVER
   if (that.defensepod.gameOver){
      that.ctx.fillStyle = "yellow";
      that.ctx.font="100px Verdana"
      that.ctx.fillText("GAME OVER", 100, 300);
      return false;
    }
  // SECCION QUE REALIZA EL CAMBIO DE NIVEL
   if (that.freakinvaders.alives == 0) {
      that.background.speed = that.background.speed * 2;
      that.actualLevel++;
      that.defensePodVidas=that.defensepod.vidas;
      alert("NUEVO NIVEL: " + that.actualLevel);
      that.freakinvaders = new OffensiveInvaders(that.ctx,that.canvas,that.actualLevel);
      that.freakinvaders.createInvadersMatrix();
      that.freakinvaders.createOvni();
      that.defensepod = new DefensePod(that.ctx,that.canvas,that.freakinvaders);
      that.defensepod.puntaje = that.defencePoints;
      that.defensepod.vidas = that.defensePodVidas;
      numSeg = numSeg - numSeg * 0.5;
  }
   contador++;
   contadorOvni++;
   that.background.move();
   that.freakinvaders.moveOvni();

   /////// CONDICION DE SALIDA SI LOS INVASORES ATERRIZAN ////////////////
   if (that.freakinvaders.moveInvaders() === false){
    that.defensepod.gameOver=true;
   } 
   ///////////// FIN DE CONDICION DE SALIDA POR ATERRIZAJE
   that.defensepod.moveShoot();

  // SECCION QUE DISPARA LA CREACION DEL OVNI CADA 10 SEGUNDOS
   if (contadorOvni >= segundos * 10){      
     that.freakinvaders.createOvni();
     contadorOvni=0;
   }
   /* SECCION QUE CREA LOS DISPAROS ALEATORIOS: Cada cambio de nivel, numSeg vale menos lo que 
      hace que se genere en menos tiempo los disparos aleatorios */
   if (contador >= numSeg * segundos) {
      that.createRamdomOfShoots();
      contador = 0;
   }
   // SECCION QUE MUEVE LOS DISPAROS ALEATORIOS
   if (that.freakinvaders.shootsArray.length > 0) {
      that.freakinvaders.shootsArray[0].moveShootOffensive();
   }
   that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

   // SECCION QUE DIBUJA  TODOS LOS ELEMENTOS  DEL JUEGO
   that.background.drawBackground();
   that.defensepod.drawDefense();
   that.defensepod.drawShoot();
   that.freakinvaders.drawInvaders();
   if (that.freakinvaders.shootsArray.length > 0) {
      that.freakinvaders.shootsArray[0].drawShootOffensive();
   }


   // IMPRESIÓN DE TEXTO CON VIDAS, NIVEL Y PUNTAJE
   that.defencePoints = that.defensepod.puntaje;
   that.ctx.fillStyle = "white";
   that.ctx.fillText("Vidas: " + that.defensepod.vidas, 600, 30);
   that.ctx.fillText("Nivel: " + that.actualLevel, 650, 30);
   that.ctx.fillText("Puntuacion: " + that.defencePoints, 700, 30);
   requestAnimationFrame(that.updateCanvas);

  };
  this.imageback.onload = this.updateCanvas;
}
////////////// METODOS PROTOTIPOS DE GAMEFREAKINVADERS  ////////////////////

/* METODO CLEANBOARD: Encargado de limpiar el canvas
*/
GameFreakInvaders.prototype.cleanBoard = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};


/* METODO CREATERANDOMOFSHOOTS: Encargado de escoger aleatoriamente un elemento de la matriz
   que este vivo, para hacer que ese elemento dispare. Para esto se crea un elemento tipo
   ShootOffensive, una vez generado los indices del elemento de manera aleatoria.  Este
   disparo creado a partir de las coordenadas x,y de ubicacion del elemento escogido de la 
   matriz de atacantes, se dibuja desde la mitad del dibujo del atacante en cuestion.
*/
GameFreakInvaders.prototype.createRamdomOfShoots = function() {
  var line = Math.floor(Math.random() * this.freakinvaders.offensivesLines);
  var col = Math.floor(Math.random() * this.freakinvaders.invadersPerLine);
  if (this.freakinvaders.invaders[line][col].isAlive) {
    shoot = new ShootOffensive(
      this.ctx,
      this.canvas,
      this.freakinvaders.shootsArray,
      this.defensepod
    );
    shoot.shootSpeed = shoot.shootSpeed + (this.actualLevel-1);
    shoot.x =
      this.freakinvaders.invaders[line][col].x +
      this.freakinvaders.invaders[line][col].width / 2;
    shoot.y =
      this.freakinvaders.invaders[line][col].y +
      this.freakinvaders.invaders[line][col].height;
    this.freakinvaders.shootsArray.push(shoot);
  }
};

//// CONSTRUCTOR DEL BACKGROUND ///////////////
function BackgroundImage(ctx, image, canvas) {
  this.y = 0;
  this.speed = 0.2;
  this.imageback = image;
  this.ctx = ctx;
  this.canvas = canvas;
  this.move = function() {
    this.y += this.speed;
    this.y %= canvas.height;
  };
}
// METODO DRAWBACKGROUND: Dibuja el background infinito a la velocidad
BackgroundImage.prototype.drawBackground = function() {
  this.ctx.drawImage(this.imageback, 0, this.y);
  if (this.speed < 0) {
    this.ctx.drawImage(this.imageback, 0, this.y + this.canvas.height);
  } else {
    this.ctx.drawImage(this.imageback, 0, this.y - this.canvas.height);
  }
};

// VARIABLE GLOBAL QUE LLEVA LOS CÓDIGOS ASCII DE LAS TECLAS DEL JUEGO ////
var keyCodes = {
  moverDerecha: 39,
  moverIzquierda: 37,
  teclaD: 68
}
// INICIALIZACION DE SONIDOS /////////////////////////////////////
var audioPath = "sounds";
var sounds = [
    {id:"Defense", src:"defenseShoot.ogg"},
    {id:"KillInvader", src:"invaderKill.ogg"},
    {id:"KillOvni", src:"ovniKill.ogg"},
    {id:"KillPod", src:"podKill.ogg"},
    {id:"FItheme", src:"FreakInvadersTheme.ogg"}
];
for (var i=0; i < sounds.length; i++){
   registerPath=audioPath+"/"+sounds[i].src;
   console.log(registerPath+ " "+sounds[i].id);
   createjs.Sound.registerSound(registerPath, sounds[i].id);
}

// SECCION DE COMIENZO DEL JUEGO Y CAPTURA DE TECLAS
document.getElementById("start-game-button").onclick = function() {

  newGame = new GameFreakInvaders();
  newGame.gameAudio.play();
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case keyCodes.moverIzquierda: newGame.defensepod.moveLeft();
                                    break;
      case keyCodes.moverDerecha:   newGame.defensepod.moveRight();
                                    break;
      case keyCodes.teclaD:         createjs.Sound.play("Defense");
                                    newGame.defensepod.shoot();
                                    break;
    }
  };
};
