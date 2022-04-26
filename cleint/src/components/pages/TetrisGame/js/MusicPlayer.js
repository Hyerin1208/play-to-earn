import { AUDIO_MUSIC_KEYS } from '../constants';
import { logError, shuffleArray } from '../utils';

export function MusicPlayer(audioPlayer) {
	this.play = () => {};
	this.stop = () => {};

	if (!window.AudioContext) {
		return;
	}

	this._audioPlayer = audioPlayer;
	this._trackIndex = 0;
	this._playing = false;
	this._trackTimeout = null;
	this._musicSources = [];

	// filter audio keys that contain music
	this._musicKeys = Object.keys(AUDIO_MUSIC_KEYS).filter(
		(key) => key.indexOf('MUSIC_') > -1
	);

	shuffleArray(this._musicKeys);

	// play the next track
	this._playNext = () => {
		// stop any currently playing music
		this._stopTrack();

		const key = this._musicKeys[this._trackIndex];
		this._audioPlayer
			.playMusic(key)
			.then(({ buffer, source }) => {	
							
				this._musicSources.push(source);

				// set the duration as the length of the current song
				this._trackTimeout = setTimeout(
					this._playNext,
					buffer.duration * 1000
				);

				this._trackIndex++;

				// go back to zero if the track index is over the track length
				if (this._trackIndex > this._musicKeys.length - 1) {
					this._trackIndex = 0;
				}
			})
			.catch((error) => {
				logError('Error playing music.', error);
			});
	};

	this.play = () => {
		if (!this._playing) {
			this._playing = true;

			this._playNext();
		}
	};

	this.stop = () => {
		if (this._playing) {
			this._playing = false;

			if (this._trackTimeout) {
				clearTimeout(this._trackTimeout);
			}

			this._stopTrack();
		}
	};

	this._stopTrack = () => {
		this._musicSources.forEach((source) => {
			try {
				source.stop();
			} catch (e) {
				console.warn(e.message);
			}				
		});
	};
}
