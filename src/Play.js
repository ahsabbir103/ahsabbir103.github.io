var myGamePiece;
var cw, ch, w = 20;
var gamePaused = false;

function startGame() {
    Game.start();
    enimies = [];
    for (var i = 0; i < 10; i++) {
        var randX = Math.floor(Math.random() * parseInt(1000));
        if (randX <= Game.width | randX >= 0) {
            myGamePiece = new component(5, 5, "red", randX, 10);
            enimies.push(myGamePiece);
        }
    }
    player = new component(30, 30, "blue", 100, 700);
}

var Game = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 780;
        this.canvas.height = 870;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        if (gamePaused) return;
        this.interval = setInterval(updateGame, 20);
        // player controller 
        window.addEventListener('keydown', function(e) {
            Game.keys = (Game.keys || []);
            Game.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function(e) {
            Game.keys[e.keyCode] = (e.type == "keydown");
        });
        
            // start touch event 
            window.addEventListener("touchmove",(e)=>{
                  var tPos = e.changedTouches[0];
                  var ps = parseInt(tPos.clientX);
                  player.x = ps;
             },false);
        
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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


function updateGame() {
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
    } // enimies loop

    player.speedX = 0;
    player.speedY = 0;
    if (Game.keys && Game.keys[37]) { player.speedX = -5; }
    if (Game.keys && Game.keys[39]) { player.speedX = 5; }

    // if (Game.keys && Game.keys[38]) { player.speedY = -1; }
    // if (Game.keys && Game.keys[40]) { player.speedY = 1; }

    player.newPos();
    player.update();
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
