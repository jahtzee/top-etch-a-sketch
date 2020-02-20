let grid_x = 32;
let grid_y = 64;
const grid_container = '#container';

createGrid(grid_container, grid_x, grid_y);

function createGrid(element, x, y) {
	const container = document.querySelector(element);
	let cells = [];

	container.setAttribute('style', `display:grid; grid-template-rows:repeat(${x}, 5px [row-start]); grid-template-columns:repeat(${y}, 5px [col-start]);`);

	for (let i = 0; i < x*y; i++) {
		cells.push(document.createElement('div'));
		cells[i].setAttribute('class', 'cell');
		cells[i].addEventListener('mouseover', event => colorCell(event.target));
		container.appendChild(cells[i]);
	}
}

function colorCell(element) {
	element.setAttribute('style', 'background-color:red;');
}