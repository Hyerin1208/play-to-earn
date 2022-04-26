import { randomNumber, map } from '../utils';

export function ParticleSystem() {
	this._particles = [];

	this.burst = (x, y, count, particleOptions) => {
		for (let i = 0; i < count; i++) {
			this._particles.push(new Particle(x, y, particleOptions));
		}
	};

	this.update = () => {
		for (let i = this._particles.length - 1; i >= 0; i--) {
			this._particles[i].update();

			if (!this._particles[i].active) {
				this._particles.splice(i, 1);
			}
		}
	};

	this.draw = () => {
		for(let i = 0; i < this._particles.length; i++) {
			this._particles[i].draw();
		}
	};
}

function Particle(x, y, options) {
	const {
		speed,
		lifetime,
		rotation,
		alpha,
		scale,
		gravity,
		sprite,
		direction
	} = options;

	this._x = x;
	this._y = y;

	this._ticks = 0;
	this._lifetime = randomNumber(lifetime.min, lifetime.max);
	this._speed = randomNumber(speed.min, speed.max);
	this._gravity = gravity;
	this._rotation = randomNumber(rotation.min, rotation.max);
	this._rotationIncrease = randomNumber(
		rotation.increase.min,
		rotation.increase.max
	);
	this._alpha = randomNumber(alpha.min, alpha.max);
	this._alphaRate = this._alpha / this._lifetime;

	this._scale = randomNumber(scale.min, scale.max);
	this._direction = randomNumber(direction.min, direction.max);
	this._sprite = sprite;

	this._xIncrement = Math.cos(this._direction) * this._speed;
	this._yIncrement = Math.sin(this._direction) * this._speed;

	this.active = true;

	this.update = () => {
		this._ticks++;

		// decrease alpha
		this._alpha -= this._alphaRate;

		// increase rotation
		this._rotation += this._rotationIncrease;

		// move position
		this._x += this._xIncrement;
		this._y += this._yIncrement;

		this._yIncrement += this._gravity;

		if (this._ticks >= this._lifetime) {
			this.active = false;
		}
	};

	this.draw = () => {
		const ctx = window.gameContext;
		ctx.globalAlpha = this._alpha;

		ctx.save();
		ctx.translate(this._x, this._y);
		ctx.rotate(this._rotation);
		ctx.scale(this._scale, this._scale);
		ctx.drawImage(this._sprite, -32, -32);
		ctx.restore();

		ctx.globalAlpha = 1;
	};
}
