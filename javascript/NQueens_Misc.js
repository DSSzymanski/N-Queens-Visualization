function incr_stepCounter() {
	var stepDiv = document.getElementById("steps");
	stepDiv.innerText = Number(stepDiv.innerText) + 1;
}

function reset_stepCounter() {
	var stepDiv = document.getElementById("steps");
	stepDiv.innerText = "0";
}