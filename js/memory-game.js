
/*This section declares global variables we'll need throughout the program:
the size of the grid, number of moves the user has made, number of image matches
found, and dynamic variables to hold the flipped images*/

let cellSize = 0;
let moves = 0;
let matches = 0;
let imageOne = null;
let imageTwo = null;

/*Change the color of the buttons when they are moused over*/
$('button').mouseover(function(){
	$(this).css('background-color','#637fa3');
});

$('button').mouseout(function(){
	$(this).css('background-color','#ffffff');
});

/*Initialize the grid when the user selects a play levele*/
$('.play-regular').click(function(){
	makeGrid(4);
	createImages(4);
});

$('.play-hard').click(function(){
	makeGrid(6);
	// createImages(6);
});

/*Replace the Play buttons with game data when the game begins*/
$('.play-button').click(function(){
	$('.play-buttons').css('display','none');
	$('.game-data').css('display','block');
	$('.reset').css('display','block');
	$('.move-counter').text('Moves: '+String(moves));
});

/*Clear the grid and bring the Play buttons back up when the user clicks the Start Over button*/
$('.reset-button').click(function(){
	$('.game-row').remove();
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
});

/*Helper functions for makeGrid: makeRows creates stacked rows (divs) of the correct height
fillRows places the correct number of cells (divs) in each row */
function makeRows(level) {
	for (i = 0; i < level; i++) {
		$('<div class = "game-row"></div>').appendTo($('.game-grid'));
	}
	$('.game-row').css('height', cellSize);
}

function fillRows(level){
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
function makeGrid(level) {
	moves = 0;
	if ($(window).width() < $(window).height()) {
		cellSize = $(window).width()*0.8*(1/(level + 0.5));
	} else {
		cellSize = $(window).height()*0.8*(1/(level + 0.5));
	}
	makeRows(level);
	fillRows(level);
}

/*Hides images after an unsuccessful match attempt*/
function hideImages(){
	$(imageOne).css('visibility','hidden');
	$(imageTwo).css('visibility','hidden');
}

/*Sets both image variables back to null after a match attempt*/
function resetImages() {
	imageOne = null;
	imageTwo = null;
}

/*Displays an image on click, and assigns the image to one of two variables
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

/*Increments the move counter after a match attempt*/
function incrementMoves() {
	moves++;
	$('.move-counter').text('Moves: ' + String(moves));;
}

/*Checks whether two flipped images match, and responds accordingly:
for a non-match, hides the images after a half-second delay and adds a move
for a match, records the images as matched using the 'alt' attribute
in all cases, sets the image variables back to null to prepare for the next click*/
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
	}
}

/*Top-level function to respond to a click; calls flipImage and checkMatch, and ends the 
game if the user has completed all matches*/
function respondToClick(cell, level) {
	if($(cell).children().first().attr('alt') === 'matched') {
		return;
	}
	flipImage($(cell));
	checkMatch();
	setTimeout(function() {
		if (matches === (level*level)/2) {
			alert('You won!');
		}
	},200);
}

/*Creates an array of the correct size depending on level
Populates the array with a whole number for each matchable image*/
function makeImageArray(level) {
	let images = [];
	let numImages = (level*level)/2;
	for (i = 0; i < 2; i++) {
		for (j = 1; j < numImages+1; j++) {
			images.push(j);
		}
	}
	return images;
}

/*Initializes source and alt attributes when an image is added to the grid*/
function initImage(image, string) {
	$(image).attr('src', string);
	$(image).attr('alt', string);
}

/*Adds images in random order to the game grid; note: assumes image files are stored in 
the "img" folder and are in the format #.png
Also adds an event listener for each grid cell to handle impage flipping and matching*/
function createImages(level) {
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







