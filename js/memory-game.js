

let cellSize = 0;

//Change the color of the buttons when they are moused over (helps make it clear that these are clickable elements)

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
});

//Helper functions for makeGrid
//makeRows creates stacked rows (divs) of the correct height
//fillRows places the correct number of cells (divs) in each row

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

//Build a grid of the desired size for regular or hard plan
//Makes use of the helper functions makeRows and fillRows, defined above

function makeGrid(level) {
	if ($(window).width() < $(window).height()) {
		cellSize = $(window).width()*0.8*(1/(level + 0.5));
	} else {
		cellSize = $(window).height()*0.8*(1/(level + 0.5));
	}
	makeRows(level);
	fillRows(level);
}

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

function fillImages(level) {
	let images = makeImageArray(level);
	let cells = $('.game-cell').get();
	console.log(cells);
	for (i = 0; i < cells.length; i++) {
		let thisCell = cells[i];
		let thisImageSrc = "img/"+String(images[i])+".png";
		$('<img class = "game-image" src = "" alt = "">').appendTo(thisCell);
		let thisImage = $(thisCell).children().first();
		$(thisImage).attr('src', thisImageSrc);
		$(thisImage).attr('alt', thisImageSrc);
		$(thisImage).css('width',cellSize*0.9);
	}
}

//Initialize the grid when the user selects a play level

$('.play-regular').click(function(){
	makeGrid(4);
	fillImages(4);
});

$('.play-hard').click(function(){
	makeGrid(6);
});

//Clears the grid and brings the Play buttons back up when the user clicks the Start Over buttons

$('.reset-button').click(function(){
	$('.game-row').remove();
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
});







