import React, { useState } from 'react';

import { ColorsDropdown, StyleDropdown, LevelDropdown } from './Dropdowns';
import { roundTo } from './utils';

const Settings = ({ customization, setCustomization, onHide, onTestSound }) => {
	const [activeDropdown, setActiveDropdown] = useState(null);

	const dropdownHandler = (index) => {
		if (index === activeDropdown) {
			setActiveDropdown(null);
		} else {
			setActiveDropdown(index);
		}
	};

	const fxVolumeHandler = (value) => {
		const result = roundTo(customization.fxVolume + 0.1 * value, 1);
		if (result >= 0 && result <= 1) {
			onTestSound(result);
			setCustomization({
				...customization,
				fxVolume: result
			});
		}
	};

	const musicVolumeHandler = (value) => {
		const result = roundTo(customization.musicVolume + 0.1 * value, 1);
		if (result >= 0 && result <= 1) {
			onTestSound(result);
			setCustomization({
				...customization,
				musicVolume: result
			});
		}
	};

	const colorChangeHandler = (colors) => {
		setCustomization((current) => ({ ...current, colors }));
		setActiveDropdown(null);
	};

	const styleChangeHandler = (style) => {
		setCustomization((current) => ({ ...current, style }));
		setActiveDropdown(null);
	};

	const levelChangeHandler = (level) => {
		setCustomization((current) => ({ ...current, level }));
		setActiveDropdown(null);
	};

	const screenShakeHandler = () => {
		setCustomization((current) => ({
			...current,
			screenShake: !current.screenShake
		}));
	};

	return (
		<>
			<h1>Settings</h1>
			{activeDropdown !== null && (
				<div
					className="dropdown__cover"
					onClick={() => dropdownHandler(null)}
				/>
			)}
			<div>
				<ColorsDropdown
					onSelect={colorChangeHandler}
					onDropdown={dropdownHandler}
					active={activeDropdown == 0}
					activeOption={customization.colors}
				/>
				<StyleDropdown
					onSelect={styleChangeHandler}
					onDropdown={dropdownHandler}
					active={activeDropdown == 1}
					activeOption={customization.style}
				/>
				<LevelDropdown
					onSelect={levelChangeHandler}
					onDropdown={dropdownHandler}
					active={activeDropdown == 2}
					activeOption={customization.level}
				/>
			</div>

			<div
				className="custom-control custom-checkbox mb-3"
				onClick={screenShakeHandler}
			>
				<input
					type="checkbox"
					className="custom-control-input"
					onChange={() => null}
					checked={customization.screenShake}
				/>
				<label className="custom-control-label">Screen shake</label>
			</div>

			<div className="form-group mb-3">
				<label>FX Volume</label>
				<br />
				<button
					className="btn btn-outline-primary"
					onClick={() => fxVolumeHandler(-1)}
				>
					-
				</button>
				<div className="d-inline-block px-3">
					{customization.fxVolume}
				</div>
				<button
					className="btn btn-outline-primary"
					onClick={() => fxVolumeHandler(1)}
				>
					+
				</button>
			</div>

			<div className="form-group mb-3">
				<label>Music Volume</label>
				<br />
				<button
					className="btn btn-outline-primary"
					onClick={() => musicVolumeHandler(-1)}
				>
					-
				</button>
				<div className="d-inline-block px-3">
					{customization.musicVolume}
				</div>
				<button
					className="btn btn-outline-primary"
					onClick={() => musicVolumeHandler(1)}
				>
					+
				</button>
			</div>

			<button className="btn btn-outline-light" onClick={onHide}>
				Back
			</button>
		</>
	);
};

export default Settings;
