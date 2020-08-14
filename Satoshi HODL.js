var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bitcoin = new Image();
var graphBackground = new Image();
var rsiPicForeground = new Image();
var redCandle = new Image();
var greenCandle = new Image();
var background = new Image();

bitcoin.src = "Satoshi Bitcoin 2.png";
graphBackground.src = "satoshi background2.png";
rsiPicForeground.src = "Satoshi FG pic.png";
redCandle.src = "Satoshi Red Candle.png";
greenCandle.src = "Satoshi Green Candle.png";
background.src = "PurchasingPowerofUSD2013-2019.png";

// some variables

var gap = 85;
var constant;

var bX = 140   ;
var bY = 150;
var fgX = 0;
var fgY = cvs.height - rsiPicForeground.height;
var fg = rsiPicForeground;
var gravity = 1.5;

var score = 0;
var highScore = 0;
if (score > highScore) {
  score = highScore
}

// audio files
var themeMusic = new Audio();
var numberGoUp = new Audio();
var earnasatoshi = new Audio();

numberGoUp.src = "NumberGoUp  .mp3";
earnasatoshi.src = "earnasatoshi.mp3";
themeMusic.src = "themeMusic2.mp3"


// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 21;
    numberGoUp.play();
}

// candle coordinates

var candle = [];

candle[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
themeMusic.play();
    ctx.drawImage(graphBackground,0,0);


    for(var i = 0; i < candle.length; i++){

        constant = redCandle.height+gap;
        ctx.drawImage(redCandle,candle[i].x,candle[i].y);
        ctx.drawImage(greenCandle,candle[i].x,candle[i].y+constant);

        candle[i].x--;

        if( candle[i].x == 60 ){
            candle.push({
                x : cvs.width,
                y : Math.floor(Math.random()*redCandle.height)-redCandle.height
            });
        }

        // detect collision

        if( bX + bitcoin.width >= candle[i].x && bX <= candle[i].x + redCandle.width && (bY <= candle[i].y + redCandle.height || bY+bitcoin.height >= candle[i].y+constant) || bY + bitcoin.height >=  cvs.height - rsiPicForeground.height){
            location.reload(); // reload the page
        }

        if(candle[i].x == 90){
            score+=25   ;
            earnasatoshi.play();
        }


    }

    ctx.drawImage(rsiPicForeground,fgX,fgY);



    ctx.drawImage(bitcoin,bX,bY);

    bY += gravity;


    ctx.fillStyle = "orange";
    ctx.font = "30px Stencil Std, fantasy";
    ctx.fillText(score + " Sats",70,cvs.height-20);

    requestAnimationFrame(draw);

}

draw();
