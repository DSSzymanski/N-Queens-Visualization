function solve(board, size, arr) {
	break;
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