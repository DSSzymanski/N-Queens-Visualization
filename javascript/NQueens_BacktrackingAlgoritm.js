function solve(board, size, arr) {
	if (arr.length === size) {
		console.log(arr);
		return true;
	}
	for (var row = 0; row < size; row += 1) {
		if (check_constraints(arr, row) === true) {
			arr.push(row);
			draw_canvas(board, size, arr);
			if (solve(board, size, arr) === true) {
				return true;
			}
			arr.pop();
			draw_canvas(board, size, arr);
		}
	}
	return false;
}

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

function check_upper_diag(arr, row) {
	row -= 1;
	for (var i = arr.length-1; i >= 0; i -=1) {
		if (arr[i] === row) {return false;}
		row -= 1; 
	}
	return true;
}

function check_lower_diag(arr, row) {
	row += 1;
	for (var i = arr.length-1; i >= 0; i -=1) {
		if (arr[i] === row) {return false;}
		row += 1; 
	}
	return true;
}

function check_row(arr, row) {
	return !arr.includes(row);
}