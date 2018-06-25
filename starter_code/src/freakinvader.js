function OffensiveInvaders(ctx, canvas) {
  this.invaders = [[], [], [], [], []];
  this.invaderOvni = {};
  this.offensivesLines = 5;
  this.invadersPerLine = 10;
  this.alives = this.offensivesLines*this.invadersPerLine;
  this.createInvadersMatrix = function() {
    var resolucion = canvas.width/canvas.height;
    var invader = {};
    var ovni = {};
    var offsetX = 30;
    var offsetY = offsetX/resolucion;
    var gapOvni = 60;
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) {
        switch (i) {
          case 0:
            invader = new Invader("green");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/green invader.gif";
            invader.x = (j * 2 * offsetX) + offsetX;
            invader.y = (i * 2 * offsetY) + offsetY + gapOvni;
            this.invaders[i].push(invader);
            break;
          case 1:
            invader = new Invader("blue");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/blue invader.gif";
            invader.x = (j * 2 * offsetX) + offsetX;
            invader.y = (i * 2 * offsetY) + offsetY + gapOvni;
            this.invaders[i].push(invader);
            break;
          case 2:
            invader = new Invader("red");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/red invader.gif";
            invader.x = (j * 2 * offsetX) + offsetX;
            invader.y = (i * 2 * offsetY) + offsetY + gapOvni ;
            this.invaders[i].push(invader);
            break;
          case 3:
            invader = new Invader("grey");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/grey invader.gif";
            invader.x = (j * 2 * offsetX) + offsetX;
            invader.y = (i * 2 * offsetY) + offsetY + gapOvni ;
            this.invaders[i].push(invader);
            break;
          case 4:
            invader = new Invader("grey");
            invader.image = new Image();
            invader.image.src =
              "/home/jesusm/Ironhack/FreakInvaders/starter_code/images/grey invader.gif";
            invader.x = (j * 2 * offsetX) + offsetX;
            invader.y = (i * 2 * offsetY) + offsetY + gapOvni ;
            this.invaders[i].push(invader);
            break;

        }
      }
    }
  };
    this.createOvni = function(){
      var resolucion = canvas.width/canvas.height;
      var ovni = {};
      var offsetX = 30;
      var offsetY = offsetX/resolucion;
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

  this.drawInvaders = function() {
   ctx.drawImage(this.invaderOvni.image, this.invaderOvni.x,this.invaderOvni.y, this.invaderOvni.width, this.invaderOvni.height );
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) {
        ctx.drawImage(this.invaders[i][j].image, this.invaders[i][j].x,this.invaders[i][j].y, this.invaders[i][j].width, this.invaders[i][j].height )
      }
    }
  };
  this.moveInvaders = function(){
    for (var i = 0; i < this.offensivesLines; i++) {
      for (var j = 0; j < this.invadersPerLine; j++) { 
        this.invaders[i][j].x += this.invaders[i][j].horizontalSpeed;
      }
    }
  }  
  this.moveOvni = function(){
    this.invaderOvni.x += this.invaderOvni.horizontalSpeed;
  }

}


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
/*
function InvaderOvni() {
  this.type="";
  this.image="";
  this.isAlive=true;
  this.x=0;
  this.y=0;
  this.horizontalSpeed=1;
}*/
