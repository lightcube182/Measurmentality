//Version 2.0. We have some form of collision detection (space bar in correct location), but I still don't know how to
//make multiple notes appear at different times.
//I messed with ticker for a while, but couldn't get it working.
//Drew a staff across the screen and now have the notes lining up on them for our notes that exist so far.
//We need a better way to represent the notes though rather than hardcoding, so I'll probably work on that next.
//Also, added an octave variable to the create note method.

var stage;
var size = 50;
var octave = 3;
var fKey = 125;
var dKey = 125 + size*4.5;
var cKey = 125 + size*5;
var bKey = 125 + size*5.5;
var aKey = 125 + size*6;
var gKey = 125 + size*3;
var eKey = 125 + size*4;
var gClef;
var staff;
var notes = new Array();

function init(){
    var canvas = document.getElementById("myCanv");
    graphics = new createjs.Graphics();
    stage = new createjs.Stage(canvas);
    
    staff = new createjs.Shape();
    staff.graphics.beginStroke("black");
    staff.graphics.setStrokeStyle(5);
    staff.graphics.moveTo(0, 125 + size*4);
    staff.graphics.lineTo(canvas.width, 125 + size*4);
    staff.graphics.moveTo(0, 125 + size*3);
    staff.graphics.lineTo(canvas.width, 125 + size*3);
    staff.graphics.moveTo(0, 125 + size*2);
    staff.graphics.lineTo(canvas.width, 125 + size*2);
    staff.graphics.moveTo(0, 125 + size);
    staff.graphics.lineTo(canvas.width, 125 + size);
    staff.graphics.moveTo(0, 125);
    staff.graphics.lineTo(canvas.width, 125);
    stage.addChild(staff);
    
    gClef = new createjs.Bitmap("images/TrebleClef.svg.hi.png");
    gClef.regY = 298;
    gClef.scaleX = .1;
    gClef.scaleY = .1;
    stage.addChild(gClef);
    
    stage.update();
    generateNote(dKey, 3);
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    switch (charCode) {
        case 97:
            gClef.y = aKey - (octave - 3)*7*25;
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
            gClef.y = bKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 100:
            gClef.y = cKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 102:
            gClef.y = dKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 106:
            gClef.y = eKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 107:
            gClef.y = fKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 108:
            gClef.y = gKey - ((octave - 3)*7*25);
            stage.update();
            break;
        case 49:
            octave = 1;
            break;
        case 50:
            octave = 2;
            break;
        case 51:
            octave = 3;
            break;
        case 52:
            octave = 4;
            break;
        case 53:
            octave = 5;
            break;
        default:
            break;
    }
}

function generateNote(letter, oct){    
    var canvas = document.getElementById("myCanv");
    var canvasRight = canvas.width;
    var theNote = new createjs.Bitmap("images/quarter_note.svg");
    notes.push(theNote);
    theNote.regY = 750;
    theNote.scaleX = .2;
    theNote.scaleY = .2;
    theNote.x = canvasRight;
    theNote.y = letter - ((oct - 3)*7*25);
    stage.addChild(theNote);
    createjs.Ticker.setFPS(60);
    stage.update();
    createjs.Ticker.addListener(function(){
        theNote.x--;
        stage.update();
    });
    stage.update();
}
