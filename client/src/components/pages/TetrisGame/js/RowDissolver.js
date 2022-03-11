import {
	DISSOLVE_RATE,
	DISSOLVE_FLASH_RATE
} from '../constants';

export function RowDissolver(
	matched,
	onDissolve,
	particleSystem,
	particleFlare,
	meta
) {
	this._rows = [];
	this._meta = meta;
	this._ticks = 0;
	this._flashTicks = 0;
	this._matchedSquares = matched;
	this._active = false;
	this._altImage = false;
	this._onDissolve = onDissolve;
	this._particleSystem = particleSystem;
	this._particleFlare = particleFlare;

	this.dissolve = (rows, meta) => {
		// split all the rows into two sets of columns, reversing the second one
		this._rows = rows.reduce((acc, row) => {
			// sort the rows
			const sorted = [].concat(row).sort((a, b) => a.col - b.col);

			return acc.concat([sorted.slice(0, 5).reverse(), sorted.slice(5)]);
		}, []);

		this._ticks = 0;
		this._flashTicks = 0;
		this._active = true;
		this._meta = meta;
		this._altImage = false;
	};

	this.update = () => {
		if (!this._active) return;

		this._ticks++;
		this._flashTicks++;

		if (this._flashTicks >= DISSOLVE_FLASH_RATE) {
			this._flashTicks = 0;

			this._altImage = !this._altImage;
		}

		if (this._ticks >= DISSOLVE_RATE) {
			this._ticks = 0;

			this._rows.forEach((row) => {
				this._particleSystem.burst(
					row[0].x,
					row[0].y,
					5,
					this._particleFlare
				);

				// splice off the first index
				row.splice(0, 1);
			});

			// if we have no arrays that aren't empty
			if (this._rows.filter((row) => row.length > 0).length === 0) {
				this._active = false;

				this._onDissolve(this._meta);
			}
		}
	};

	this.draw = () => {
		if (!this._active) return;

		const squareImage = !this._altImage
			? this._matchedSquares.square[0]
			: this._matchedSquares.square[1];

		for(let i = 0; i < this._rows.length; i++) {
			for(let j = 0; j < this._rows[i].length; j++) {
				const { x, y } = this._rows[i][j];
				window.gameContext.drawImage(squareImage, x, y);
			}
		}
	};
}
