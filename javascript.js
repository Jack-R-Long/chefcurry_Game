
var myGamePiece;
var myObstacles = [];  //define as an array for multiple obstacles
var myScore;
var myBackground;


function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 100,"curry_Flex.png", 100, 320,"image");
    // myObstacles[0] = new component(80, 80, "curry_Hands.png", 10, 20, "image");
    // myBackground = new component(656, 270, "court_background.jpg", 0, 0, "image")

    myScore = new component ("30px", "Consolas", "white", 280, 40, "text")
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 975;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;                                   //var to count frames
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;  
        });
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
            myGamePiece.image.src = "curry_Flex.png"   //reset curry onkeyup
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n)% 1 == 0){return true;}
    return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image"){                  //image detector 
        this.image = new Image();
        this.image.src = color; 
    }
    
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function() {            //Draws component 
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 
        else if (type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color; 
            ctx.fillText(this.text, this.x, this.y);
        }
        else {
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitWall();
    }
    this.crashWith = function(otherobj) {           //investigate this BORROWED from W3
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
    }
    this.hitWall = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        var right_wall = myGameArea.canvas.width - this.width;   //975
        console.log(this.x)
        console.log(right_wall)
        var left_wall = myGameArea.canvas.width - this.myleft;
        if (this.y > rockbottom){
            this.y = 0;
        }
        else if ( this.y < 0){
            this.y = rockbottom;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > right_wall){
            this.x = right_wall;
        }
    }
    
} 

function updateGameArea(){
    var x, y;
    for (i=0; i < myObstacles.length; i++) {
        if (myGamePiece.crashWith(myObstacles[i])){
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameno == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        maxHeight = myGameArea.canvas.height-80;
        position = Math.floor(Math.random()*maxHeight);
        y = position;
        // y = myGameArea.canvas.height - 200;           //make 200 a rand variable
        myObstacles.push (new component(120, 120, "shaq.png", x, y, "image"));  //input img 
    }

    for (i = 0; i < myObstacles.length; i ++) {
        myObstacles[i].x -= 1;
        myObstacles[i].update();
    }
    
    myScore.text = "Chef Curry: " + myGameArea.frameNo + "    Raptors:  0";
    myScore.update();

    myGamePiece.newPos();
    myGamePiece.update();

    myGamePiece.speedX = 0;     //game piece movement 
    myGamePiece.speedY = 0;

    if(myGameArea.keys && myGameArea.keys[37])  {//left 
        myGamePiece.speedX = -5;
        myGamePiece.image.src = "curry_Dribble_back.png"

    }
    if(myGameArea.keys && myGameArea.keys[38] )  {//up
        myGamePiece.speedY = -5;
        myGamePiece.image.src = "curry_Dribble.png"

    }
    if(myGameArea.keys && myGameArea.keys[39] )  {//right
        myGamePiece.speedX = 5;
        myGamePiece.image.src = "curry_Dribble.png"
    }
    if(myGameArea.keys && myGameArea.keys[40] )  {//down
        myGamePiece.speedY = 5;
        myGamePiece.image.src = "curry_Dribble.png"

    }
        
}

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//         window.addEventListener('keydown', function(e) {
//             myGameArea.key = e.keyCode;
//         })
//         window.addEventListener('keyup', function(e) {

//             myGameArea.key = false;
//         });
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// document.onkeydown = function(e){
//     // console.log(myGameArea.key)
//     if(e.keyCode == 37)  {//left 
//        myGamePiece.speedX = -1;
//     }
//     if(e.keyCode == 38)  {//up
//         myGamePiece.speedY = -1;
//     }
//     if(e.keyCode == 39)  {//right
//         myGamePiece.speedX = 1;
//     }
//     if(e.keyCode == 40)  {//down
//         myGamePiece.speedY = 1;
//     }
//     updateGameArea();
    
// }
// document.onkeyup = function(e) {    //stop movment on key up
//     myGamePiece.speedX = 0;
//     myGamePiece.speedY = 0;
// }


