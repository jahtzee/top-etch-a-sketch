const grid_container = '#canvas';
let grid_x = 100;
let grid_y = 100;
let cell_x = 5;
let cell_y = 5;
let color_puke = true;
let color = 'rgb(255,0,0)'
let isMousedown = false;
let mouseOverride = false;

createOptionEventListeners();
createMouseEventListeners();
createGrid(grid_container, grid_x, grid_y, cell_x, cell_y);

//Generates a grid of divs with the given dimensions within the container element. Each div has a listener event, which calls the coloring function on mouseover.
function createGrid(element, grid_x, grid_y, cell_x, cell_y) {
	const container = document.querySelector(element);
	let cells = [];

	container.setAttribute('style', `display:inline-grid; grid-template-rows:repeat(${grid_x}, ${cell_x}px [row-start]); grid-template-columns:repeat(${grid_y}, ${cell_y}px [col-start]);`);
	container.setAttribute('ondragstart', 'return false;');
	container.setAttribute('ondrop', 'return false;');

	for (let i = 0; i < grid_x*grid_y; i++) {
		cells.push(document.createElement('div'));
		cells[i].setAttribute('class', 'cell');
		cells[i].addEventListener('mouseover', event => {if (isMousedown || mouseOverride){colorCell(event.target)}});
		container.appendChild(cells[i]);
	}
}

//Destroys all children of the given node
function destroyGrid(element) {
	const container = document.querySelector(element);

	while (container.firstChild) {
		container.removeChild(container.lastChild);
	}
}

//Colors a given cell element in a random color, or shades the cell if already colored
function colorCell(element) {
	if (!element.style.backgroundColor) {
		if (!color_puke) {
			element.style.backgroundColor = color;
		} else {
			element.style.backgroundColor = randomRGB();
		}
	} else {
		element.style.backgroundColor = darkenRGB(element.style.backgroundColor);
	}

	//Takes an RGB color and returns a color that is darkened by 10%
	function darkenRGB(rgb) {
		const factor = 0.9;
		
		rgb = ((rgb.replace('rgb(', '')).replace(')', '')).split(','); //Trim down the RGB color and split the comma-seperated values into an array
		rgb.forEach((element, index, array) => array[index] *= factor); //Multiply each element of rgb by factor
		return('rgb('+rgb+')');
	}

	//Returns a randomized RGB color
	function randomRGB() {
	return('rgb('+getRandomInt(255)+','+getRandomInt(255)+','+getRandomInt(255)+')');

		function getRandomInt(max) {
	  	return Math.floor(Math.random() * Math.floor(max));
		}
	}
}

//Defines Listeners for Mouseup and Mousedown that disable or enable coloring via isMousedown
function createMouseEventListeners() {
	window.addEventListener('mousedown', event => isMousedown = true);
	window.addEventListener('mouseup', event => isMousedown = false);
}

function createOptionEventListeners() {
	const reset_btn = document.querySelector('#reset');
	const width_fld = document.querySelector('#width');
	const height_fld = document.querySelector('#height');
	const color_puke_bx = document.querySelector('#color-puke');
	const override_bx = document.querySelector('#override');
	const color_fld = document.querySelector('#color')

	reset_btn.addEventListener('click', event => {destroyGrid(grid_container); createGrid(grid_container, grid_x, grid_y, cell_x, cell_y);})
	width_fld.addEventListener('input', event => grid_x = event.target.value);
	height_fld.addEventListener('input', event => grid_y = event.target.value);
	color_puke_bx.addEventListener('input', event => {(event.target.checked) ? color_puke = true : color_puke = false});
	override_bx.addEventListener('input', event => {(event.target.checked) ? mouseOverride = true : mouseOverride = false});
	color_fld.addEventListener('input', event => color = event.target.value);
}