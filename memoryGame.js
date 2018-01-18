
function Image (src) {
	this.src = src;
	this.size = "2em";
}


var neymar = new Image('./images/neymar.png');
var cavani = new Image('./images/cavani.png');
var verratti = new Image('./images/Verratti.png');
var thiago_Silva = new Image('./images/TS.png');
var Ronnie = new Image('./images/Ronnie.png');
var mbappe = new Image('./images/Mbappe.png')


var memory_array = [neymar, neymar,cavani, cavani, verratti, verratti, thiago_Silva, thiago_Silva, Ronnie, Ronnie,mbappe,mbappe];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var counter = 0;
var limit = 100;

// Reload the game when clicking on the New Game button //

function newgame() {
    document.getElementById("memory_board").innerHTML = "";
    newBoard();
}

var button = document.getElementById('button');
button.addEventListener("click", newgame);


//Put a limited number of moves for the Player //

function getlimit(){
	limit = document.getElementById("limit").value;
	return limit;
}

document.getElementById("sub").addEventListener("click", getlimit);


// Function that will shuffle any array that we need it to apply to  // 
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length;
    var j;
    var temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

// Create the board and place the cards randomly on it// 

function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i].src+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}

// create a board when the page load// 
window.addEventListener("load", newBoard);


// function that creates and check the tiles and if they are matching // 
function memoryFlipTile(tile,val){

	// if there is a match between to fliped tiles//

	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.size = '2em';
		tile.style.background = 'url('+ val +') no-repeat';
		tile.style.backgroundSize = 'cover';

		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("You Won! Ici c'est Paris !");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();

				}
			} else {
				// if there is no match // 
				counter++;
					if (counter >limit){
					alert("You lost, try again");
					newBoard();
					}


				function flip2Back(){
					
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(https://lh3.googleusercontent.com/-IOCPPco5lVnDljgcelvLF-7fW3d5Ip08XbE7JExsXCSlW9GG0QMlsh02Go2KafUQd0=w300) no-repeat';
				    tile_1.style.backgroundSize = '2em';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(https://lh3.googleusercontent.com/-IOCPPco5lVnDljgcelvLF-7fW3d5Ip08XbE7JExsXCSlW9GG0QMlsh02Go2KafUQd0=w300) no-repeat';
				    tile_2.style.backgroundSize="2em"
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 1000);
			}
		}
	}
}



