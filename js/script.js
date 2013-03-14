//Version 2.0. We have some form of collision detection (space bar in correct location), but I still don't know how to
//make multiple notes appear at different times.
//I messed with ticker for a while, but couldn't get it working.
//Tried for a bit to add in a staff, but it's going to look so crappy
//I'm gonna scrap it and try to draw one in a bit.
//Also, added an octave variable to the create note method.

var shape;
var stage;
var SIZE = 50;
var GKEY = 0;
var FKEY = SIZE;
var EKEY = 2*SIZE;
var DKEY = 3*SIZE;
var CKEY = 4*SIZE;
var BKEY = 5*SIZE;
var AKEY = 6*SIZE;
var LOWGKEY = 7*SIZE;
var LOWFKEY = 8*SIZE;
var LOWEKEY = 9*SIZE;
var gClef;
var staff;
var notes = new Array();

function init(){
    var canvas = document.getElementById("myCanv");
    graphics = new createjs.Graphics();
    stage = new createjs.Stage(canvas);
    
    staff = new createjs.Bitmap("images/blank-staff.gif");
    staff.scaleX = 2;
    staff.scaleY = 2;
    staff.y = 250;
    stage.addChild(staff);
    
    gClef = new createjs.Bitmap("images/TrebleClef.svg.hi.png");
    gClef.scaleX = .1;
    gClef.scaleY = .1;
    stage.addChild(gClef);

    
    graphics.beginFill("black");
    graphics.drawRect(0,0,SIZE,SIZE);
    
    stage.update();
    generateNote(BKEY, 0);
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    switch (charCode) {
        case 97:
            gClef.y = AKEY;
            stage.update();
            break;
        case 32:
            for (var i = 0; i <= notes.length ; i++) {
                if (0< notes[i].x && notes[i].x < 60 && notes[i].y == gClef.y) {
                    alert("collision");
                }
            }
            //if ( 0< theNote.x && theNote.x < 60 && theNote.y == gClef.y) {
            stage.update();
            break;
        case 115:
            gClef.y = BKEY;
            stage.update();
            break;
        case 100:
            gClef.y = CKEY;
            stage.update();
            break;
        case 102:
            gClef.y = DKEY;
            stage.update();
            break;
        case 106:
            gClef.y = EKEY;
            stage.update();
            break;
        case 107:
            gClef.y = FKEY;
            stage.update();
            break;
        case 108:
            gClef.y = GKEY;
            stage.update();
            break;
        default:
            break;
    }
}
function generateNote(letter, octave){    
    var canvas = document.getElementById("myCanv");
    var canvasRight = canvas.width;
    var theNote = new createjs.Bitmap("images/quarter_note.svg");
    notes.push(theNote);
    theNote.scaleX = .05;
    theNote.scaleY = .05;
    theNote.x = canvasRight;
    theNote.y = letter + (octave * 7);
    stage.addChild(theNote);
    createjs.Ticker.setFPS(60);
    stage.update();
    createjs.Ticker.addListener(function(){
        theNote.x--;
        stage.update();
    });
    stage.update();
}
