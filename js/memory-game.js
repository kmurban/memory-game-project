$('button').mouseover(function(){
	$(this).css('background-color','#637fa3');
});

$('button').mouseout(function(){
	$(this).css('background-color','#ffffff');
});

$('.play-button').click(function(){
	$('.play-buttons').css('display','none');
	$('.game-data').css('display','block');
	$('.reset').css('display','block');

});

$('.play-easy').click(function(){

});

$('.play-medium').click(function(){

});

$('.play-hard').click(function(){

});

$('.reset-button').click(function(){
	$('.play-buttons').css('display','block');
	$('.game-data').css('display','none');
	$('.reset').css('display','none');
});