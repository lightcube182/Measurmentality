//Version 2.0. We have some form of collision detection (space bar in correct location), but I still don't know how to
//make multiple notes appear at different times.
//I messed with ticker for a while, but couldn't get it working.
//Tried for a bit to add in a staff, but it's going to look so crappy
//I'm gonna scrap it and try to draw one in a bit.
//Also, added an octave variable to the create note method.

var stage;
var size = 50;
var gKey = 125 + size*3;
var fKey = 125;
var eKey = 125 + size*4;
var dKey = 125 + size;
var cKey = 4*size;
var bKey = 125 + size*2;
var aKey = 6*size;
var gClef;
var staff;
var notes = new Array();

function init(){
    var canvas = document.getElementById("myCanv");
    graphics = new createjs.Graphics();
    stage = new createjs.Stage(canvas);
    
    staff = new createjs.Shape();
    staff.graphics.beginStroke("black");
    staff.graphics.setStrokeStyle(10);
    staff.graphics.moveTo(0, eKey);
    staff.graphics.lineTo(canvas.width, eKey);
    staff.graphics.moveTo(0, gKey);
    staff.graphics.lineTo(canvas.width, gKey);
    staff.graphics.moveTo(0, bKey);
    staff.graphics.lineTo(canvas.width, bKey);
    staff.graphics.moveTo(0, dKey);
    staff.graphics.lineTo(canvas.width, dKey);
    staff.graphics.moveTo(0, fKey);
    staff.graphics.lineTo(canvas.width, fKey);
    stage.addChild(staff);
    
    gClef = new createjs.Bitmap("images/TrebleClef.svg.hi.png");
    gClef.regY = gClef.height;
    gClef.scaleX = .1;
    gClef.scaleY = .1;
    stage.addChild(gClef);
    
    stage.update();
    generateNote(eKey, 0);
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    switch (charCode) {
        case 97:
            gClef.y = aKey;
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
            gClef.y = bKey;
            stage.update();
            break;
        case 100:
            gClef.y = cKey;
            stage.update();
            break;
        case 102:
            gClef.y = dKey;
            stage.update();
            break;
        case 106:
            gClef.y = eKey;
            stage.update();
            break;
        case 107:
            gClef.y = fKey;
            stage.update();
            break;
        case 108:
            gClef.y = gKey;
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
    theNote.regX
    theNote.scaleX = .1;
    theNote.scaleY = .1;
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
