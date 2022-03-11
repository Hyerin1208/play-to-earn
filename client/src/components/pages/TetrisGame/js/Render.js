import {
	BACKGROUND,
	INSET,
	LUMINANCE_LIGHT,
	LUMINANCE_DARK,
	SQUARE_LENGTH,
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	COL_COUNT,
	ROW_COUNT
} from '../constants';

import { colorLuminance, roundRect } from '../utils';

export function preRender(colors, style) {
	const workerCanvas = document.createElement('canvas');
	const workerCtx = workerCanvas.getContext('2d');

	return new Promise((res, rej) => {
		renderSquares(colors, style, workerCanvas, workerCtx).then(
			(squares) => {
				Promise.all([
					buildTetrominoes(squares, workerCanvas, workerCtx),
					renderGrid(workerCanvas, workerCtx),
					renderFlare(workerCanvas, workerCtx)
				]).then(res);
			}
		);
	});
}

function renderGrid(workerCanvas, workerCtx) {
	workerCanvas.width = CANVAS_WIDTH;
	workerCanvas.height = CANVAS_HEIGHT;
	workerCtx.clearRect(0, 0, workerCanvas.width, workerCanvas.height);

	workerCtx.fillStyle = 'none';
	workerCtx.strokeStyle = 'none';

	workerCtx.fillStyle = '#0c0d13';
	workerCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	workerCtx.strokeStyle = '#222';

	workerCtx.beginPath();

	// draw the vertical lines
	for (let x = 0; x < COL_COUNT + 1; x++) {
		workerCtx.moveTo(x * SQUARE_LENGTH, 0);
		workerCtx.lineTo(x * SQUARE_LENGTH, CANVAS_HEIGHT);
	}

	// draw the horizontal lines
	for (let y = 0; y < ROW_COUNT + 1; y++) {
		workerCtx.moveTo(0, y * SQUARE_LENGTH);
		workerCtx.lineTo(CANVAS_WIDTH, y * SQUARE_LENGTH);
	}

	// stroke the lines
	workerCtx.stroke();

	return convertCanvas(workerCanvas);
}

function renderSquares(colors, styleIndex, workerCanvas, workerCtx) {
	workerCanvas.width = SQUARE_LENGTH;
	workerCanvas.height = SQUARE_LENGTH;
	workerCtx.clearRect(0, 0, workerCanvas.width, workerCanvas.height);

	workerCtx.fillStyle = 'none';
	workerCtx.strokeStyle = 'none';

	const renderStyles = [
		renderStyle1,
		renderStyle2,
		renderStyle3,
		renderStyle4
	];
	const currentStyle = renderStyles[styleIndex] || renderStyle1;

	function renderStyle1(color, index) {
		// clear the canvas
		workerCtx.clearRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		// set the main color
		workerCtx.fillStyle = color;

		const len = SQUARE_LENGTH * 0.9;
		const xy = (SQUARE_LENGTH - len) * 0.5;
		roundRect(workerCtx, xy, xy, len, len, 4, true, false);

		workerCtx.fillStyle = colorLuminance(color, LUMINANCE_LIGHT);

		const innerLen = SQUARE_LENGTH * 0.5;
		const innerXY = (SQUARE_LENGTH - innerLen) * 0.5;
		roundRect(
			workerCtx,
			innerXY,
			innerXY,
			innerLen,
			innerLen,
			4,
			true,
			false
		);

		return convertCanvas(workerCanvas);
	}

	function renderStyle2(color, index) {
		// clear the canvas
		workerCtx.clearRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		// get the lighter color
		workerCtx.fillStyle = colorLuminance(color, LUMINANCE_LIGHT);

		// draw the lighter portion
		workerCtx.beginPath();
		workerCtx.moveTo(0, 0);
		workerCtx.lineTo(SQUARE_LENGTH, 0);
		workerCtx.lineTo(0, SQUARE_LENGTH);
		workerCtx.fill();

		// get the darker color
		workerCtx.fillStyle = colorLuminance(color, LUMINANCE_DARK);

		// draw the darker portion
		workerCtx.beginPath();
		workerCtx.moveTo(SQUARE_LENGTH, 0);
		workerCtx.lineTo(SQUARE_LENGTH, SQUARE_LENGTH);
		workerCtx.lineTo(0, SQUARE_LENGTH);
		workerCtx.fill();

		// set the main color
		workerCtx.fillStyle = color;
		const len = SQUARE_LENGTH * INSET;
		const xy = (SQUARE_LENGTH - len) * 0.5;

		if (len > 0) {
			// draw the main portion
			workerCtx.fillRect(xy, xy, len, len);
		}

		return convertCanvas(workerCanvas);
	}

	function renderStyle3(color, index) {
		// clear the canvas
		workerCtx.clearRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		// set the main color
		workerCtx.fillStyle = color;

		// draw the main portion
		workerCtx.fillRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		return convertCanvas(workerCanvas);
	}

	function renderStyle4(color, index) {
		// clear the canvas
		workerCtx.clearRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		// set the darker color
		workerCtx.fillStyle = colorLuminance(color, LUMINANCE_DARK);
		workerCtx.fillRect(0, 0, SQUARE_LENGTH, SQUARE_LENGTH);

		// set the main color
		workerCtx.fillStyle = color;

		// color the whole shape
		const len = SQUARE_LENGTH * 0.9;
		const xy = (SQUARE_LENGTH - len) * 0.5;
		roundRect(workerCtx, xy, xy, len, len, 4, true, false);

		// color the outer edge
		workerCtx.strokeStyle = colorLuminance(color, LUMINANCE_LIGHT);

		const innerLen = SQUARE_LENGTH * 0.8;
		const innerXY = (SQUARE_LENGTH - innerLen) * 0.5;
		roundRect(
			workerCtx,
			innerXY,
			innerXY,
			innerLen,
			innerLen,
			4,
			true,
			true
		);

		// color the middle
		workerCtx.fillStyle = colorLuminance(color, LUMINANCE_DARK);

		const middleLen = SQUARE_LENGTH * 0.5;
		const middleXY = (SQUARE_LENGTH - middleLen) * 0.5;
		roundRect(
			workerCtx,
			middleXY,
			middleXY,
			middleLen,
			middleLen,
			4,
			true,
			true
		);

		workerCtx.strokeStyle = 'none';
		workerCtx.fillStyle = colorLuminance(color, 2);

		const shinyXY = SQUARE_LENGTH * 0.1;
		roundRect(workerCtx, shinyXY, shinyXY, 6, 6, 2, true, false);

		return convertCanvas(workerCanvas);
	}

	return new Promise((res, rej) => {
		Promise.all(colors.map(currentStyle)).then(res);
	});
}

function buildTetrominoes(renderedSquares, workerCanvas, workerCtx) {
	const baseMeta = [
		{
			key: 'I',
			square: renderedSquares[0],
			images: [],
			previewLayout: {
				pattern: [
					[0, 0],
					[1, 0],
					[2, 0],
					[3, 0]
				], // I, rotate 0
				dimensions: [4, 1],
				offset: [0, 0]
			},
			layouts: [
				{
					pattern: [
						[0, 0],
						[1, 0],
						[2, 0],
						[3, 0]
					], // I, rotate 0
					offset: [0, 1]
				},
				{
					pattern: [
						[0, 0],
						[0, -1],
						[0, -2],
						[0, -3]
					], // I, rotate 90
					offset: [2, 3]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[2, 0],
						[3, 0]
					], // I, rotate 180
					offset: [0, 2]
				},
				{
					pattern: [
						[0, 0],
						[0, -1],
						[0, -2],
						[0, -3]
					], // I, rotate 270
					offset: [1, 3]
				}
			]
		},
		{
			key: 'O',
			square: renderedSquares[1],
			images: [],
			previewLayout: {
				pattern: [
					[0, 0],
					[1, 0],
					[0, 1],
					[1, 1]
				], // O, rotate all
				dimensions: [2, 2],
				offset: [0, 0]
			},
			layouts: [
				{
					pattern: [
						[0, 0],
						[1, 0],
						[0, 1],
						[1, 1]
					], // O, rotate all
					offset: [1, 0]
				}
			]
		},
		{
			key: 'T',
			square: renderedSquares[2],
			images: [],
			previewLayout: {
				pattern: [
					[0, 0],
					[-1, 0],
					[0, -1],
					[1, 0]
				], // T, rotate 0
				dimensions: [3, 2],
				offset: [1, 1]
			},
			layouts: [
				{
					pattern: [
						[0, 0],
						[-1, 0],
						[0, -1],
						[1, 0]
					], // T, rotate 0
					offset: [1, 1]
				},
				{
					pattern: [
						[0, 0],
						[0, -1],
						[1, 0],
						[0, 1]
					], // T, rotate 90
					offset: [1, 1]
				},
				{
					pattern: [
						[0, 0],
						[-1, 0],
						[0, 1],
						[1, 0]
					], // T, rotate 180
					offset: [1, 1]
				},
				{
					pattern: [
						[0, 0],
						[-1, 0],
						[0, 1],
						[0, -1]
					], // T, rotate 270
					offset: [1, 1]
				}
			]
		},
		{
			key: 'J',
			square: renderedSquares[3],
			images: [],
			previewLayout: {
				pattern: [
					[0, -1],
					[0, 0],
					[1, 0],
					[2, 0]
				], // J, rotate 0
				dimensions: [3, 2],
				offset: [0, 1]
			},
			layouts: [
				{
					pattern: [
						[0, -1],
						[0, 0],
						[1, 0],
						[2, 0]
					], // J, rotate 0
					offset: [0, 1]
				},
				{
					pattern: [
						[1, 0],
						[1, -1],
						[2, -1],
						[1, 1]
					], // J, rotate 90
					offset: [0, 1]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[2, 0],
						[2, 1]
					], // J, rotate 180
					offset: [0, 1]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[1, -1],
						[1, -2]
					], // J, rotate 270
					offset: [0, 2]
				}
			]
		},
		{
			key: 'L',
			square: renderedSquares[4],
			images: [],
			previewLayout: {
				pattern: [
					[0, -1],
					[1, -1],
					[2, -1],
					[2, -2]
				], // L, rotate 0
				dimensions: [3, 2],
				offset: [0, 2]
			},
			layouts: [
				{
					pattern: [
						[0, -1],
						[1, -1],
						[2, -1],
						[2, -2]
					], // L, rotate 0
					offset: [0, 2]
				},
				{
					pattern: [
						[1, 0],
						[2, 0],
						[1, -1],
						[1, -2]
					], // L, rotate 90
					offset: [0, 2]
				},
				{
					pattern: [
						[0, -1],
						[1, -1],
						[2, -1],
						[0, 0]
					], // L, rotate 180
					offset: [0, 2]
				},
				{
					pattern: [
						[1, 0],
						[0, -2],
						[1, -1],
						[1, -2]
					], // L, rotate 270
					offset: [0, 2]
				}
			]
		},
		{
			key: 'S',
			square: renderedSquares[5],
			images: [],
			previewLayout: {
				pattern: [
					[0, 0],
					[1, 0],
					[1, 1],
					[2, 1]
				], // S, rotate 0
				dimensions: [3, 2],
				offset: [0, 0]
			},
			layouts: [
				{
					pattern: [
						[0, 0],
						[1, 0],
						[1, 1],
						[2, 1]
					], // S, rotate 0
					offset: [0, 0]
				},
				{
					pattern: [
						[1, 1],
						[2, 1],
						[2, 0],
						[1, 2]
					], // S, rotate 90
					offset: [0, 0]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[1, 1],
						[2, 1]
					], // S, rotate 180
					offset: [0, 1]
				},
				{
					pattern: [
						[1, 1],
						[2, 1],
						[2, 0],
						[1, 2]
					], // S, rotate 270
					offset: [-1, 0]
				}
			]
		},
		{
			key: 'Z',
			square: renderedSquares[6],
			images: [],
			previewLayout: {
				pattern: [
					[0, 0],
					[1, 0],
					[-1, 1],
					[0, 1]
				], // Z, rotate 0
				dimensions: [3, 2],
				offset: [1, 0]
			},
			layouts: [
				{
					pattern: [
						[0, 0],
						[1, 0],
						[-1, 1],
						[0, 1]
					], // Z, rotate 0
					offset: [1, 0]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[0, -1],
						[1, 1]
					], // Z, rotate 90
					offset: [1, 1]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[-1, 1],
						[0, 1]
					], // Z, rotate 180
					offset: [1, 1]
				},
				{
					pattern: [
						[0, 0],
						[1, 0],
						[0, -1],
						[1, 1]
					], // Z, rotate 270
					offset: [0, 1]
				}
			]
		},
		{
			key: 'MATCHED',
			square: [renderedSquares[7], renderedSquares[8]],
			images: [],
			layouts: []
		}
	];

	workerCtx.fillStyle = 'none';
	workerCtx.strokeStyle = 'none';

	return new Promise((res, rej) => {
		baseMeta.forEach(async (meta) => {
			workerCanvas.width = SQUARE_LENGTH * 4;
			workerCanvas.height = SQUARE_LENGTH * 4;

			meta.layouts.forEach(async (layout) => {
				workerCtx.clearRect(
					0,
					0,
					workerCanvas.width,
					workerCanvas.height
				);

				layout.pattern.forEach((pair) => {
					workerCtx.drawImage(
						meta.square,
						(layout.offset[0] + pair[0]) * SQUARE_LENGTH,
						(layout.offset[1] + pair[1]) * SQUARE_LENGTH
					);
				});

				meta.images.push(await convertCanvas(workerCanvas));
			});

			if (meta.previewLayout) {
				workerCanvas.width =
					SQUARE_LENGTH * meta.previewLayout.dimensions[0];
				workerCanvas.height =
					SQUARE_LENGTH * meta.previewLayout.dimensions[1];

				// create the preview image
				workerCtx.clearRect(
					0,
					0,
					workerCanvas.width,
					workerCanvas.height
				);

				meta.previewLayout.pattern.forEach((pair) => {
					workerCtx.drawImage(
						meta.square,
						(meta.previewLayout.offset[0] + pair[0]) *
							SQUARE_LENGTH,
						(meta.previewLayout.offset[1] + pair[1]) * SQUARE_LENGTH
					);
				});

				meta.preview = await convertCanvas(workerCanvas);
			}
		});

		const result = {};

		baseMeta.forEach((meta) => {
			result[meta.key] = meta;
		});

		res(result);
	});
}

function renderFlare(workerCanvas, workerCtx) {
	workerCanvas.width = 64;
	workerCanvas.height = 64;
	workerCtx.clearRect(0, 0, workerCanvas.width, workerCanvas.height);

	workerCtx.fillStyle = 'none';
	workerCtx.strokeStyle = 'none';

	workerCtx.fillStyle = '#fff';

	// draw blurred, center circle
	workerCtx.filter = 'blur(2px)';
	workerCtx.beginPath();
	workerCtx.arc(32, 32, 6, 0, Math.PI * 2);
	workerCtx.fill();

	workerCtx.filter = 'blur(8px)';
	workerCtx.beginPath();
	workerCtx.arc(32, 32, 10, 0, Math.PI * 2);
	workerCtx.fill();
	workerCtx.filter = 'none';

	workerCtx.fill(
		new Path2D(
			'M31,32 l1,-32 l1,32 Z M31,32 l1,32 l1,-32 Z M32,31 l32,1 l-32,1 Z M32,31 l-32,1 l32,1 Z'
		)
	);

	// draw normal center circle
	workerCtx.beginPath();
	workerCtx.arc(32, 32, 4, 0, Math.PI * 2);
	workerCtx.fill();

	return convertCanvas(workerCanvas);
}

export async function renderStartBackground() {
	const S_LEN = SQUARE_LENGTH;
	const PATHS = [
		{
			color: '#f94144',
			path: `M1,1 h${S_LEN * 4 - 2} v${S_LEN - 2} h-${S_LEN * 4 - 2} Z`
		}, // I
		{
			color: '#f3722c',
			path: `M1,1 h${S_LEN * 2 - 2} v${S_LEN * 2 - 2} h-${
				S_LEN * 2 - 2
			} Z`
		}, // O
		{
			color: '#f8961e',
			path: `M1,${S_LEN + 1} v${S_LEN - 2} h${S_LEN * 3 - 1} v-${
				S_LEN - 2
			} h-${S_LEN} v-${S_LEN} h-${S_LEN} v${S_LEN} Z`
		}, // T
		{
			color: '#f9c74f',
			path: `M1,${S_LEN * 2 + 1} v${S_LEN - 2} h${S_LEN * 2 - 2} v-${
				S_LEN * 3 - 2
			} h-${S_LEN - 2} v${S_LEN * 2} Z`
		}, // J
		{
			color: '#90be6d',
			path: `M1,1 v${S_LEN * 3 - 2} h${S_LEN * 2 - 2} v-${
				S_LEN - 1
			} h-${S_LEN} v-${S_LEN * 2 - 1} Z`
		}, // L
		{
			color: '#43aa8b',
			path: `M1,${S_LEN + 1} v${S_LEN - 2} h${
				S_LEN * 2 - 2
			} v-${S_LEN} h${S_LEN} v-${S_LEN - 2} h-${
				S_LEN * 2 - 2
			} v${S_LEN} Z`
		}, // S
		{
			color: '#577590',
			path: `M1,1 h${S_LEN * 2 - 2} v${S_LEN} h${S_LEN} v${S_LEN - 2} h-${
				S_LEN * 2 - 2
			} v-${S_LEN} h-${S_LEN} Z`
		}
	]; // Z

	const ROTATIONS = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];

	const backgroundCanvas = document.createElement('canvas');

	backgroundCanvas.width = CANVAS_WIDTH;
	backgroundCanvas.height = CANVAS_HEIGHT;

	const backgroundCtx = backgroundCanvas.getContext('2d');

	const paths = await renderPaths();

	BACKGROUND.forEach((path) =>
		drawPath(paths[path[0]], path[1], path[2], path[3])
	);

	return convertCanvas(backgroundCanvas);

	function drawPath(path, x, y, rotation) {
		const xx = S_LEN * x;
		const yy = S_LEN * y;

		if (!rotation) {
			backgroundCtx.drawImage(path, xx, yy);
		} else {
			backgroundCtx.translate(xx, yy);
			backgroundCtx.rotate(ROTATIONS[rotation]);
			backgroundCtx.drawImage(path, 0, 0);
			backgroundCtx.rotate(-ROTATIONS[rotation]);
			backgroundCtx.translate(-xx, -yy);
		}
	}

	function renderPaths() {
		const workerCanvas = document.createElement('canvas');

		const wH = S_LEN * 4;
		workerCanvas.width = wH;
		workerCanvas.height = wH;

		const workerCtx = workerCanvas.getContext('2d');
		workerCtx.lineWidth = '2';
		workerCtx.globalAlpha = 0.5;

		return Promise.all(
			PATHS.map((data) => {
				workerCtx.clearRect(
					0,
					0,
					workerCanvas.width,
					workerCanvas.height
				);
				workerCtx.strokeStyle = data.color;
				workerCtx.stroke(new Path2D(data.path));
				return convertCanvas(workerCanvas);
			})
		);
	}
}

function convertCanvas(canvas) {
	return new Promise((res, rej) => {
		const img = new Image();

		img.onload = () => {
			res(img);
		};
		img.src = canvas.toDataURL();
	});
}
