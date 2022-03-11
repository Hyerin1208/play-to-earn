import { TOAST_COOLDOWN } from '../constants';

export function Toaster() {
  this._toasts = [];
  this._toastsQueue = [];
  this._toastCooldown = TOAST_COOLDOWN;

  this._ids = 0;

  this.createToast = (text, color) => {
    this._toastsQueue.push(new Toast(text, color, this._ids++, this._removeToast));
  }

  this._removeToast = (id) => {
    this._toasts = this._toasts.filter((toast) => toast.id !== id);
  }

  this.update = () => {
    this._toastCooldown++;

    if(this._toastCooldown >= TOAST_COOLDOWN) {
      if(this._toastsQueue.length > 0) {
        this._toastCooldown = 0;
        this._toasts.push(this._toastsQueue.shift());
      }
    }

    for(let i = 0; i < this._toasts.length; i++) {
      this._toasts[i].update();
    }
  }

  this.draw = () => {
    for(let i = 0; i < this._toasts.length; i++) {
      this._toasts[i].draw();
    }
  }
}

function Toast(text, color, id, onDelete) {
  this.id = id;
  this._color = color || '#fff';
  this._y = 0;
  this._text = text;
  this._alpha = 1;
  this._onDelete = onDelete;

  this.update = () => {
    this._alpha -= 0.01;

    this._y += 0.5;

    if(this._alpha <= 0) {
      this._onDelete(this.id);
    }
  }

  this.draw = () => {
    const ctx = window.gameContext;
    ctx.globalAlpha = this._alpha;

    ctx.save();
		ctx.translate(180, 120);
		ctx.font = '36px Retro Gaming';
		ctx.textAlign = 'center';
		ctx.fillStyle = this._color;
		ctx.fillText(this._text, 0, this._y);
		ctx.restore();

    ctx.globalAlpha = 1;
  }
}