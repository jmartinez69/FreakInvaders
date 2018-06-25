function DefensePod(ctx, canvas, shootsArray) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.posX = 20;
  this.posY = 580;
  this.vidas = 3;
  this.speed = 20;
  this.anchoPod = 40;
  this.altoPod = 5;
  this.limitX = canvas.width - this.anchoPod;
  this.shootsArray = shootsArray;
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
DefensePod.prototype.shoot = function() {
  var newShoot = new Shoot(this.ctx, this.canvas);
  newShoot.x = this.posX;
  newShoot.y = this.posY + this.altoPod;
  this.shootsArray.push(newShoot);
};
DefensePod.prototype.moveShoot = function(shootsArray) {
  for (var i=0; i < shootsArray.length; i++) {
    if (shootsArray[i].direccion == "up") {
      shootsArray[i].y += shootsArray[i].shootSpeed;
    }
  }
};
DefensePod.prototype.drawShoot = function(shootsArray) {
  for (var i = 0; i < shootsArray.length; i++) {
    if (shootsArray[i].shootBoolean) {
      this.ctx.save();
      this.ctx.strokeStile = "#FF5733";
      this.ctx.lineWidth = 1.1;
      this.ctx.beginPath();
      this.ctx.moveTo(shootsArray[i].x, shootsArray[i].y);
      this.ctx.lineTo(
        shootsArray[i].x,
        shootsArray[i].y + shootsArray[i].shootLineOffset
      );
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
};


// ESTRUCTURA CONSTRUCTURA DISPAROS
function Shoot(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.shootBoolean = true;
  this.x = 0;
  this.y = canvas.height;
  this.shootLineOffset = 10;
  this.direccion = "up";
  this.shootSpeed = -5;
}


