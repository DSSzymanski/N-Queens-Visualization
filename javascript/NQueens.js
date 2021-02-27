function init() {
	var mainDiv = document.querySelector("#main");
	init_title(mainDiv);
	init_taskbar(mainDiv);
	init_canvas(mainDiv);
};

function init_title(mainDiv) {
	var div = document.createElement("div");
	var text = document.createElement("h1");
	header_text = "N-Queens Solver";
	text.innerText = header_text;
	div.appendChild(text);
	mainDiv.appendChild(div);
};

function init_taskbar(mainDiv) {
	var div = document.createElement("div");
	div.id = "taskbar";
	init_slider(div);
	init_solveBtn(div);
	mainDiv.appendChild(div);
};	

function init_slider(container) {
	var div = document.createElement("div");
	div.id = "slider_container";
	
	var text = document.createElement("div");

	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = "1";
	slider.max = "20";
	slider.value = "8";
	slider.id = "size_slider";
	text.innerText = slider.value;
	slider.oninput = function() {
		text.innerText = this.value;
	}
	
	div.appendChild(slider);
	div.appendChild(text);
	container.appendChild(div);
};

function init_solveBtn(container) {
	var div = document.createElement("div");
	div.id = "solveBtn_container";

	var solveBtn = document.createElement("button");
	solveBtn.id = "solveBtn";
	solveBtn.innerText = "Solve";

	solveBtn.onclick = function() {
		//TODO: fill in button
	}

	div.appendChild(solveBtn);
	container.appendChild(div);
};

function init_canvas(mainDiv) {
	var div = document.createElement("div");
	div.id = "canvas_div";
	var canvas = document.createElement("canvas");
	canvas.id = "chess_board";
	canvas.setAttribute("width", "640px");
	canvas.setAttribute("height", "640px");
	div.appendChild(canvas);
	mainDiv.appendChild(div);
	draw_canvas(canvas, 8, []);
};

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
