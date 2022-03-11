// https://boingboing.net/2019/09/04/tetris-gives-you-random-tetrom.html

// https://harddrop.com/wiki/Tetris_(Game_Boy)

// https://tetris.fandom.com/wiki/SRS

import MainLoop from 'mainloop.js';

import {
	COLOR_PALETTES,
	DROP_RATES,
	POINTS,
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	COL_COUNT,
	ENTRY_DELAY,
	SQUARE_LENGTH,
	SCREEN_SHAKE_VALUE,
	SCREEN_SHAKE_DURATION,
	PARTICLE_OPTIONS_FLARE,
	AUDIO_EFFECTS_KEYS
} from '../constants';

import { shuffleArray } from '../utils';
import { AudioPlayer } from './AudioPlayer';

import { Tetromino } from './Tetromino';
import { preRender } from './Render';
import { RowDissolver } from './RowDissolver';
import { ParticleSystem } from './Particle';
import { MusicPlayer } from './MusicPlayer';
import { Toaster } from './Toaster';

// whenever the tetrominoes are referenced in an array, this is the order used

// I, O, T, J, L, S, Z
// 0, 1, 2, 3, 4, 5, 6

export function Game(
	canvas,
	onGameStart,
	onGameOver,
	onGamePause,
	onStatsUpdate,
	onCountdown,
	cacheCanvas,
	cacheCtx,
	backgroundGrid
) {
	this._canvas = canvas;

	this._cacheCanvas = cacheCanvas;
	this._cacheCtx = cacheCtx;

	this._backgroundGrid = backgroundGrid;

	this._onGameStart = onGameStart;
	this._onGameOver = onGameOver;
	this._onGamePause = onGamePause;
	this._onStatsUpdate = onStatsUpdate;
	this._onCountdown = onCountdown;

	this._screenShaking = false;
	this._screenOffsetX = 0;
	this._screenOffsetY = 0;
	this._screenShakeEnabled = true;

	// the meta data for rendering all tetrominoes
	this._metaData = [];

	// all our static squares on the board
	this._staticSquares = [];

	// the active, falling tetromino
	this._fallingTetromino = null;

	// our current level
	this._currentLevel = 0;

	this._startLevel = 0;

	// the instance responsible for clearing rows
	this._dissolver = null;

	// arrow key state
	this._upPressed = false; // 38
	this._downPressed = false; // 40
	this._leftPressed = false; // 37
	this._rightPressed = false; // 39

	this._pReset = false;
	this._spaceReset = false;

	// the "bag" to store available pieces
	this._drawBag = [];

	// how many points the player currently has
	this._playerScore = 0;

	this._linesCleared = 0;

	this._gameStarted = false;

	this._gamePaused = false;

	this._nextTetromino = null;

	this._particleFlare = PARTICLE_OPTIONS_FLARE;
	this._particleSystem = null;

	this._countdownTicks = 0;
	this._count = 3;

	this._comboCount = 0;

	// cache canvas
	this._cacheCanvas = document.createElement('canvas');
	this._cacheCanvas.width = CANVAS_WIDTH;
	this._cacheCanvas.height = CANVAS_HEIGHT;
	this._cacheCtx = this._cacheCanvas.getContext('2d');

	this.audioPlayer = new AudioPlayer();
	this.musicPlayer = new MusicPlayer(this.audioPlayer);

	this._toaster = new Toaster();

	this.init = () => {
		document.addEventListener('keydown', this._keyDownHandler, false);
		document.addEventListener('keyup', this._keyUpHandler, false);

		// setup the mainloop
		MainLoop.setUpdate(this._update).setDraw(this._draw);
	};

	this.setMuted = (mute) => {
		if (mute) {
			this.audioPlayer.mute();
		} else {
			this.audioPlayer.unMute();
		}
	};

	this.playTestSound = (volume) => {
		this.audioPlayer.playFXGained(AUDIO_EFFECTS_KEYS.MOVE, volume * 0.1);
	};

	this.incrementScore = (increase) => {
		// increase the player's score depending on rows soft dropped
		this._playerScore += increase;

		this._updateStats();
	};

	this.resetGame = () => {
		this._playerScore = 0;
		this._linesCleared = 0;
		this._currentLevel = 0;

		this._staticSquares = [];
		this._gameStarted = false;
		this._gamePaused = false;

		MainLoop.stop();

		window.gameContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	};

	this.startGame = ({
		colors,
		style,
		level,
		screenShake,
		fxVolume,
		musicVolume
	}) => {
		if (this._gameStarted) return;

		this.audioPlayer.setFXVolume(fxVolume);
		this.audioPlayer.setMusicVolume(musicVolume);

		this._screenShakeEnabled = screenShake;

		this._gameStarted = true;

		// play the start sound
		this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.GAME_START);

		// start playing the music
		this.musicPlayer.play();

		// create our falling tetromino
		this._fallingTetromino = new Tetromino(
			this.getStaticSquares,
			this.endGame,
			this.lockTetromino,
			this.incrementScore,
			this.audioPlayer
		);

		this._startLevel = level;
		this._currentLevel = this._startLevel;

		this._playerScore = 0;
		this._linesCleared = 0;

		this._comboCount = 0;

		this._staticSquares = [];

		this._drawBag = [];
		this._nextTetromino = this.selectTetromino();

		// reset all of our keys
		this._upPressed = false;
		this._downPressed = false;
		this._leftPressed = false;
		this._rightPressed = false;

		this._pReset = false;
		this._spaceReset = false;

		this._countdownTicks = 0;
		this._count = 3;

		// perform all pre-rendering
		preRender(COLOR_PALETTES[colors].concat('#fff', '#555'), style).then(
			(result) => {
				this._metaData = result[0];
				this._backgroundGrid = result[1];

				this._particleSystem = new ParticleSystem();
				this._particleFlare.sprite = result[2];

				// create our dissolver
				this._dissolver = new RowDissolver(
					this._metaData.MATCHED,
					this._dissolveHandler,
					this._particleSystem,
					this._particleFlare
				);

				// draw the cached canvas to render the background grid
				this._drawCacheCanvas();

				// start the main loop
				MainLoop.start();

				this._onGameStart();
				this._onCountdown(this._count);
				this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.COUNTDOWN);
			}
		);
	};

	this._keyDownHandler = (event) => {
		if (!this._gameStarted) return;

		if (event.keyCode === 38) {
			// up
			this._upPressed = true;
			event.preventDefault();
		} else if (event.keyCode === 40) {
			// down
			this._downPressed = true;
			event.preventDefault();
		} else if (event.keyCode === 37) {
			// left
			this._leftPressed = true;
			event.preventDefault();
		} else if (event.keyCode === 39) {
			// right
			this._rightPressed = true;
			event.preventDefault();
		} else if (event.keyCode === 80) {
			// p
			if (this._pReset) return;

			this._pReset = true;

			if (this._gamePaused) {
				this.resumeGame();
			} else {
				this.pauseGame();
			}
		} else if (event.keyCode === 32) {

			// prevent page scroll
			event.preventDefault();

			// space
			if (this._spaceReset || this._gamePaused) return;

			this._spaceReset = true;

			this._fallingTetromino.hardDrop();

			// prevent page scroll in firefox
			return false;
		}
	};

	this._keyUpHandler = (event) => {
		if (!this._gameStarted) return;

		if (event.keyCode === 38) {
			// up
			this._upPressed = false;
		} else if (event.keyCode === 40) {
			// down
			this._downPressed = false;
		} else if (event.keyCode === 37) {
			// left
			this._leftPressed = false;
		} else if (event.keyCode === 39) {
			// right
			this._rightPressed = false;
		} else if (event.keyCode === 80) {
			this._pReset = false;
		} else if (event.keyCode === 32) {
			this._spaceReset = false;
		}
	};

	this._updateStats = () => {
		this._onStatsUpdate({
			score: this._playerScore,
			lines: this._linesCleared,
			level: this._currentLevel,
			next: this._metaData[this._nextTetromino].preview
		});
	};

	this.resetTetromino = (rate) => {
		// setup the new values for the tetromino
		this._fallingTetromino.reset(
			3,
			0,
			this._metaData[this._nextTetromino],
			rate
		);

		this._nextTetromino = this.selectTetromino();

		this._updateStats();
	};

	this.selectTetromino = () => {
		// if we run out of tetrominoes in the draw bag
		if (this._drawBag.length === 0) {
			this._drawBag = ['I', 'O', 'T', 'J', 'L', 'S', 'Z'];
			shuffleArray(this._drawBag);
		}

		// choose a random tetromino type
		const index = Math.floor(Math.random() * this._drawBag.length);
		const nextKey = this._drawBag[index];

		// remove the chosen tetromino from the draw bag
		this._drawBag.splice(index, 1);

		return nextKey;
	};

	this.endGame = () => {
		MainLoop.stop();

		// play the impact sound
		this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.LOSING_IMPACT);

		// play the game over sound
		this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.GAME_OVER);

		// stop the music
		this.musicPlayer.stop();

		this._gameStarted = false;

		this._onGameOver();
	};

	this.lockTetromino = (squares) => {
		// play the impact sound
		this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.IMPACT);

		// add the new squares
		this._staticSquares.push(...squares);

		// store our cleared rows indexes
		let clearedRows = [];

		// all the actual square objects to dissolve
		let dissolvedRows = {};

		// count the number of matches for each row
		let rowMatches = {};
		this._staticSquares.forEach((square) => {
			if (rowMatches[square.row]) {
				rowMatches[square.row]++;
			} else {
				rowMatches[square.row] = 1;
			}
		});

		// loop through all of our rows
		Object.keys(rowMatches).forEach((key) => {
			// check if our row has a complete match
			if (rowMatches[key] === COL_COUNT) {
				clearedRows.push(parseInt(key));
			}
		});

		// remove all cleared squares
		for (let i = this._staticSquares.length - 1; i >= 0; i--) {
			const row = this._staticSquares[i].row;
			if (clearedRows.indexOf(row) > -1) {
				const square = this._staticSquares.splice(i, 1)[0];

				// store the square keyed by the row
				if (dissolvedRows[row]) {
					dissolvedRows[row].push(square);
				} else {
					dissolvedRows[row] = [square];
				}
			}
		}

		// update our cache canvas after modifying static squares
		this._drawCacheCanvas();

		// if no rows were cleared
		if (clearedRows.length === 0) {
			// reset our falling tetromino
			this.resetTetromino(DROP_RATES[this._currentLevel]);

			this._comboCount = 0;
		} else {
			// increase the combo
			this._comboCount++;

			// if we're on a combo streak
			if (this._comboCount > 1) {
				this._toaster.createToast(`Combo x${this._comboCount}`);

				// shift the pitch up 0.1 for each combo count
				this.audioPlayer.playFX(
					AUDIO_EFFECTS_KEYS.JINGLE,
					// the sound starts playing when combo count is equal to 2
					// so we offset by that much so at 2, it's not pitch shifted at all
					1 + (this._comboCount - 2) * 0.1
				);
			}

			// dissolve the row
			const rowKeys = Object.keys(dissolvedRows);
			const rows = rowKeys.map((key) => dissolvedRows[key]);

			const meta = {
				rowKeys: rowKeys.map(parseFloat),
				rowCount: rowKeys.length
			};

			// play the explosion sound
			this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.EXPLOSION);

			this._dissolver.dissolve(rows, meta);

			this._shakeScreen();
		}
	};

	this._dissolveHandler = (meta) => {
		// sort by row
		this._staticSquares.sort((a, b) => a.row - b.row);

		meta.rowKeys.sort((a, b) => a - b);

		// move all squares below this row, down by one
		meta.rowKeys.forEach((key) => {
			for (let i = 0; i < this._staticSquares.length; i++) {
				const row = this._staticSquares[i];
				if (row.row < key) {
					row.row++;
					row.y = row.row * SQUARE_LENGTH;
				} else {
					break;
				}
			}
		});

		// update our cache canvas after modifying static squares
		this._drawCacheCanvas();

		// calculate new points to add
		this._playerScore +=
			POINTS[meta.rowCount - 1] * (this._currentLevel + 1);

		// increase lines cleared
		this._linesCleared += meta.rowCount;

		// if there's a tetris
		if (meta.rowCount === 4) {
			// play the special jingle sound
			this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.SHORT_CHOIR);
		}

		// every ten lines, increase the level
		const calculatedLevel = Math.floor(this._linesCleared / 10);

		if (calculatedLevel > this._currentLevel) {
			this._toaster.createToast('Level up!', '#00ffc4');

			// play the level sound
			this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.NEW_LEVEL);

			// set the current level, maxed out at 20
			this._currentLevel = Math.min(calculatedLevel, 20);
		}

		// reset our falling tetromino
		this.resetTetromino(DROP_RATES[this._currentLevel]);
	};

	this._drawCacheCanvas = () => {
		this._cacheCtx.clearRect(
			0,
			0,
			this._cacheCanvas.width,
			this._cacheCanvas.height
		);

		// draw the background
		this._cacheCtx.drawImage(this._backgroundGrid, 0, 0);

		// draw the static squares
		this._staticSquares.forEach((meta) => {
			this._cacheCtx.drawImage(meta.square, meta.x, meta.y);
		});
	};

	this.resumeGame = () => {
		if (this._gamePaused && this._gameStarted) {
			MainLoop.start();

			this._gamePaused = false;

			this._onGamePause(this._gamePaused);
		}
	};

	this.pauseGame = () => {
		if (!this._gamePaused && this._gameStarted) {
			MainLoop.stop();

			this._gamePaused = true;

			this._onGamePause(this._gamePaused);
		}
	};

	this._shakeScreen = () => {
		this._screenShaking = true;
		this._screenShakeTicks = 0;
	};

	this._update = () => {
		if (this._screenShaking) {
			this._screenShakeTicks++;
			if (this._screenShakeTicks >= SCREEN_SHAKE_DURATION) {
				this._screenShaking = false;
			}
		}

		if (this._count > -1) {
			this._countdownTicks++;
			if (this._countdownTicks >= 60) {
				this._countdownTicks = 0;
				this._count--;

				if (this._count === -1) {
					this._onCountdown(null);
				} else if (this._count === 0) {
					this._onCountdown('Go!');
					
					// reset our falling tetromino
					this.resetTetromino(DROP_RATES[this._currentLevel]);

					this.audioPlayer.playFX(
						AUDIO_EFFECTS_KEYS.COUNTDOWN_FINISH
					);
				} else {
					this._onCountdown(this._count);
					this.audioPlayer.playFX(AUDIO_EFFECTS_KEYS.COUNTDOWN);
				}
			}
		}

		this._dissolver.update();
		this._fallingTetromino.update(
			this._upPressed,
			this._downPressed,
			this._leftPressed,
			this._rightPressed
		);
		this._particleSystem.update();
		this._toaster.update();
	};

	this._draw = () => {
		const ctx = window.gameContext;

		ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

		if (this._screenShakeEnabled && this._screenShaking) {
			ctx.save();
			ctx.translate(
				Math.random() * SCREEN_SHAKE_VALUE,
				Math.random() * SCREEN_SHAKE_VALUE
			);
		}

		// draw our cached canvas
		ctx.drawImage(this._cacheCanvas, 0, 0);

		this._dissolver.draw();
		this._fallingTetromino.draw();
		this._particleSystem.draw();
		this._toaster.draw();

		ctx.restore();
	};

	this.getStaticSquares = () => {
		return this._staticSquares;
	};
}
