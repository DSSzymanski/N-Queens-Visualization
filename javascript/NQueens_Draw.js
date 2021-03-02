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
	var spacing = board.width/size;
	var ctx = board.getContext("2d");
	ctx.font = "36px Arial";
	ctx.fillStyle = "red";

	//x_pos = x column + offset
	var x_pos = (pos[0] * spacing) + (spacing/3);
	//y_pos = y row + offset
	var y_pos = (pos[1] * spacing) + 2*(spacing/3);
	ctx.fillText("Q", x_pos, y_pos);
}

function draw_queens(board, size, curr_queens) {
	//get context and set up for drawing queens
	var ctx = board.getContext("2d");
	var spacing = board.width/size;
	ctx.font = "36px Arial";
	ctx.fillStyle = "black";
	
	//draw queens to board
	curr_queens.forEach((queen, index) => {
		//x_pos = x column + offset
		var x_pos = (index * spacing) + (spacing/3);
		//y_pos = y row + offset
		var y_pos = (queen * spacing) + 2*(spacing/3);
		ctx.fillText("Q", x_pos, y_pos);
	});
};