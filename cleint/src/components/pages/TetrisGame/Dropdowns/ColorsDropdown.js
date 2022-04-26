import React from 'react';
import { COLOR_PALETTES } from '../constants';

const ColorsDropdown = ({ onSelect, onDropdown, active, activeOption }) => (
	<div className={`dropdown mb-3 ${active ? 'show' : ''}`}>
		<button
			className="btn btn-outline-light dropdown-toggle w-100"
			onClick={() => onDropdown(0)}
		>
			Colors
		</button>
		<div
			className={`dropdown-menu dropdown-menu-right p-0 ${
				active ? 'show' : ''
			}`}
		>
			{COLOR_PALETTES.map((palette, index) => (
				<button
					className={`btn w-100 d-flex ${
						activeOption === index ? 'btn-primary' : 'btn-light'
					}`}
					key={index}
					onClick={() => onSelect(index)}
				>
					{palette.map((color, colorIndex) => (
						<div
							className="customize__color-preview"
							key={colorIndex}
							style={{
								background: color
							}}
						/>
					))}
				</button>
			))}
		</div>
	</div>
);

export default ColorsDropdown;
