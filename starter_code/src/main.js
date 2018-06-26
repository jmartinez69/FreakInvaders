function FreakInvaders() {
  this.defencePoints = 0;
  this.actualLevel = 0;
  this.canvas = document.getElementById("freakinvaders");
  this.ctx = this.canvas.getContext("2d");
  this.imageback = new Image();
  this.imageback.src = "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/stars900.gif";
  this.cleanBoard();
  this.background = new BackgroundImage(this.ctx, this.imageback, this.canvas);
  this.shootsArray =[];

  this.defensepod = new DefensePod(this.ctx, this.canvas);
  this.freakinvaders = new OffensiveInvaders(this.ctx, this.canvas);
  this.freakinvaders.createInvadersMatrix();
  this.freakinvaders.createOvni();
  that=this;
  this.updateCanvas = function() {
    that.background.move();
    that.freakinvaders.moveOvni();
    that.freakinvaders.moveInvaders();
    that.defensepod.moveShoot();
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.background.drawBackground();
    that.defensepod.drawDefense();
    that.defensepod.drawShoot();
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

function BackgroundImage(ctx, image, canvas) {
  this.y = 0;
  this.speed = 0.2;
  this.imageback = image;
  this.ctx = ctx;
  this.canvas = canvas;
  this.move = function(){
     this.y += this.speed;
    this.y %= canvas.height;
  }
}
BackgroundImage.prototype.drawBackground =function(){
  this.ctx.drawImage(this.imageback, 0, this.y);
  if (this.speed < 0) {
    this.ctx.drawImage(this.imageback, 0, this.y + this.canvas.height);
  } else {
    this.ctx.drawImage(this.imageback, 0, this.y - this.canvas.height);
  }
}


document.getElementById("start-game-button").onclick = function() {
  newGame = new FreakInvaders();

  document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      newGame.defensepod.moveLeft(newGame.ctx, newGame.canvas);
      break;
    case 39:
      newGame.defensepod.moveRight(newGame.ctx, newGame.canvas);
      break;
    case 68:
      newGame.defensepod.shoot(newGame.ctx, newGame.canvas, newGame);
      break;

            
  }
};
  
};


