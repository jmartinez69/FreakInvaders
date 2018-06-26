function OffensiveInvaders(ctx, canvas) {
  this.ctx=ctx;
  this.canvas=canvas;
  this.invaders = [[], [], [], [], []];
  this.invaderOvni = {};
  this.offensivesLines = 5;
  this.invadersPerLine = 10;
  this.alives = this.offensivesLines * this.invadersPerLine;
  this.createInvadersMatrix = function() {
    var resolucion = canvas.width / canvas.height;
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
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/green invader.gif";
            break;
          case 1:
            invader = new Invader("blue");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/blue invader.gif";
            break;
          case 2:
            invader = new Invader("red");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/red invader.gif";
            break;
          case 3:
            invader = new Invader("grey");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/grey invader.gif";
            break;
          case 4:
            invader = new Invader("grey");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/grey invader.gif";
            break;
        }
        invader.x = j * 2 * offsetX + offsetX;
        invader.y = i * 2 * offsetY + offsetY + gapOvni;
        this.invaders[i].push(invader);
      }
    }
  };
  this.createOvni = function() {
    var resolucion = canvas.width / canvas.height;
    var ovni = {};
    var offsetX = 30;
    var offsetY = offsetX / resolucion;
    var gapOvni = 50;
    this.invaderOvni = new Invader("ovni");
    this.invaderOvni.image = new Image();
    this.invaderOvni.image.src =
      "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/ovni invader.gif";
    this.invaderOvni.x = 0;
    this.invaderOvni.y = 30;
    this.invaderOvni.horizontalSpeed = 4;
    this.invaderOvni.isAlive = true;
  };

  this.lastVerticalDefence = function() {
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

  this.invadersChangeOrientation = function (){    
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) {
          this.invaders[i][j].horizontalSpeed=-(this.invaders[i][j].horizontalSpeed);
      }
    }
  }

  this.downOnelineOfDefense = function(){
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) {
          this.invaders[i][j].y=this.invaders[i][j].y+this.invaders[i][j].height;
      }
    }
  }   


  this.drawInvaders = function() {
    ctx.drawImage(
      this.invaderOvni.image,
      this.invaderOvni.x,
      this.invaderOvni.y,
      this.invaderOvni.width,
      this.invaderOvni.height
    );
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) {
        if (this.invaders[i][j].isAlive){
          ctx.drawImage(
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


  this.moveInvaders = function() {
    var lastVD = this.lastVerticalDefence();
    if (lastVD.orientacion == "right") {
      if (this.invaders[lastVD.lastY][lastVD.lastX].x < canvas.width-(this.invaders[lastVD.lastY][lastVD.lastX].width)){
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

  this.moveOvni = function() {
    if (this.invaderOvni.isAlive) {
      if (this.invaderOvni.x < canvas.width) {
        this.invaderOvni.x += this.invaderOvni.horizontalSpeed;
      }
    }
  };

}

//ESTRUCTURA CONSTRUCTORA DE ALIENIGENAS INDIVIDUALES
function Invader(typeInvader) {
  this.type = typeInvader;
  this.image = "";
  this.isAlive = true;
  this.x = 0;
  this.y = 0;
  this.width = 40;
  this.height = 25;
  this.horizontalSpeed = 0.2;
}

