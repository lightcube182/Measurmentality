//Version 2.0. We have some form of collision detection (space bar in correct location), but I still don't know how to
//make multiple notes appear at different times.
//I messed with ticker for a while, but couldn't get it working.
//Drew a staff across the screen and now have the notes lining up on them for our notes that exist so far.
//We need a better way to represent the notes though rather than hardcoding, so I'll probably work on that next.
//Also, added an octave variable to the create note method.
//Added in the ability to use sixteenth notes, eigth notes, quarter notes, half notes, and whole notes!
//Also, made it easy to select note letter, value, and octave.  Programmed hot cross buns!
//Next, have to program actual gameplay.
//WOOOOOOOO, added gameplay! Though, doesn't keep track of whether or not the person is holding the space bar for the right amount of time.

var stage;
var noteXValue = 0;
var size = 50;
var octave = 3;
var fKey = 125 + size*3.5;
var dKey = 125 + size*4.5;
var cKey = 125 + size*5;
var bKey = 125 + size*5.5;
var aKey = 125 + size*6;
var gKey = 125 + size*3;
var eKey = 125 + size*4;
var gClef;
var staff;
var mLine;
var notes = new Array();
var c = 0;
var score = 0;
var misses = 0;
var scoreBoard;

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
    
    mLine = new createjs.Shape();
    staff.graphics.beginStroke("black");
    staff.graphics.setStrokeStyle(5);
    
    
    gClef = new createjs.Bitmap("images/TrebleClef.svg.hi.png");
    gClef.regY = 298;
    gClef.scaleX = .1;
    gClef.scaleY = .1;
    gClef.y = cKey;
    stage.addChild(gClef);
    
    scoreBoard = new createjs.Text();
    scoreBoard.text = "Hits: " + score + "  Misses: " + misses;
    scoreBoard.font = "20px Arial";
    scoreBoard.color = "purple";
    scoreBoard.x = 50;
    scoreBoard.y = 450;
    scoreBoard.rotation = -30;
    stage.addChild(scoreBoard);
    
    stage.update();
    generateNote("q", bKey, 4);
    generateNote("q", aKey, 4);
    generateNote("h", gKey, 3);
    generateNote("q", bKey, 4);
    generateNote("q", aKey, 4);
    generateNote("h", gKey, 3);
    generateNote("e", gKey, 3);
    generateNote("e", gKey, 3);
    generateNote("e", gKey, 3);
    generateNote("e", gKey, 3);
    generateNote("e", aKey, 4);
    generateNote("e", aKey, 4);
    generateNote("e", aKey, 4);
    generateNote("e", aKey, 4);
    generateNote("q", bKey, 4);
    generateNote("q", aKey, 4);
    generateNote("h", gKey, 3);
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
            if ((notes[c].x < gClef.x && notes[c].x > (gClef.x + gClef.width)) || notes[c].y != gClef.y)
                misses++;
            else
                score++;
            c++;
            /*var newScoreBoard = new createjs.Text();
            newScoreBoard.text = "Hits: " + score + "  Misses: " + misses;
            newScoreBoard.font = "20px Arial";
            newScoreBoard.color = "purple";
            newScoreBoard.x = 50;
            newScoreBoard.y = 450;
            newScoreBoard.rotation = -30;
            stage.addChild(newScoreBoard);*/
            stage.update();
            //stage.removeChild(newScoreBoard);
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

function generateNote(note, letter, oct) {    
    var canvas = document.getElementById("myCanv");
    var canvasRight = canvas.width;
    if (note == "s") {
        var theNote = new createjs.Bitmap("images/sixteenth_note.svg");
        theNote.regY = 740;
        theNote.scaleX = .25;
        theNote.scaleY = .25;
        theNote.x = canvasRight + noteXValue;
        noteXValue += 100;
    }
    if (note == "e") {
        var theNote = new createjs.Bitmap("images/eighth_note.svg");
        theNote.regY = 740;
        theNote.scaleX = .25;
        theNote.scaleY = .25;
        theNote.x = canvasRight + noteXValue;
        noteXValue += 200;
    } else if (note == "q") {
        var theNote = new createjs.Bitmap("images/quarter_note.svg");
        theNote.regY = 740;
        theNote.scaleX = .25;
        theNote.scaleY = .25;
        theNote.x = canvasRight + noteXValue;
        noteXValue += 400;
    } else if (note == "h") {
        var theNote = new createjs.Bitmap("images/half_note.svg");
        theNote.regY = 36.2;
        theNote.scaleX = 3.8;
        theNote.scaleY = 3.8;
        theNote.x = canvasRight + noteXValue;
        noteXValue += 800;
    } else if (note == "w") {
        var theNote = new createjs.Bitmap("images/whole_note.svg");
        theNote.regY = 3.5;
        theNote.scaleX = 6.2;
        theNote.scaleY = 6.2;
        theNote.x = canvasRight + noteXValue;
        noteXValue += 1600;
    }
    theNote.y = letter - ((oct - 3)*7*25);
    stage.addChild(theNote);
    notes.push(theNote);
    createjs.Ticker.setFPS(60);
    stage.update();
    createjs.Ticker.addListener(function() {
        scoreBoard.text = "Hits: " + score + "  Misses: " + misses;
        theNote.x-= 4;
        stage.update();
    });
    stage.update();
}
