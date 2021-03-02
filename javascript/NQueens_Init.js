/**
*init() is used upon document load to fill in the html elements
*@return nothing
*/
function init() {
	//select main div within body
	var mainDiv = document.querySelector("#main");
	//add title bar
	init_title(mainDiv);
	/*
	*add task bar. contains both the slider for the 
	*board size and the solve button
	*/
	init_taskbar(mainDiv);
	//add canvas
	init_canvas(mainDiv);
	//add step counter
	init_stepCounter(mainDiv);
};

/**
*init_title() is used upon document load to add the h1 header title
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_title(container) {
	//create container and h1 to store title
	var div = document.createElement("div");
	var text = document.createElement("h1");
	//set text
	header_text = "N-Queens Solver";
	text.innerText = header_text;
	//append to container param
	div.appendChild(text);
	container.appendChild(div);
};

/**
*init_taskbar() is used upon document load to add the taskbar
*Taskbar contains both the board size slider and the solve button.
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_taskbar(container) {
	//create and setup container to store taskbar elements
	var div = document.createElement("div");
	div.id = "taskbar";
	//add slider to taskbar
	init_slider(div);
	//add solve button to taskbar
	init_solveBtn(div);
	//add taskbar to container param
	container.appendChild(div);
};	

/**
*init_slider() is used upon document load to add the slider
*to the taskbar. Contains both slider and text div to display
*value of the slider.
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_slider(container) {
	//create and setup container to store slider elements
	var div = document.createElement("div");
	div.id = "slider_container";
	
	//create slider's text element
	var text = document.createElement("div");

	//create and setup slider element
	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = "1";
	slider.max = "20";
	slider.value = "8";
	slider.id = "size_slider";

	//functionality to display the sliders value in the text element
	text.innerText = slider.value;
	slider.oninput = function() {
		text.innerText = this.value;
	}
	
	//add to slider container and container param
	div.appendChild(slider);
	div.appendChild(text);
	container.appendChild(div);
};

/**
*init_solveBtn() is used upon document load to add the solve button
*to the taskbar. Solve button will start solving for the current
*grid size once clicked.
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_solveBtn(container) {
	//create and setup container to store the button element
	var div = document.createElement("div");
	div.id = "solveBtn_container";

	//create and setup button
	var solveBtn = document.createElement("button");
	solveBtn.id = "solveBtn";
	solveBtn.innerText = "Solve";

	//onclick will start solving for the algorithm
	solveBtn.onclick = function() {
		var canvas = document.getElementById("chess_board");
		var slider = document.getElementById("size_slider");
		console.log(slider.value);
		solve(canvas, 8, []);
	}

	//add to container element and to the container param
	div.appendChild(solveBtn);
	container.appendChild(div);
};

/**
*init_canvas() is used upon document load to add the canvas
*to the page. Will draw blank board upon creation.
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_canvas(container) {
	//create and setup container to store the button element
	var div = document.createElement("div");
	div.id = "canvas_div";

	//create and setup attributes for canvas
	var canvas = document.createElement("canvas");
	canvas.id = "chess_board";
	canvas.setAttribute("width", "640px");
	canvas.setAttribute("height", "640px");
	canvas.setAttribute("style", "border:1px solid black");

	//add to container element and container param
	div.appendChild(canvas);
	container.appendChild(div);

	//get default value from slider and draw blank board to start
	var default_size = document.getElementById("size_slider").value;
	draw_canvas(canvas, default_size, []);
};

/**
*init_stepCounter() is used upon document load to add the step counter
*to the bottom of the element to track how many steps it takes the
*algoritm to solve
*@param {node} container The container to hold the title element
*@return nothing
*/
function init_stepCounter(container) {
	//create and setup container to store the button element
	var div = document.createElement("div");
	div.id = "stepCounter_container";

	//create and setup label for the step counter
	var label = document.createElement("label");
	label.id = "stepCounter_label";
	label.innerText = "Step count:";

	//create and setup div to hold the actual number for the counter
	var div2 = document.createElement("div");
	div2.id = "steps";
	div2.innerText = "0";

	//add label and div2 to container element and container param
	div.appendChild(label);
	div.appendChild(div2);
	container.appendChild(div);
};
