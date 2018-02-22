# Memory Game

This is a single-player in-browser game designed to challenge visual memory. The user is presented with a grid of cards, and can click on any card to reveal an image. If the user reveals two matching images, the images remain visible; otherwise, they are hidden again after a brief delay. The game is won when all images are matched and visible. 

Additional features include a game timer, move counter, and three-star scoring system. 

## Getting Started

To play the game: 
* Download all files in this repository and save them in a folder on your computer
* Open then index.html file in a browser window
* Select a level to begin
* Click on cards to reveal images
* If you want to restart the game, click the "Start Over" button below the game grid

## Dependencies

Code for the game uses the jQuery and jQuery UI libraries. These libraries are linked in the scripts section at the bottom of the index.html file. 

## Limitations

You can play this game on a smartphone, tablet, laptop, or desktop computer, in a browser window of any (reasonable) size — but please note that the game grid will not resize dynamically, so you should begin the game in a window of the size you plan to play in. This will most often be an issue when using a resizable browser window on a laptop or tablet. 

I have tested the game thoroughly on Google Chrome Version 64.0.3282.167. The game hasn't been exhaustively tested on other browsers. 

## Contributing

Feel free to fork this repository and make your own changes! I'm not actively soliciting contributions, but will be happy to take a look at anything you come up with. 

Some changes that should be fairly easy to make:
* Adjust the difficulty of the respective levels by changing the level constants for the `.play-regular` and `.play-hard` event listeners
* Adjust the score breakpoints by changing the `if` statements in the `updateScore()` function
* Swap out the image files for your own images (just be sure to keep the #.png file format)

## License

The content of this repository is licensed under the [MIT license](https://choosealicense.com/licenses/mit/)
