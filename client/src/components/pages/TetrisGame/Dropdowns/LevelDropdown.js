import React from 'react';

const levels = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20]
];

const LevelDropdown = ({ onSelect, onDropdown, active, activeOption }) => (
	<div className={`dropdown mb-3 ${active ? 'show' : ''}`}>
		<button
			className="btn btn-outline-light dropdown-toggle w-100"
			onClick={() => onDropdown(2)}
		>
			Start level
		</button>
		{active && (
			<div
				className={`dropdown-menu dropdown-menu-right p-0 ${
					active ? 'show' : ''
				}`}
			>
				{levels.map((chunk, index) => (
					<div key={index} className="d-flex">
						{chunk.map((level) => {
							return (
								<button
									className={`customize__level-item btn btn-sm p-0 ${
										activeOption === level
											? 'btn-primary'
											: 'btn-light'
									}`}
									key={level}
									onClick={() => onSelect(level)}
								>
									{level}
								</button>
							);
						})}
					</div>
				))}
			</div>
		)}
	</div>
);

export default LevelDropdown;
