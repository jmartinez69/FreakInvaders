function ShootOffensive(ctx, canvas, freaksShootArray, defensePod) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.shootBoolean = true;
  this.x = 0;
  this.y = canvas.height;
  this.shootLineOffset = 20;
  this.direccion = "down";
  this.shootSpeed = 4;
  this.game=game;
  this.shootsArray=freaksShootArray;
  this.defensePod=defensePod;
}


ShootOffensive.prototype.moveShootOffensive = function() {
  for (var i = 0; i < this.shootsArray.length; i++) {
    if (this.shootsArray[i].direccion == "down") {
      if (this.shootsArray[i].y > this.canvas.height || this.hitDefensePod(this.shootsArray[i])) {
        this.shootsArray.splice(i, 1);
      } else {
        this.shootsArray[i].y += this.shootsArray[i].shootSpeed;
      }
    } 
  }
};

ShootOffensive.prototype.drawShootOffensive = function() {
  for (var i = 0; i < this.shootsArray.length; i++) {
    if (this.shootsArray[i].shootBoolean) {
      this.ctx.save();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.shootsArray[i].x, this.shootsArray[i].y);
      this.ctx.lineTo(
        this.shootsArray[i].x,
        this.shootsArray[i].y + this.shootsArray[i].shootLineOffset
      );
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
};

ShootOffensive.prototype.hitDefensePod = function(shoot) {
  var hit = false;
//    CONDICION DE COLISIONES
  if (
      (shoot.x < this.defensePod.x + this.defensePod.anchoPod  &&
       shoot.x  > this.defensePod.x &&
       shoot.y < this.defensePod.y - 10 &&
       shoot.y + shoot.shootLineOffset > this.defensePod.y) 
      ) {
        shoot.shootBoolean = false;
        hit=true;
        this.defensePod.vidas--;
        if (this.vidas == 0){
          alert("GAME OVER");
        }
      }
//    FIN DE CONDICION DE COLISOINES
  return hit;
}


