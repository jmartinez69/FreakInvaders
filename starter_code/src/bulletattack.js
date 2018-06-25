function Shoot(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.shootBoolean = false;
  this.x = 0;
  this.y = canvas.height;
  this.shootLineOffset = 10;
  this.direccion = "up";
  this.shootSpeed = -5;
}

Shoot.prototype.moveShoot = function() {
  for (var i; i < shootsArray.length; i++){
    if (this.direccion == "up") {
      this.y += this.shootSpeed;
    }
  }
}

Shoot.prototype.drawShoot = function() {
  if (this.shootBoolean) {
    this.ctx.save();
    this.ctx.strokeStile = "#FF5733";
    this.ctx.lineWidth = 1.1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(thix.x, this.y + this.shootLineOffset);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
};
