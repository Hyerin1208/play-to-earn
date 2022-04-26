import {
  VERTICAL_REPEAT_RATE,
  HORIZONTAL_REPEAT_RATE,
  INPUT_REPEAT_BUILD,
  SQUARE_LENGTH,
  ROW_COUNT,
  COL_COUNT,
  GHOST_PIECE_ALPHA,
  AUDIO_EFFECTS_KEYS,
} from "../constants";

export function Tetromino(
  getStaticSquares,
  onGameOver,
  onTetrominoLock,
  onScoreIncrement,
  audioPlayer,
  x,
  y,
  row,
  col,
  meta,
  dropRate
) {
  this._x = x;
  this._y = y;
  this._row = row;
  this._col = col;
  this._meta = meta;
  this._rotation = 0;

  this._getStaticSquares = getStaticSquares;
  this._onGameOver = onGameOver;
  this._onTetrominoLock = onTetrominoLock;
  this._onScoreIncrement = onScoreIncrement;
  this._audioPlayer = audioPlayer;

  this._rotationReset = false;
  this._active = false;

  this._ticks = 0;
  this._dropRate = dropRate;

  this._droppedRows = 0;

  this._ghostY = -1;

  this._downInputHandler = () => {
    if (this._active) {
      this._audioPlayer.playFXPitched(AUDIO_EFFECTS_KEYS.SOFT_DROP, 1);

      // 1 point added for each soft dropped row
      this._droppedRows++;

      this._moveDown();
      this._ticks = 0;
    }
  };

  this._leftInputHandler = () => {
    if (
      this._active &&
      !this._checkCollision(this._col - 1, this._row, this._rotation)
    ) {
      this._audioPlayer.playFXPitched(AUDIO_EFFECTS_KEYS.MOVE, 1);

      this._setPos(this._col - 1, this._row);

      // calculate ghost row position
      this._getghostY();
    }
  };

  this._rightInputHandler = () => {
    if (
      this._active &&
      !this._checkCollision(this._col + 1, this._row, this._rotation)
    ) {
      this._audioPlayer.playFXPitched(AUDIO_EFFECTS_KEYS.MOVE, 1);

      this._setPos(this._col + 1, this._row);

      // calculate ghost row position
      this._getghostY();
    }
  };

  this._downInput = new InputRepeater(
    this._downInputHandler,
    VERTICAL_REPEAT_RATE
  );
  this._leftInput = new InputRepeater(
    this._leftInputHandler,
    HORIZONTAL_REPEAT_RATE
  );
  this._rightInput = new InputRepeater(
    this._rightInputHandler,
    HORIZONTAL_REPEAT_RATE
  );

  this._setPos = (col, row) => {
    this._col = col;
    this._row = row;

    this._x = this._col * SQUARE_LENGTH;
    this._y = this._row * SQUARE_LENGTH;
  };

  this._checkCollision = (col, row, rotation, squares) => {
    const layout = this._meta.layouts[rotation] || this._meta.layouts[0];
    let collided = false;

    const staticSquares = squares || this._getStaticSquares();

    for (let i = 0; i < layout.pattern.length; i++) {
      const nextCol = col + layout.offset[0] + layout.pattern[i][0];
      const nextRow = row + layout.offset[1] + layout.pattern[i][1];

      if (nextRow >= ROW_COUNT || nextCol < 0 || nextCol >= COL_COUNT) {
        collided = true;
        break;
      }

      for (let j = 0; j < staticSquares.length; j++) {
        if (
          nextCol === staticSquares[j].col &&
          nextRow === staticSquares[j].row
        ) {
          collided = true;
          break;
        }
      }

      if (collided) {
        break;
      }
    }

    return collided;
  };

  this._moveDown = (row) => {
    // if we can't move anywhere
    if (this._checkCollision(this._col, this._row, this._rotation)) {
      // game over
      this._onGameOver();
    } else {
      if (
        row === undefined &&
        !this._checkCollision(this._col, this._row + 1, this._rotation)
      ) {
        // move down one if we can
        this._setPos(this._col, this._row + 1);
      } else {
        if (row !== undefined) {
          this._row = row;
        }

        // collided
        this._active = false;

        const layout =
          this._meta.layouts[this._rotation] || this._meta.layouts[0];
        const squares = layout.pattern.map((pair, i) => {
          const col = this._col + layout.offset[0] + layout.pattern[i][0];
          const row = this._row + layout.offset[1] + layout.pattern[i][1];
          return {
            square: this._meta.square,
            col,
            row,
            x: col * SQUARE_LENGTH,
            y: row * SQUARE_LENGTH,
          };
        });

        this._onScoreIncrement(this._droppedRows);

        // add the static squares
        this._onTetrominoLock(squares);
      }
    }
  };

  this.hardDrop = () => {
    if (!this._active) return;

    const staticSquares = this._getStaticSquares();

    let row = -1;

    for (let i = this._row + 1; i < ROW_COUNT; i++) {
      if (this._checkCollision(this._col, i, this._rotation, staticSquares)) {
        row = i - 1;
        break;
      }
    }

    if (row === -1) return;

    this._moveDown(row);
  };

  this._getghostY = () => {
    const staticSquares = this._getStaticSquares();
    let ghostY = -1;

    for (let i = this._row + 1; i < ROW_COUNT; i++) {
      if (this._checkCollision(this._col, i, this._rotation, staticSquares)) {
        ghostY = (i - 1) * SQUARE_LENGTH;
        break;
      }
    }

    this._ghostY = ghostY;
  };

  this.update = (up, down, left, right) => {
    if (!this._active) return;

    this._ticks++;
    if (this._ticks >= this._dropRate) {
      this._ticks = 0;
      this._moveDown();
    }

    if (up && !this._rotationReset) {
      let nextRotation = this._rotation + 1;

      if (nextRotation > 3) {
        nextRotation = 0;
      }

      if (!this._checkCollision(this._col, this._row, nextRotation)) {
        // play the rotate sound
        this._audioPlayer.playFXPitched(AUDIO_EFFECTS_KEYS.ROTATE, 1);

        this._rotation++;
        this._rotationReset = true;

        if (this._rotation > 3) {
          this._rotation = 0;
        }

        // calculate ghost row position
        this._getghostY();
      }
    } else if (!up && this._rotationReset) {
      this._rotationReset = false;
    }

    this._downInput.update(down);
    this._leftInput.update(left);
    this._rightInput.update(right);
  };

  this.draw = () => {
    if (!this._active) return;

    const image = this._meta.images[this._rotation] || this._meta.images[0];
    const ctx = window.gameContext;
    ctx.drawImage(image, this._x, this._y);

    if (this._ghostY !== -1) {
      ctx.save();
      ctx.globalAlpha = GHOST_PIECE_ALPHA;
      ctx.drawImage(image, this._x, this._ghostY);
      ctx.restore();
    }
  };

  this.reset = (col, row, meta, dropRate) => {
    this._meta = meta;
    this._rotation = 0;
    this._rotationReset = false;
    this._dropRate = dropRate;
    this._ticks = 0;
    this._active = true;
    this._droppedRows = 0;
    this._ghostY = -1;

    this._setPos(col, row);

    // calculate ghost row position
    this._getghostY();
  };
}

function InputRepeater(callback, rate) {
  // handles repeating input
  // callback happens immediately on press, then continuously at a set rate as long as the key is held

  this._buildUpTicks = 0;
  this._repeatTicks = 0;

  this._rate = rate;

  this._inputHandler = callback;

  this.update = (pressed) => {
    if (pressed) {
      // if it's the first time being pressed
      if (this._buildUpTicks === 0) {
        this._buildUpTicks++;
        this._inputHandler();
      } else if (this._buildUpTicks < INPUT_REPEAT_BUILD) {
        this._buildUpTicks++;
      } else {
        if (this._repeatTicks < this._rate) {
          this._repeatTicks++;
        } else {
          this._repeatTicks = 0;
          this._inputHandler();
        }
      }
    } else {
      this._buildUpTicks = 0;
      this._repeatTicks = 0;
    }
  };
}
