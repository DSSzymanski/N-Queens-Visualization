/**
*init() is used upon document load to fill in the html elements
*@return nothing
*/
function init() {
	//select main div within body
	var mainDiv = document.querySelector("#main");
	
	init_title(mainDiv);
	init_taskbar_and_canvas(mainDiv);
};

/**
*init_taskbar_and_canvas() is used upon document load to taskbar and canvas
*	elements inside a content container
*@param {node} container: The container to hold the title element
*@return nothing
*/
const init_taskbar_and_canvas = (container) => {
	var content_div = document.createElement("div");
	content_div.id = "content_container";
	container.appendChild(content_div);
	/*
	*add task bar. contains both the slider for the 
	*board size and the solve button
	*/
	init_taskbar(content_div);

	//add canvas
	init_canvas(content_div);	
}


/**
*init_title() is used upon document load to add the h1 header title
*@param {node} container: The container to hold the title element
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
*	Taskbar contains both the board size slider and the solve button.
*@param {node} container: The container to hold the title element
*@return nothing
*/
function init_taskbar(container) {
	//create and setup container to store taskbar elements
	var div = document.createElement("div");
	div.id = "taskbar";

	var text = document.createElement("h5");
	text.innerText = "Input Controls";
	div.appendChild(text);

	//add slider to taskbar
	init_sizeSlider(div);
	init_intervalSlider(div);
	//add solve button to taskbar
	init_solveBtn(div);
	init_stepCounter(div);
	//add taskbar to container param
	container.appendChild(div);
};	

/*
*init_sizeSlider() is used upon document load to add the slider
*	to the taskbar that controls the boards size. Contains both 
*	slider and text div to display the value of the slider.
*@param {node} container: The container to hold the title element
*@return nothing
*/
function init_sizeSlider(container) {
	//create and setup container to store slider elements
	var div = document.createElement("div");
	div.id = "sizeSlider_container";

	//label text	
	var label_text = document.createElement("div");
	label_text.innerText = "Grid Size";

	//create slider's text element
	var currVal_text = document.createElement("div");

	//create and setup slider element
	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = "1";
	slider.max = "20";
	//default
	slider.value = "8";
	currVal_text.innerText = slider.value + "x" + slider.value;

	slider.id = "size_slider";

	//functionality to display the sliders value in the text element
	//updates grid when slid
	slider.oninput = function() {
		//reset canvas and stop algorithm if already running
		stop_algorithm();
		reset_stepCounter();
		
		currVal_text.innerText = this.value + "x" + this.value;
		draw_canvas(document.getElementById("chess_board"), this.value, [])
	}
	
	//add to slider container and container param
	div.appendChild(label_text);
	div.appendChild(slider);
	div.appendChild(currVal_text);
	container.appendChild(div);
};

/*
*init_intervalSlider() is used upon document load to add the slider
*	to the taskbar that controls the algorithms interval time. Contains 
*	both slider and text div to display the value of the slider.
*@param {node} container: The container to hold the title element
*@return nothing
*/
function init_intervalSlider(container) {
	//create and setup container to store slider elements
	var div = document.createElement("div");
	div.id = "intervalSlider_container";
	
	//label text	
	var label_text = document.createElement("div");
	label_text.innerText = "Interval Rate";

	//create slider's text element
	var currVal_text = document.createElement("div");

	//create and setup slider element
	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = "100";
	slider.max = "2000";
	slider.step = "100";
	//default value
	slider.value = "1000";
	slider.id = "interval_slider";

	//functionality to display the sliders value in the text element
	//updates grid when slid
	currVal_text.innerText = slider.value/1000 + " sec";
	slider.oninput = function() {
		currVal_text.innerText = this.value/1000 + " sec";
	}
	
	//add to slider container and container param
	div.appendChild(label_text);
	div.appendChild(slider);
	div.appendChild(currVal_text);
	container.appendChild(div);
};

/**
*init_solveBtn() is used upon document load to add the solve button
*	to the taskbar. Solve button will start solving for the current
*	grid size once clicked.
*@param {node} container: The container to hold the title element
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
	solveBtn.onclick = async function() {
		const canvas = document.getElementById("chess_board");
		const sizeValue = Number(document.getElementById("size_slider").value);
		const intervalValue = Number(document.getElementById("interval_slider").value);
		//reset canvas and algorithm if already running
		draw_canvas(canvas, sizeValue, []);
		stop_algorithm();
		reset_stepCounter();
		//endstate waits for the algorithm inside solve as well as the drawing to end.
		//will draw over canvas if no solution is found.
		const end_state = await solve(canvas, sizeValue, intervalValue, []);
		if (end_state === false) {
			draw_noSoln(canvas, sizeValue);
		}
	}

	//add to container element and to the container param
	div.appendChild(solveBtn);
	container.appendChild(div);
};

/**
*init_canvas() is used upon document load to add the canvas
*	to the page. Will draw blank board upon creation.
*@param {node} container: The container to hold the title element
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

	//add to container element and container param
	div.appendChild(canvas);
	container.appendChild(div);

	init_legend(div);
	//get default value from slider and draw blank board to start
	const default_size = document.getElementById("size_slider").value;
	draw_canvas(canvas, default_size, []);
};

/**
*init_stepCounter() is used upon document load to add the step counter
*	to the bottom of the element to track how many steps it takes the
*	algoritm to solve
*@param {node} container: The container to hold the title element
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
	var stepDiv = document.createElement("div");
	stepDiv.id = "steps";
	stepDiv.innerText = "0";

	//add label and stepDiv to container element and container param
	div.appendChild(label);
	div.appendChild(stepDiv);
	container.appendChild(div);
};

/**
*init_legend() is used upon document load to add the queen color legend
*	to the bottom of the element to show different types of queen placement.
*	Currently 3 types:
*		Test - test for placement
*		Expand - expand and search with node
*		Delete - remove node
*@param {node} container: The container to hold the title element
*@return nothing
*/
function init_legend(container) {
	var div = document.createElement("div");
	div.id = "legend_container";

	const legend_label = document.createElement("label");
	legend_label.innerText = "Legend:"
	legend_label.id = "legend_label";

	//border for color squares representing queen types
	const square_style = "border: 1px solid black; width: 20px; height: 20px;";
	
	//TESTING QUEENS
	//color square
	var testing_div = document.createElement("div");
	testing_div.setAttribute("style", square_style + "background-color: " + TESTING + ";")
	//text
	const testing_text = document.createElement("div");
	testing_text.innerText = "Testing";
	testing_text.className = "legend_text";
	//END TESTING QUEENS
	
	//EXPANDING QUEENS
	//color square
	var expanding_div = document.createElement("div");
	expanding_div.setAttribute("style", square_style + "background-color: " + EXPANDING + ";")
	//text
	const expanding_text = document.createElement("div");
	expanding_text.innerText = "Expanding";
	expanding_text.className = "legend_text";
	//END EXPANDING QUEENS
	
	//DELETING QUEENS
	//color square
	var deleting_div = document.createElement("div");
	deleting_div.setAttribute("style", square_style + "background-color: " + DELETING + ";");
	//text
	const deleting_text = document.createElement("div");
	deleting_text.innerText = "Deleting";
	deleting_text.className = "legend_text";
	//END DELETING QUEENS
	
	//add to web page
	div.appendChild(legend_label);
	div.appendChild(testing_div);
	div.appendChild(testing_text);
	div.appendChild(expanding_div);
	div.appendChild(expanding_text);
	div.appendChild(deleting_div);
	div.appendChild(deleting_text);
	container.appendChild(div);
};
