function BackgroundImage(ctx, image, canvas) {
  this.y = 0;
  this.speed = 0.2;
  this.imageback = image;

  this.move = function(){
     this.y += this.speed;
    this.y %= canvas.height;
  }
  this.drawBackground =function(){
    ctx.drawImage(this.imageback, 0, this.y);
    if (this.speed < 0) {
      ctx.drawImage(this.imageback, 0, this.y + canvas.height);
    } else {
      ctx.drawImage(this.imageback, 0, this.y - canvas.height);
    }
}
}



function FreakInvaders() {
  this.defencePoints = 0;
  this.actualLevel = 0;
  this.canvas = document.getElementById("freakinvaders");
  this.ctx = this.canvas.getContext("2d");
  this.imageback = new Image();
  this.imageback.src = "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/stars900.gif";
  this.cleanBoard();
  this.background = new BackgroundImage(this.ctx, this.imageback, this.canvas);
  that=this;
  this.defensepod = new DefensePod(this.ctx, this.canvas);
  this.freakinvaders = new OffensiveInvaders(this.ctx, this.canvas);
  this.freakinvaders.createInvadersMatrix();
  this.freakinvaders.createOvni();
  this.updateCanvas = function() {
    that.background.move();
    that.freakinvaders.moveOvni();
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.background.drawBackground();
    that.defensepod.drawDefense();
    that.freakinvaders.drawInvaders();
    requestAnimationFrame(that.updateCanvas);
  };
  console.log("llamando a update canvas");
  this.imageback.onload = this.updateCanvas;
}


FreakInvaders.prototype.cleanBoard = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};


document.getElementById("start-game-button").onclick = function() {
  newGame = new FreakInvaders();

  document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      newGame.defensepod.moveLeft();
      break;
    case 39:
      newGame.defensepod.moveRight();
      break;
    case 32:
      alert("NO APRETAR");
      break;
  }
};
  
};


