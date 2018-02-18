

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

//Build a grid of the desired size

function makeGrid(level) {
	if ($(window).width() < $(window).height()) {
		cellSize = $(window).width()*0.7*(1/(level + 0.25));
	} else {
		cellSize = $(window).height()*0.7*(1/(level + 0.25));
	}
	makeRows(level);
	fillRows(level);
}

//Initialize the grid when the user selects a play level

$('.play-easy').click(function(){
	makeGrid(3);
});

$('.play-medium').click(function(){
	makeGrid(4);
});

$('.play-hard').click(function(){
	makeGrid(5);
});

//Clears the grid and brings the Play buttons back up when the user clicks the Start Over buttons

$('.reset-button').click(function(){
	$('.game-row').remove();
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
});







