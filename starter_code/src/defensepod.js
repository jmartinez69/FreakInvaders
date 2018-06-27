function DefensePod(ctx, canvas, freakinvaders) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.posX = 20;
  this.posY = 580;
  this.vidas = 3;
  this.gameOver = false;
  this.speed = 20;
  this.anchoPod = 40;
  this.altoPod = 5;
  this.limitX = canvas.width - this.anchoPod;
  this.shootsArray = [];
  this.freaks = freakinvaders;
  this.puntaje = 0;
}
// SECCION DE METODOS PROTOTIPO DE DEFENSEPOD
DefensePod.prototype.drawDefense = function() {
  this.ctx.save();
  this.ctx.fillStyle = "#1A7BC7";
  this.ctx.fillRect(this.posX, this.posY, this.anchoPod, this.altoPod);
  this.ctx.fillStyle = "#F52A06";
  this.ctx.beginPath();
  this.ctx.arc(this.posX + this.anchoPod / 2, this.posY, 10, Math.PI, 0, false);
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
};
DefensePod.prototype.moveLeft = function() {
  if (this.posX > 0) {
    this.posX -= this.speed;
  }
};
DefensePod.prototype.moveRight = function() {
  if (this.posX < this.canvas.width - this.anchoPod) {
    this.posX += this.speed;
  }
};

DefensePod.prototype.shoot = function() {
  var newShoot = new Shoot(this.ctx, this.canvas);
  newShoot.x = this.posX;
  newShoot.y = this.posY + this.altoPod;
  this.shootsArray.push(newShoot);
};

DefensePod.prototype.moveShoot = function() {
  for (var i = 0; i < this.shootsArray.length; i++) {
    if (this.shootsArray[i].direccion == "up") {
      if (this.shootsArray[i].y < 0 || this.hitInvader(this.shootsArray[i])) {
        this.shootsArray.splice(i, 1);
      } else {
        this.shootsArray[i].y += this.shootsArray[i].shootSpeed;
      }
    }
  }
};
DefensePod.prototype.drawShoot = function(shootsArray) {
  for (var i = 0; i < this.shootsArray.length; i++) {
    if (this.shootsArray[i].shootBoolean) {
      this.ctx.save();
      this.ctx.strokeStyle = "yellow";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.shootsArray[i].x, this.shootsArray[i].y);
      this.ctx.lineTo(
        this.shootsArray[i].x,
        this.shootsArray[i].y - this.shootsArray[i].shootLineOffset
      );
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
};
DefensePod.prototype.hitInvader = function(shoot) {
  var hit = false;

  if (this.freaks.invaderOvni.isAlive) {
    if (
      shoot.x < this.freaks.invaderOvni.x + this.freaks.invaderOvni.width &&
      shoot.x > this.freaks.invaderOvni.x &&
      shoot.y < this.freaks.invaderOvni.y + this.freaks.invaderOvni.height &&
      shoot.y + shoot.shootLineOffset > this.freaks.invaderOvni.y
    ) {
      this.puntaje = this.puntaje + 100;
      this.freaks.invaderOvni.isAlive = false;
      shoot.shootBoolean = false;
      hit = true;
      return hit;
    }
  }
  for (var i = 0; i < this.freaks.offensivesLines; i++) {
    for (var j = 0; j < this.freaks.invadersPerLine; j++) {
      if (this.freaks.invaders[i][j].isAlive) {
        //    CONDICION DE COLISIONES
        if (
          shoot.x <
            this.freaks.invaders[i][j].x + this.freaks.invaders[i][j].width &&
          shoot.x > this.freaks.invaders[i][j].x &&
          shoot.y <
            this.freaks.invaders[i][j].y + this.freaks.invaders[i][j].height &&
          shoot.y + shoot.shootLineOffset > this.freaks.invaders[i][j].y
        ) {
          switch (this.freaks.invaders[i][j].type) {
            case "grey":
              this.puntaje = this.puntaje + 10;
              break;
            case "red":
              this.puntaje = this.puntaje + 20;
              break;
            case "blue":
              this.puntaje = this.puntaje + 20;
              break;
            case "green":
              this.puntaje = this.puntaje + 30;
              break;
            }
              this.freaks.invaders[i][j].isAlive = false;
              shoot.shootBoolean = false;
              hit = true;
              this.freaks.alives--;
              if (this.freaks.alives == 0) {
                alert("FIN DE NIVEL");
              } 
          }
          //    FIN DE CONDICION DE COLISOINES
        }
      }
    }  
    return hit;
  };

// ESTRUCTURA CONSTRUCTURA DISPAROS INDIVIDUALES
function Shoot(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.shootBoolean = true;
  this.x = 0;
  this.y = canvas.height;
  this.shootLineOffset = 20;
  this.direccion = "up";
  this.shootSpeed = -4;
}
