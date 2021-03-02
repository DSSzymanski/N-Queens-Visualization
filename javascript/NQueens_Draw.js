/*
*draw_canvas() is the function used to draw the entire canvas object. Called when backtracking/
*removing queens from the board, initial page load, and when drawing the board upon slider movement.
*@param {canvas node} board: main canvas node for drawing board and pieces.
*@param {int} tiles: dimensions of board in tiles (board is tilesXtiles size).
*@param {array} curr_queens: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]. This will be an empty array before algorithm is
* 	started.
*/
function draw_canvas(board, tiles, curr_queens) {
	//get context
	var ctx = board.getContext("2d");

	//calculates spacing for:
	//splitting the board into tiles as given above
	//spacing the queens on the squares
	var spacing = board.width/tiles;

	//draw board by alternating spaces in which to draw
	for (var x = 0; x < board.width; x += spacing){
		for (var y = 0; y < board.height; y += spacing) {
			//fills square with green dark space if passes
			//white square if fails
			if ((x+y)%(2*spacing) === 0){
				ctx.fillStyle = "green";
				ctx.fillRect(x, y, spacing, spacing);
			}
			else {
				ctx.fillStyle = "white";
				ctx.fillRect(x, y, spacing, spacing);
			}
		}
	}
	//Draw Queens on board
	//TODO: will need out of bounds error checking later
	if (curr_queens.length !== 0){
		draw_queens(board, tiles, curr_queens);
	}
};

function draw_queen(board, size, pos) {
	//get context and set up for drawing queens
	var ctx = board.getContext("2d");
	ctx.font = "36px Arial";
	ctx.fillStyle = "red";

	//used to offset and place queens
	var spacing = board.width/size;

	//x_pos = x column + offset
	var x_pos = (pos[0] * spacing) + (spacing/3);
	//y_pos = y row + offset
	var y_pos = (pos[1] * spacing) + 2*(spacing/3);
	ctx.fillText("Q", x_pos, y_pos);
}

/*
*draw_queens() is the function used to draw the currently placed queens on the canvas in black to
*	represent queens being valid and expanded.
*@param {canvas node} board: main canvas node for drawing board and pieces.
*@param {int} size: dimensions of board in tiles (board is tilesXtiles size).
*@param {array} curr_queens: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]. This will be an empty array before algorithm is
* 	started.
*/
function draw_queens(board, size, curr_queens) {
	//get context and set up for drawing queens
	var ctx = board.getContext("2d");
	ctx.font = "36px Arial";
	ctx.fillStyle = "black";

	//used to offset and place queens
	var spacing = board.width/size;
	
	//draw queens to board
	curr_queens.forEach((queen, index) => {
		//x_pos = x column + offset
		var x_pos = (index * spacing) + (spacing/3);
		//y_pos = y row + offset
		var y_pos = (queen * spacing) + 2*(spacing/3);
		ctx.fillText("Q", x_pos, y_pos);
	});
};