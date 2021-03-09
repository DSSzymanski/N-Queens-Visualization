/*
*solve() is the main function to call within the module. This will go through the backtracking
*	algorithm and generate a set of instructions. Then the function will execute these functions,
*	drawing them on the webpage's canvas.
*@param {canvas node} board: canvas node relating to the chess board. used as a param
*	for the drawing functions
*@param {int} size: size of the board. Used as a param within the drawing functions as
*	well as checking if the board is completely solved and as a bound for the for loops
*	that check all rows for possible queen tiles.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
*/
function solve(board, size, arr) {
	//interval rate
	const interval = 500;
	//create and generate an array of instructions to execute
	var instructionQueue = [];
	const end_state = generateInstructions(board, size, arr, instructionQueue);

	//execure instructions at set interval
	var test = setInterval(executeInstructions, interval);
	function executeInstructions() {
		instruction = instructionQueue.shift();
		//execute instruction. if instruction is a board reset don't increment step counter
		const instructionType = instruction();
		if (instructionType === INCREMENT_TRIGGER) {
			incr_stepCounter();
		}
		//if end of instructionQueue end intervals
		if (instructionQueue.length === 0) {
			clearInterval(test);
		}
	}
}

/*
*generateInstructions() implements a recursive backtrackingalgorithm to generate a set
*	 of instructions inside @param instructions.
*@param {canvas node} board: canvas node relating to the chess board. used as a param
*	for the drawing functions
*@param {int} size: size of the board. Used as a param within the drawing functions as
*	well as checking if the board is completely solved and as a bound for the for loops
*	that check all rows for possible queen tiles.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
*@param {array} instructions: array to fill with instructions throughout function.
*@returns bool: Returns boolean value for if the board size has a solution or not.
*	True represents the board size being solved, false represents no soluion.
*/
function generateInstructions(board, size, arr, instructions) {
	//Check if board puzzle is generateInstructionsd
	if (arr.length === size) {
		return true;
	}
	//for loop to iterate through the possible rows on the board
	for (var row = 0; row < size; row += 1) {
		//pos is a coordinate to place the next queen
		const pos = [arr.length, row];
		//add instructions for drawing a testing queen on the board
		instructions.push(() => draw_queen(board, size, pos, TESTING));
		//check if position is possible, if so add to array and recursively call function.
		if (check_constraints(arr, row) === true) {
			arr.push(row);
			//add instructions for drawing an expanding queen on the board
			instructions.push(() => draw_queen(board, size, pos, EXPANDING));
			//recursive call will return true if expansion on arr works, false otherwise.
			if (generateInstructions(board, size, arr, instructions) === true) {
				return true;
			}
			//remove node from arr and redraw canvas to reflect removing.
			arr.pop();
			//add instructions for drawing a deleting queen on the board
			instructions.push(() => draw_queen(board, size, pos, DELETING));
		}
		//reset board to state before current queen was tested/expanded
		const state = [...arr];
		instructions.push(() => draw_canvas(board, size, state));
	}
	//returns false if no row works to find a solution
	return false;
};

/*
*check_constraints() is a general function that calls functions to check every constraint.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
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
};

/*
*check_upper_diag() checks if the queen attacks any queen in the upper left diagonal position.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
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
};

/*
*check_lower_diag() checks if the queen attacks any queen in the lower left diagonal position.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
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
};

/*
*check_row() checks if the queen attacks any queen in the same row. Simple array check.
*@param {array} arr: array of ints representing currently placed queens of position
*	[row, col] = [index of array, data at index]
*@param {int} row: location of next location to check.
*@returns {boolean}: returns boolean value of true if the location passed false otherwise.
*/
function check_row(arr, row) {
	return !arr.includes(row);
};