import { AUDIO_EFFECTS, AUDIO_MUSIC, AUDIO_EFFECTS_KEYS } from '../constants';

import { logError, randomNumber } from '../utils';

export function AudioPlayer() {
	this.mute = () => {};
	this.unMute = () => {};
	this.setFXVolume = () => {};
	this.setMusicVolume = () => {};
	this.getDuration = () => {};
	this.playFXGained = () => {};
	this.playFXPitched = () => {};
	this.playFX = () => {};
	this.playMusic = () => {};
	this.stopMusic = () => {};

	if (!window.AudioContext) {
		console.warn(
			'AudioContext not supported in this browser.  Audio unavailable.'
		);
		return;
	}

	this._bufferMap = {};
	this._context = new AudioContext();

	this._fxGain = 1;
	this._musicGain = 1;

	// create our master gain node
	this._masterNode = this._context.createGain();

	// create other gain nodes
	this._fxNode = this._context.createGain();
	this._musicNode = this._context.createGain();
	this._testNode = this._context.createGain();

	// connect the master node to the context
	this._masterNode.connect(this._context.destination);

	// connect other nodes to master node
	this._fxNode.connect(this._masterNode);
	this._musicNode.connect(this._masterNode);
	this._testNode.connect(this._masterNode);

	this._loadSource = (url) => {
		return new Promise((res, rej) => {
			const request = new XMLHttpRequest();

			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = () => {
				this._context
					.decodeAudioData(request.response)
					.then(res)
					.catch(rej);
			};
			request.send();
		});
	};

	// load the sound effects into the buffer map
	// Object.keys(AUDIO_EFFECTS_KEYS).forEach((key) => {
	// 	this._loadSource(AUDIO_EFFECTS[key].default)
	// 		.then((buffer) => {
	// 			this._bufferMap[key] = buffer;
	// 		})
	// 		.catch((error) => {
	// 			logError('Error loading sound effect source.', error);
	// 		});
	// });

	this._playSource = (buffer, node, rate) => {
		const source = this._context.createBufferSource();

		source.playbackRate.value = rate || 1;
		source.buffer = buffer;
		source.connect(node);
		source.start();

		return source;
	};

	this.mute = () => {
		this._masterNode.gain.setValueAtTime(0, this._context.currentTime);
	};

	this.unMute = () => {
		this._masterNode.gain.setValueAtTime(1, this._context.currentTime);
	};

	this.playFXPitched = (key, shift) => {
		const rate = randomNumber(-shift, shift) * 0.1 + 1;
		this.playFX(key, rate);
	}

	this.playFXGained = (key, gain) => {
		this._testNode.gain.setValueAtTime(gain, this._context.currentTime);
		this._playSource(this._bufferMap[key], this._testNode);
	};

	this.playFX = (key, rate) => {
		this._playSource(this._bufferMap[key], this._fxNode, rate);
	};

	this.playMusic = (key) => {
		return new Promise((res, rej) => {
			// music is loaded on the fly 
			this._loadSource(AUDIO_MUSIC[key].default)
				.then((buffer) => {
					res({
						buffer,
						source: this._playSource(buffer, this._musicNode, 1)
					});
				})
				// .catch((error) => {
				// 	logError('Error loading music source.', error);
				// 	rej();
				// });
		});
	};

	this.setFXVolume = (gain) => {
		this._fxGain = gain;
		this._fxNode.gain.setValueAtTime(gain, this._context.currentTime);
	};

	this.setMusicVolume = (gain) => {
		this._musicGain = gain;
		this._musicNode.gain.setValueAtTime(gain, this._context.currentTime);
	};
}
