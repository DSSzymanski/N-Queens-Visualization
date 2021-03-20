/*
*inc_stepCounter() increments the stepCounter div by 1.
*@return: nothing
*/
const incr_stepCounter = () => {
	var stepDiv = document.getElementById("steps");
	stepDiv.innerText = Number(stepDiv.innerText) + 1;
}

/*
*reset_stepCounter() resets the stepCounter to 0.
*@return: nothing
*/
const reset_stepCounter = () => {
	var stepDiv = document.getElementById("steps");
	stepDiv.innerText = "0";
}