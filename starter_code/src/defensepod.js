
function DefensePod(ctx, canvas) {
  this.posX=20;
  this.posY=580;
  this.vidas=3;
  this.speed=20;
  this.anchoPod=40;
  this.altoPod=5;
  this.limitX=canvas.width-this.anchoPod;
  this.drawDefense = function(){
      ctx.save();
      ctx.fillStyle = "#1A7BC7";
      ctx.fillRect(this.posX, this.posY, this.anchoPod, this.altoPod);
      ctx.fillStyle = "#F52A06"
      ctx.beginPath();
      ctx.arc(this.posX+this.anchoPod/2, this.posY, 10, Math.PI,0, false);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
  }
  this.moveLeft = function() {
    if (this.posX > 0 ){
      this.posX-=this.speed;
    }
  }
  this.moveRight = function() {
    if (this.posX < canvas.width-this.anchoPod){
      this.posX+=this.speed;
    }
  }
}
