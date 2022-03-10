export const MAX_VOLUME = 0.2;

export const TOAST_COOLDOWN = 50;

export const AUDIO_EFFECTS_KEYS = {
	MOVE: 'MOVE',
	ROTATE: 'ROTATE',
	SOFT_DROP: 'SOFT_DROP',
	IMPACT: 'IMPACT',
	EXPLOSION: 'EXPLOSION',
	GAME_OVER: 'GAME_OVER',
	NEW_LEVEL: 'NEW_LEVEL',
	LOSING_IMPACT: 'LOSING_IMPACT',
	JINGLE: 'JINGLE',
	GAME_START: 'GAME_START',
	COUNTDOWN: 'COUNTDOWN',
	COUNTDOWN_FINISH: 'COUNTDOWN_FINISH',
	SHORT_CHOIR: 'SHORT_CHOIR'
};

export const AUDIO_MUSIC_KEYS = {
	MUSIC_0: 'MUSIC_0',
	MUSIC_1: 'MUSIC_1',
	MUSIC_2: 'MUSIC_2',
	MUSIC_3: 'MUSIC_3',
	MUSIC_4: 'MUSIC_4',
	MUSIC_5: 'MUSIC_5',
	MUSIC_6: 'MUSIC_6',
	MUSIC_7: 'MUSIC_7',
	MUSIC_8: 'MUSIC_8'
};

export const AUDIO_EFFECTS = {
	[AUDIO_EFFECTS_KEYS.MOVE]: require('../assets/sounds/move.wav'),
	[AUDIO_EFFECTS_KEYS.ROTATE]: require('../assets/sounds/rotate.wav'),
	[AUDIO_EFFECTS_KEYS.SOFT_DROP]: require('../assets/sounds/soft_drop.wav'),
	[AUDIO_EFFECTS_KEYS.IMPACT]: require('../assets/sounds/impact.wav'),
	[AUDIO_EFFECTS_KEYS.EXPLOSION]: require('../assets/sounds/explosion.wav'),
	[AUDIO_EFFECTS_KEYS.GAME_OVER]: require('../assets/sounds/lose.wav'),
	[AUDIO_EFFECTS_KEYS.NEW_LEVEL]: require('../assets/sounds/new_level.wav'),
	[AUDIO_EFFECTS_KEYS.LOSING_IMPACT]: require('../assets/sounds/losing_impact.wav'),
	[AUDIO_EFFECTS_KEYS.JINGLE]: require('../assets/sounds/jingle.wav'),
	[AUDIO_EFFECTS_KEYS.GAME_START]: require('../assets/sounds/game_start.wav'),
	[AUDIO_EFFECTS_KEYS.COUNTDOWN]: require('../assets/sounds/countdown_count.wav'),
	[AUDIO_EFFECTS_KEYS.COUNTDOWN_FINISH]: require('../assets/sounds/countdown_finish.wav'),
	[AUDIO_EFFECTS_KEYS.SHORT_CHOIR]: require('../assets/sounds/short_choir.wav')
};

export const AUDIO_MUSIC = {
	[AUDIO_MUSIC_KEYS.MUSIC_0]: require('../assets/music/snd_music_0.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_1]: require('../assets/music/snd_music_1.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_2]: require('../assets/music/snd_music_2.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_3]: require('../assets/music/snd_music_3.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_4]: require('../assets/music/snd_music_4.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_5]: require('../assets/music/snd_music_5.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_6]: require('../assets/music/snd_music_6.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_7]: require('../assets/music/snd_music_7.mp3'),
	[AUDIO_MUSIC_KEYS.MUSIC_8]: require('../assets/music/snd_music_8.mp3')
};

export const BACKGROUND = [
	[0, 0, 0, 0],
	[1, 4, 0, 0],
	[6, 2, 1, 0],
	[5, 5, 1, 0],
	[3, 6, 2, 3],
	[3, 8, 0, 0],
	[2, 6, 2, 0],
	[1, 0, 1, 0],
	[4, 0, 4, 3],
	[3, 3, 5, 3],
	[1, 6, 4, 0],
	[0, 1, 4, 0],
	[6, 4, 5, 0],
	[5, 2, 4, 1],
	[6, 8, 6, 3],
	[4, 7, 7, 3],
	[2, 5, 5, 1],
	[1, 6, 7, 1],
	[0, 3, 5, 1],
	[6, 4, 8, 1],
	[2, 2, 6, 1],
	[0, 10, 8, 2],
	[5, 5, 8, 0],
	[4, 5, 11, 3],
	[2, 3, 12, 3],
	[1, 8, 10, 3],
	[6, 0, 11, 3],
	[5, 1, 13, 3],
	[2, 7, 13, 3],
	[0, 9, 14, 3],
	[6, 4, 14, 3],
	[5, 6, 14, 3],
	[3, 2, 11, 0],
	[2, 7, 13, 0],
	[1, 5, 13, 0],
	[0, 6, 15, 0],
	[6, 3, 14, 0],
	[5, 2, 11, 1],
	[1, 3, 16, 2],
	[0, 0, 17, 3],
	[5, 3, 18, 3],
	[4, 3, 19, 2],
	[1, 2, 19, 2],
	[3, 7, 18, 3],
	[1, 5, 18, 3],
	[0, 0, 19, 0],
	[3, 6, 17, 1],
	[4, 4, 20, 3],
	[3, 9, 20, 2],
	[1, 10, 20, 2]
];

export const COLOR_PALETTES = [
	[
		'#f94144',
		'#f3722c',
		'#f8961e',
		'#f9c74f',
		'#90be6d',
		'#43aa8b',
		'#577590'
	],
	[
		'#54478c',
		'#048ba8',
		'#0db39e',
		'#16db93',
		'#b9e769',
		'#efea5a',
		'#f1c453'
	],
	[
		'#9d0208',
		'#d00000',
		'#dc2f02',
		'#e85d04',
		'#f48c06',
		'#faa307',
		'#ffba08'
	],
	[
		'#f72585',
		'#b5179e',
		'#7209b7',
		'#3a0ca3',
		'#3f37c9',
		'#4895ef',
		'#4cc9f0'
	],
	[
		'#007f5f',
		'#2b9348',
		'#55a630',
		'#80b918',
		'#bfd200',
		'#dddf00',
		'#ffff3f'
	],
	[
		'#484a47',
		'#5c6d70',
		'#a37774',
		'#e88873',
		'#e0ac9d',
		'#f9e7e7',
		'#b4dc7f'
	]
];

export const BRICK_STYLES = ['Bubbly', 'Brick', 'Plain', 'Future'];

// the size of the inner square
export const INSET = 0.6;

// how much lighter the highlights are
export const LUMINANCE_LIGHT = 0.7;

// how much darker the shadows are
export const LUMINANCE_DARK = -0.4;

// index is the level, value is the amount of frames that pass before the tetromino falls one row
export const DROP_RATES = [
	53,
	49,
	45,
	41,
	37,
	33,
	28,
	22,
	17,
	11,
	10,
	9,
	8,
	7,
	6,
	6,
	5,
	5,
	4,
	4,
	3
];

// each is how many points the player gets for single, double, triple, and tetris
export const POINTS = [40, 100, 300, 1200];

// how many frames pass between repeated inputs for down
export const VERTICAL_REPEAT_RATE = 2;

// how many frames pass between repeated inputs for left and right
export const HORIZONTAL_REPEAT_RATE = 2;

// how many frames an input has to be given before repeating starts
export const INPUT_REPEAT_BUILD = 16;

// how fast columns dissolve for cleared rows
export const DISSOLVE_RATE = 6;

// how quickly to flash
export const DISSOLVE_FLASH_RATE = 4;

export const CANVAS_WIDTH = 360;
export const CANVAS_HEIGHT = CANVAS_WIDTH * 2;

export const ROW_COUNT = 20;
export const COL_COUNT = 10;

// how long after a piece spawns before it becomes
export const ENTRY_DELAY = 4;

// width/height of the squares
export const SQUARE_LENGTH = Math.round(CANVAS_WIDTH / COL_COUNT);

export const SCREEN_SHAKE_DURATION = 45;
export const SCREEN_SHAKE_VALUE = 4;

export const GHOST_PIECE_ALPHA = 0.2;

export const PARTICLE_OPTIONS_FLARE = {
	speed: {
		min: 1,
		max: 4
	},
	lifetime: {
		min: 60,
		max: 240
	},
	rotation: {
		min: 0,
		max: Math.PI * 2,
		increase: {
			min: -0.2,
			max: 0.2
		}
	},
	alpha: {
		min: 0.6,
		max: 1
	},
	scale: {
		min: 0.1,
		max: 0.4
	},
	direction: {
		min: Math.PI,
		max: Math.PI * 2
	},
	gravity: 0.2,
	sprite: null
};
