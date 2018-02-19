let cellSize = 0;
let moves = 0;
let matches = 0;
let imageOne = null;
let imageTwo = null;

/*Changes the color of the buttons when they are moused over; 
this helps make it clear that these are clickable elements) */

$('button').mouseover(function(){
	$(this).css('background-color','#637fa3');
});

$('button').mouseout(function(){
	$(this).css('background-color','#ffffff');
});

//Replace the Play buttons with game data when the user starts the game

$('.play-button').click(function(){
	$('.play-buttons').css('display','none');
	$('.game-data').css('display','block');
	$('.reset').css('display','block');
	$('.move-counter').text('Moves: '+String(moves));
});

/*Helper functions for makeGrid
makeRows creates stacked rows (divs) of the correct height
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
	if ($(window).width() < $(window).height()) {
		cellSize = $(window).width()*0.8*(1/(level + 0.5));
	} else {
		cellSize = $(window).height()*0.8*(1/(level + 0.5));
	}
	makeRows(level);
	fillRows(level);
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

function initImage(image, string) {
	$(image).attr('src', string);
	$(image).attr('alt', string);
	$(image).css('width',cellSize*0.95);
}

/*Adds images in random order to the game grid
Note: assumes image files are stored in the "img" folder
and are in the format #.png*/

function incrementMoves() {
	moves++;
	$('.move-counter').text('Moves: ' + String(moves));;
}

function hideImages(){
	$(imageOne).css('visibility','hidden');
	$(imageTwo).css('visibility','hidden');
}

function resetImages() {
	imageOne = null;
	imageTwo = null;
}

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
		if($(this).children().first().attr('alt') === 'matched') {
			return;
		}
		if (imageOne == null) {
			imageOne = $(this).children().first();
			$(imageOne).css('visibility','visible');
		} else if (imageTwo == null) {
			imageTwo = $(this).children().first();
			$(imageTwo).css('visibility','visible');
		}
		if (imageTwo != null && imageOne.attr('src') != imageTwo.attr('src')) {
			setTimeout(hideImages,500);
			setTimeout(resetImages,600);
			setTimeout(incrementMoves,600);
		} else if (imageTwo != null && imageOne.attr('src') === imageTwo.attr('src')) {
			matches++;
			$(imageOne).attr('alt','matched');
			$(imageTwo).attr('alt','matched');
			if (matches === (level*level)/2) {
				alert('You won!');
			} else {
				setTimeout(resetImages,100);
			}
		}
	});
}

//Initializes the grid when the user selects a play level

$('.play-regular').click(function(){
	makeGrid(4);
	createImages(4);
});

$('.play-hard').click(function(){
	makeGrid(6);
	createImages(6);
});


//Clears the grid and brings the Play buttons back up when the user clicks the Start Over buttons

$('.reset-button').click(function(){
	$('.game-row').remove();
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
});







