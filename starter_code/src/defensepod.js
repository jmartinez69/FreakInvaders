function DefensePod(ctx, canvas, game) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.posX = 20;
  this.posY = 580;
  this.vidas = 3;
  this.speed = 20;
  this.anchoPod = 40;
  this.altoPod = 5;
  this.limitX = canvas.width - this.anchoPod;
  this.shootsArray = [];
}
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

DefensePod.prototype.hitInvader = function(shoot) {
  var hit = false;
  for (var i = 0; i < game.offensivesLines; i++) {
    for (var j = 0; j < game.invadersPerLine; j++) {
      if (
        shoot.x >= game.invaders[i][j].x &&
        shoot.x <= game.invaders[i][j].x + game.invaders[i][j].width &&
        shoot.y + shoot.shootLineOffset >=
          game.invaders[i][j].y + game.invaders[i][j].height
      ) {
        game.invaders[i][j].isAlive = false;
        this.shootBoolean = false;
        hit=true;
        game.alives--;
      }
    }
  }
  return hit;
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
      if (this.shootsArray[i].y > 0 || this.hitInvader(this.shootsArray[i])) {
        this.shootsArray[i].y += this.shootsArray[i].shootSpeed;
      } else {
        this.shootsArray.splice(i, 1);
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
