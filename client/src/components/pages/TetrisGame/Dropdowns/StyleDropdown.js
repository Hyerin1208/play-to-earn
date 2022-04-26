import React from 'react';
import { BRICK_STYLES } from '../constants';

const StyleDropdown = ({ onSelect, onDropdown, active, activeOption }) => (
	<div className={`dropdown mb-3 ${active ? 'show' : ''}`}>
		<button
			className="btn btn-outline-light dropdown-toggle w-100"
			onClick={() => onDropdown(1)}
		>
			Brick style
		</button>
		{active && (
			<div
				className={`dropdown-menu dropdown-menu-right p-0 ${
					active ? 'show' : ''
				}`}
			>
				{BRICK_STYLES.map((style, index) => (
					<div key={index}>
						<button
							className={`btn btn-sm w-100 text-left ${
								activeOption === index
									? 'btn-primary'
									: 'btn-light'
							}`}
							onClick={() => onSelect(index)}
						>
							{style}
						</button>
					</div>
				))}
			</div>
		)}
	</div>
);

export default StyleDropdown;
