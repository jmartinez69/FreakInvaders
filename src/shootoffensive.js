function ShootOffensive(ctx, canvas, freaksShootArray, defensePod) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.shootBoolean = true;
  this.x = 0;
  this.y = 0;
  this.shootLineOffset = 20;
  this.direccion = "down";
  this.shootSpeed = 3;
  this.shootsArray=freaksShootArray;
  this.defensePod=defensePod;
}

/////////////// SECCION DE METODOS PROTOTIPOS DE SHOOTOFFENSIVE //////////////////////////

/* METODO MOVESHOOTOFFENSIVE: Encargado de mover los disparos que han sido generados aleatoriamente
   por el juego en si, a través del arreglo de disparos
*/
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

/* METODO DRAWSHOOTOFFENSIVE: Encargado de dibujar los disparos que han sido generados aleatoriamente
   desde el juego.
*/
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

/* METODO HITDEFENSEPOD: Metodo que valida si algún disparo generado por el juego ha colisionado
   al "pod". Si es así le resta una vida. En caso que no queden vidas activa flag de GAMEOVER
*/
ShootOffensive.prototype.hitDefensePod = function(shoot) {
  var hit = false;
//    CONDICION DE COLISIONES
  if (
      (shoot.x < this.defensePod.posX + this.defensePod.anchoPod  &&
       shoot.x  > this.defensePod.posX &&
       shoot.y < this.defensePod.posY - 10 &&
       shoot.y + shoot.shootLineOffset > this.defensePod.posY) 
      ) {
        createjs.Sound.play("KillPod");
        shoot.shootBoolean = false;
        hit=true;
        this.defensePod.vidas--;
        alert("TE QUEDAN "+this.defensePod.vidas+ " VIDAS");
        if (this.defensePod.vidas == 0){
          alert("GAME OVER");
          this.defensePod.gameOver = true;
        }
      }
//    FIN DE CONDICION DE COLISIONES
  return hit;
}


