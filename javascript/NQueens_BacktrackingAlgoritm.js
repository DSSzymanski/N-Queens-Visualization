/*
*solve() is the main function within this module. Implements a recursive backtracking
*	algorithm to solve for the current board.
*@param {canvas node} board: canvas node relating to the chess board. used as a param
*	for the drawing functions
*@param {int} size: size of the board. Used as a param within the drawing functions as
*	well as checking if the board is completely solved and as a bound for the for loops
*	that check all rows for possible queen tiles.
*@param {array} arr: array used for storing current queen locations for the recursive
*	function calls. First call to the solve function can just take an empty array.
*@returns bool: Returns boolean value for if the board size has a solution or not.
*	True represents the board size being solved, false represents no soluion.
*/
function solve(board, size, arr) {
	//Check if board puzzle is solved
	if (arr.length === size) {
		return true;
	}
	//for loop to iterate through the possible rows on the board
	for (var row = 0; row < size; row += 1) {
		//check if position is possible, if so add to array and recursively call function.
		if (check_constraints(arr, row) === true) {
			arr.push(row);
			draw_canvas(board, size, arr);
			//recursive call will return true if expansion on arr works, false otherwise.
			if (solve(board, size, arr) === true) {
				return true;
			}
			//remove node from arr and redraw canvas to reflect removing.
			arr.pop();
			draw_canvas(board, size, arr);
		}
	}
	//returns false if no row works to find a solution
	return false;
}

/*
*check_constraints() is a general function that calls functions to check every constraint.
*@param {array} arr: array of currently valid queen locations.
*@param {int} row: location of next location to check.
*@returns {boolean}: returns boolean value of true if the location passed all constraints,
*	false otherwise.
*/
function check_constraints(arr, row) {
	if (check_row(arr, row) === false) {
		return false;
	}
	if (check_upper_diag(arr, row) === false) {
		return false;
	}
	if (check_lower_diag(arr, row) === false) {
		return false;
	}
	return true;
}

/*
*check_upper_diag() checks if the queen attacks any queen in the upper left diagonal position.
*@param {array} arr: array of currently valid queen locations.
*@param {int} row: location of next location to check.
*@returns {boolean}: returns boolean value of true if the location passed false otherwise.
*/
function check_upper_diag(arr, row) {
	//decrement row to not check current position (can't attack itself).
	row -= 1;
	//loop to move to the left until you hit the left side of the board.
	for (var i = arr.length-1; i >= 0; i -=1) {
		if (arr[i] === row) {return false;}
		row -= 1; 
	}
	return true;
}

/*
*check_lower_diag() checks if the queen attacks any queen in the lower left diagonal position.
*@param {array} arr: array of currently valid queen locations.
*@param {int} row: location of next location to check.
*@returns {boolean}: returns boolean value of true if the location passed false otherwise.
*/
function check_lower_diag(arr, row) {
	//increment row to not check current position (can't attack itself).
	row += 1;
	//loop to move to the left until you hit the left side of the board.
	for (var i = arr.length-1; i >= 0; i -=1) {
		if (arr[i] === row) {return false;}
		row += 1; 
	}
	return true;
}

/*
*check_row() checks if the queen attacks any queen in the same row. Simple array check.
*@param {array} arr: array of currently valid queen locations.
*@param {int} row: location of next location to check.
*@returns {boolean}: returns boolean value of true if the location passed false otherwise.
*/
function check_row(arr, row) {
	return !arr.includes(row);
}