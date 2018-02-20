
/*Initialize the global variables we'll need throughout the program: game level selected by the user, number of moves made, 
number of image matches found, dynamic variables to hold the flipped images, and game timer*/

let level = 0;
let moves = 0;
let matches = 0;
let minutes = 0;
let seconds = 0;
let score = 3;
let imageOne = null;
let imageTwo = null;
let timer = null;

/*Event listeners: Change the color of the buttons when they are moused over*/
$('button').mouseover(function(){
	$(this).css('background-color','#637fa3');
});

$('button').mouseout(function(){
	$(this).css('background-color','#ffffff');
});

/*Helper function to update the timer*/
function updateTime() {
	if (minutes < 10) {
		$('.minutes').text("0"+String(minutes));
	} else {
		$('.minutes').text(String(minutes));
	}
	if (seconds < 10) {
		$('.seconds').text("0"+String(seconds));
	} else {
		$('.seconds').text(String(seconds));
	}
}

/*Event listeners: Initialize the grid and start the timer when the user selects a play level*/
$('.play-regular').click(function(){
	level = 4;
	makeGrid();
	createImages();
	timer = setInterval(function(){
		seconds++;
		if (seconds === 60){
			minutes++;
			seconds = 0;
		}
		updateTime();
	},1000);
});

$('.play-hard').click(function(){
	level = 6;
	makeGrid(6);
	// createImages(6);
	timer = setInterval(function(){
		seconds++;
		if (seconds === 60){
			minutes++;
			seconds = 0;
		}
		updateTime();
	},1000);
});

/*Event listener: Replaces the Play buttons with game data when the game begins*/
$('.play-button').click(function(){
	$('.play-buttons').css('display','none');
	$('.game-data').css('display','block');
	$('.reset').css('display','block');
	$('.move-counter').text('0');
});

/*clearGame helper: Resets the game timer, move count, match count, and score*/
function resetData() {
	moves = 0;
	matches = 0;
	minutes = 0;
	seconds = 0;
	score = 3;
	$('.star').html('&starf;')
	clearInterval(timer);
	updateTime();
}

/*clearGame and respondToclick helper: Sets both image variables back to null*/
function resetImages() {
	imageOne = null;
	imageTwo = null;
}

/*Clears the grid and game data, and brings the Play buttons back up*/
function clearGame() {
	$('.game-row').remove();
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
	resetImages();
	resetData();
}

/*Event listener: Clears the grid when the user clicks the Start Over button*/
$('.reset-button').click(function(){
	clearGame();
});

/*makeGrid helpers: makeRows creates stacked rows (divs) of the correct height
fillRows places the correct number of cells (divs) in each row */
function makeRows(cellSize) {
	for (i = 0; i < level; i++) {
		$('<div class = "game-row"></div>').appendTo($('.game-grid'));
	}
	$('.game-row').css('height', cellSize);
}

function fillRows(cellSize){
	var rows = $('.game-row').get();
	for (i = 0; i < rows.length; i++){
		var thisRow = rows[i];
		for (j = 0; j < level; j++) {
			$('<div class = "game-cell"></div>').appendTo(thisRow);	
		}
	}
	$('.game-cell').css('width', cellSize);
	$('.game-cell').css('height', cellSize);
}

/*Builds a grid of the desired size for regular or hard plan, making 
use of the helper functions makeRows and fillRows, defined above*/
function makeGrid() {
	console.log(level);
	let cellSize = 0;
	if ($(window).width() < $(window).height()) {
		cellSize = $(window).width()*0.8*(1/(level + 0.5));
	} else {
		cellSize = $(window).height()*0.8*(1/(level + 0.5));
	}
	makeRows(cellSize);
	fillRows(cellSize);
}

/*respondToClick helper: Hides images after an unsuccessful match attempt*/
function hideImages(){
	$(imageOne).css('visibility','hidden');
	$(imageTwo).css('visibility','hidden');
}

/*respondToClick helper: Displays an image on click, and assigns the image to one of two variables
in preparation for checking for a match*/
function flipImage(cell) {
	if (imageOne == null) {
		imageOne = $(cell).children().first();
		$(imageOne).css('visibility','visible');
	} else if (imageTwo == null) {
		imageTwo = $(cell).children().first();
		$(imageTwo).css('visibility','visible');
	}
}

/*incrementMoves helper: Determines move thresholds and removes a star at each threshold*/

function updateScore(){
	if (moves > (level*level)) {
		$('.starThree').html('&star;');
		score = 2;
	}
	if (moves > (level*(level+2))){
		$('.starTwo').html('&star;');
		score = 1;
	}
}

/*respondToClick helper: Increments the move counter after a match attempt, and updates the star score
if the user has crossed a move threshold*/
function incrementMoves() {
	moves++;
	$('.move-counter').text(moves);
	updateScore();
}

/*respondToClick helper: Checks whether two flipped images match, and responds accordingly: for a non-match, 
hides the images after a half-second delay and adds a move; for a match, records the images as matched using 
the 'alt' attribute; in all cases, sets the image variables back to null to prepare for the next click*/
function checkMatch() {
	if (imageTwo != null && imageOne.attr('src') != imageTwo.attr('src')) {
		setTimeout(hideImages,500);
		setTimeout(resetImages,600);
		setTimeout(incrementMoves,600);
	} else if (imageTwo != null && imageOne.attr('src') === imageTwo.attr('src')) {
		matches++;
		$(imageOne).attr('alt','matched');
		$(imageTwo).attr('alt','matched');
		setTimeout(resetImages,100);
		setTimeout(incrementMoves,100);
	}
}

/*Responds to a click: calls flipImage and checkMatch, and ends the game if the user has completed all matches*/
function respondToClick(cell) {
	if($(cell).children().first().attr('alt') === 'matched') {
		return;
	}
	flipImage($(cell));
	checkMatch();
	setTimeout(function() {
		if (matches === (level*level)/2) {
			clearInterval(timer);
			declareWin();
		}
	}, 200);
}

/*declareWin helper: Populates the win modal with the correct time, moves, and score*/
function buildWinPopup(){
	$('.win-popup').css('display','block');
	$('.move-score').text(moves);
	$('.minutes-score').text(minutes);
	$('.seconds-score').text(seconds);
}

/*Handles modal popup behavior when the user wins the game*/
function declareWin() {
	buildWinPopup();
	$('.win-popup').dialog({
 		modal: true,
 		classes: {
 			"ui-dialog-titlebar": "win-popup-titlebar"
 		},
 		buttons: [
    		{
    			text: "Play Again",
    			css: {
    				"font-size": "14px",
    				"font-weight": "bold",
    				"border-radius": "0",
    			},
    			click: function() {
    				clearGame();
    				$( this ).dialog( "close" );
    			}
    		},
    		{
      			text: "Close",
      			css: {
    				"font-size": "14px",
    				"border-radius": "0",
    			},
     			click: function() {
        			$( this ).dialog( "close" );
      			}
    		}
  		],
	});
}

/*createImages helper: Creates and populates an array of image files*/
function makeImageArray() {
	let images = [];
	let numImages = (level*level)/2;
	for (i = 0; i < 2; i++) {
		for (j = 1; j < numImages+1; j++) {
			images.push(j);
		}
	}
	return images;
}

/*createImages helper: Initializes source and alt attributes when an image is added to the grid*/
function initImage(image, string) {
	$(image).attr('src', string);
	$(image).attr('alt', string);
}

/*Adds images in random order to the grid and adds an event listener for each grid cell to handle impage flipping and matching 
Note: createImages assumes image files are stored in the "img" folder and are in the format #.png*/

function createImages() {
	let images = makeImageArray(level);
	let cells = $('.game-cell').get();
	images.sort(function(a, b){return 0.5 - Math.random()});
	for (i = 0; i < cells.length; i++) {
		$('<img class = "game-image" src = "" alt = "">').appendTo(cells[i]);
		let thisImage = $(cells[i]).children().first();
		initImage(thisImage, "img/"+String(images[i])+".png");
	}
	$('.game-cell').click(function(){
		respondToClick($(this), level);
	});
}







