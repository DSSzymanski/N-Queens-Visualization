function draw_canvas(board, tiles, curr_queens) {
	var ctx = board.getContext("2d");
	var spacing = board.width/tiles;
	ctx.font = "30px Arial";
	ctx.fillStyle = "green";
	for (var x = 0; x < board.width; x += spacing){
		for (var y = 0; y < board.height; y += spacing) {
			if ((x+y)%160 === 0){
				ctx.rect(x, y, spacing, spacing);
				ctx.fill();
			}
		}
	}
	if (curr_queens.length === 0){
		console.log("none");
	}
};
