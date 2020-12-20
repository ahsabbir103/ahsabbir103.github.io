var myGamePiece;
var cw, ch, w = 20;
var gamePaused = true;
var canvasHeight = window.outerHeight-100;
var canvasWidth = window.outerWidth-50;

function startGame() {
    Game.start();
    enimies = [];
    for (var i = 0; i < 20; i++) {
        var randX = Math.floor(Math.random() * parseInt(1000));
        if (randX <= Game.width | randX >= 0) {
            myGamePiece = new component(5, 5, "red", randX, 10);
            enimies.push(myGamePiece);
        }
    }
    player = new component(30, 30, "blue", 100, canvasHeight-100);
}

var Game = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(this.update,20);
        // player controller 
        window.addEventListener('keydown', function(e) {
            Game.keys = (Game.keys || []);
            Game.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function(e) {
            Game.keys[e.keyCode] = (e.type == "keydown");
        });
            // start touch event update
            window.addEventListener("touchmove",(e)=>{
                  var tPos = e.changedTouches[0];
                  player.x = parseInt(tPos.clientX + parseInt(player.x/2));
//                 if(Game.touchPos > player.x){ player.speedX = -5;}
//                 else if(Game.touchPos < player.x){ player.speedX = 5;}
//                 else{ 
             },false);
        
    },
    update:function() {
        Game.clear();
        for (var i = 0; i < enimies.length; i++) {
            if ((enimies[i].y + enimies[i].height) >= Game.canvas.height) {
                enimies[i].height = 10;
                var randX = Math.floor(Math.random() * parseInt(1000));
                if (randX >= 0 && randX <= Game.width) {
                    enimies[i].x = randX;
                }
                var randy = Math.floor(Math.random() * parseInt(1000));
                enimies[i].y = randy;
            } else {
                enimies[i].y += 5;
            }
            enimies[i].update();
            if(collision(player,enimies[i])){
                clearInterval(Game.interval);
            }
        } // enimies loop
        player.speedX = 0;
        player.speedY = 0;
        if (Game.keys && Game.keys[37]) { player.speedX = -5; }
        if (Game.keys && Game.keys[39]) { player.speedX = 5; }
        // if (Game.keys && Game.keys[38]) { player.speedY = -1; }
        // if (Game.keys && Game.keys[40]) { player.speedY = 1; }
        player.newPos();
        player.update();
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function collision(player, enimy){
    if (player.x < enimy.x + enimy.width &&
        player.x + player.width > enimy.x &&
        player.y < enimy.y + enimy.height &&
        player.y + player.height > enimy.y) {
         return true;
     }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function() {
        ctx = Game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}




let btn = document.getElementById("myGames");
var myGamePiece;
btn.addEventListener("click", (e) => {
    document.body.innerHTML = "";
    startGame();
});




// canvas.shadowBlur = 20;
// canvas.shadowColor = "black";
// canvas.fillStyle = "red";
// canvas.fillRect(20, 20, 100, 80);
