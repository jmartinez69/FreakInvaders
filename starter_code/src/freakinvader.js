function OffensiveInvaders(ctx, canvas, level) {
  this.ctx=ctx;
  this.canvas=canvas;
  this.invaders = [[], [], [], [], []];
  this.invaderOvni = {};
  this.offensivesLines = 5;
  this.invadersPerLine = 10;
  this.alives = this.offensivesLines * this.invadersPerLine;
  this.shootsArray=[];
  this.level=level;

}

////////// SECCION DE METODOS PROTOTIPOS DE OFFENSIVEINVADERS ////////////

/* METODO CREATEINVADERSMATRIX: Método encargado de de crear la matriz con todos los
   atacantes alienígenas, salvo el ovni
*/
OffensiveInvaders.prototype.createInvadersMatrix = function() {
  var resolucion = this.canvas.width / this.canvas.height;
  var invader = {};
  var ovni = {};
  var offsetX = 30;
  var offsetY = offsetX / resolucion;
  var gapOvni = 60;
  for (var i = 0; i < this.offensivesLines; i++) {
    for (var j = 0; j < this.invadersPerLine; j++) {
      switch (i) {
        case 0:
          invader = new Invader("green");
          invader.image = new Image();
          invader.image.src = "images/green invader.gif";
          break;
        case 1:
          invader = new Invader("blue");
          invader.image = new Image();
          invader.image.src = "images/blue invader.gif";
          break;
        case 2:
          invader = new Invader("red");
          invader.image = new Image();
          invader.image.src = "images/red invader.gif";
          break;
        case 3:
          invader = new Invader("grey");
          invader.image = new Image();
          invader.image.src = "images/grey invader.gif";
          break;
        case 4:
          invader = new Invader("grey");
          invader.image = new Image();
          invader.image.src = "images/grey invader.gif";
          break;
      }
      invader.x = j * 2 * offsetX + offsetX;
      invader.y = i * 2 * offsetY + offsetY + gapOvni;
      invader.horizontalSpeed = this.level * invader.horizontalSpeed;
      invader.isAlive=true;
      this.invaders[i].push(invader);
    }
  }
};
/* METODO DE CREACION DE OVNI: Creación del Objeto OVNI que será
   creado por el juego cada 10 segundos
*/
OffensiveInvaders.prototype.createOvni = function() {
  var resolucion = this.canvas.width / this.canvas.height;
  var ovni = {};
  var offsetX = 30;
  var offsetY = offsetX / resolucion;
  var gapOvni = 50;
  this.invaderOvni = new Invader("ovni");
  this.invaderOvni.image = new Image();
  this.invaderOvni.image.src ="images/ovni invader.gif";
  this.invaderOvni.x = 0;
  this.invaderOvni.y = 30;
  this.invaderOvni.horizontalSpeed = 3;
  this.invaderOvni.isAlive = true;
};

/* METODO LASTVERTICALDEFENCE: Permite validar cual columna de los atacantes
   queda viva para que una vez choque contra la pared (derecha o izquierda)
   pueda bajar y cambiar de dirección a la matriz de atacantes
   Devuelve: Indices de la matriz de algún elemento que este vivo en la última
             columna
*/
OffensiveInvaders.prototype.lastVerticalDefence = function() {
  var lastVD = {};
  if (this.invaders[0][0].horizontalSpeed > 0) {
    lastVD.orientacion = "right";
    for (var j = this.invadersPerLine - 1; j >= 0; j--) {
      for (var i = 0; i < this.offensivesLines; i++) {
        if (this.invaders[i][j].isAlive) {
          lastVD.lastX = j;
          lastVD.lastY = i;
          return lastVD;
        }
      }
    }
  } else {
    lastVD.orientacion = "left";
    for (var j = 0; j < this.invadersPerLine; j++) {
      for (var i = 0; i < this.offensivesLines; i++) {
        if (this.invaders[i][j].isAlive) {
          lastVD.lastX = j;
          lastVD.lastY = i;
          return lastVD;
        }
      }
    }
  }
}; 
  OffensiveInvaders.prototype.lastHorizontalDefence = function() {
    var lastHD = {};
      for (var i = this.offensivesLines - 1; i >= 0; i--) {
        for (var j = 0; j <  this.invadersPerLine; j++) {
          if (this.invaders[i][j].isAlive) {
            lastHD.lastX = j;
            lastHD.lastY = i;
            return lastHD;
          }
        }
      }
    }

    
/* METODO INVADERSCHANGEORIENTATION: Permite cambiar el sentido de la orientación
   de los invasores cambiando el signo a la velocidad horizontal.
*/
OffensiveInvaders.prototype.invadersChangeOrientation = function (){    
  for (var i = 0; i < this.offensivesLines; i++) {
    for (var j = 0; j < this.invadersPerLine; j++) {
        this.invaders[i][j].horizontalSpeed=-(this.invaders[i][j].horizontalSpeed);
    }
  }
}

/* METODO INVADERSCHANGEORIENTATION: Realiza la labor de bajar toda la matriz de 
   atacantes una linea
*/
OffensiveInvaders.prototype.downOnelineOfDefense = function(){
  for (var i = 0; i < this.offensivesLines; i++) {
    for (var j = 0; j < this.invadersPerLine; j++) {
        this.invaders[i][j].y=this.invaders[i][j].y+this.invaders[i][j].height;
    }
  }
}   

/* METODO DRAWINDAVERS: Este método se encargá de pintar todos los invasores (tanto el ovni
 si esta vivo, como todos los elementos de la matriz de atacantes que vivan)
*/
OffensiveInvaders.prototype.drawInvaders = function() {
  if (this.invaderOvni.isAlive){
    this.ctx.drawImage(
       this.invaderOvni.image,
       this.invaderOvni.x,
       this.invaderOvni.y,
       this.invaderOvni.width,
       this.invaderOvni.height
      );
  }
  for (var i = 0; i < this.offensivesLines; i++) {
    for (var j = 0; j < this.invadersPerLine; j++) {
      if (this.invaders[i][j].isAlive){
        this.ctx.drawImage(
          this.invaders[i][j].image,
          this.invaders[i][j].x,
          this.invaders[i][j].y,
          this.invaders[i][j].width,
          this.invaders[i][j].height
        );
      }
    }
  }
};

/* METODO MOVEINVADERS: Método que permite mover las coordenadas "x" y "y" de la matriz de
   invasores. Valida el primer elemento vivo en la última columna antes de pegar con la pared
   y en caso de estar pegando, cambia la dirección y baja una linea.
*/
OffensiveInvaders.prototype.moveInvaders = function() {
  var lastVD = this.lastVerticalDefence();
  if (lastVD.orientacion == "right") {
    if (this.invaders[lastVD.lastY][lastVD.lastX].x < this.canvas.width-(this.invaders[lastVD.lastY][lastVD.lastX].width)){
      for (var i = 0; i < this.offensivesLines; i++) {
        for (var j = 0; j < this.invadersPerLine; j++) {
          this.invaders[i][j].x += this.invaders[i][j].horizontalSpeed;
        }
      }
    }
    else {
      this.invadersChangeOrientation();
      this.downOnelineOfDefense();
    }
  } else {
      if (this.invaders[lastVD.lastY][lastVD.lastX].x > 0){
        for (var i = 0; i < this.offensivesLines; i++) {
          for (var j = 0; j < this.invadersPerLine; j++) {
            this.invaders[i][j].x += this.invaders[i][j].horizontalSpeed;
        }
      }
    } else {
      this.invadersChangeOrientation();
      this.downOnelineOfDefense();        
    }
  }
};

/* METODO MOVEINVADERS: Método que permite mover las coordenadas "x" y "y" del objeto
   ovni hasta que desaparece por la pared izquierda
*/
OffensiveInvaders.prototype.moveOvni = function() {
  if (this.invaderOvni.isAlive) {
    if (this.invaderOvni.x < this.canvas.width) {
      this.invaderOvni.x += this.invaderOvni.horizontalSpeed;
    }else {
      this.invaderOvni.isAlive=false;
    }
  }
};

//ESTRUCTURA CONSTRUCTORA DE ALIENIGENAS INDIVIDUALES
function Invader(typeInvader) {
  this.type = typeInvader;
  this.image = "";
  this.isAlive = true;
  this.x = 0;
  this.y = 0;
  this.width = 40;
  this.height = 25;
  this.horizontalSpeed = 0.4;
}
