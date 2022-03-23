import { CODES } from './constants';

export const initBoard = (width, height, mineCount) => {
	const candidates = Array(width * height).fill().map((v, i) => i);
	const shuffle = [];
	const boardData = [];

	while (candidates.length > width * height - mineCount) {
		const chosen = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
		shuffle.push(chosen);
	}

	for (let i = 0; i < height; i++) {
		const rowData = Array(width).fill(CODES.NOTHING);
		boardData.push(rowData);
	}

	for (let i = 0; i < shuffle.length; i++) {
		const x = shuffle[i] % width;
		const y = Math.floor(shuffle[i] / width);
		boardData[y][x] = CODES.MINE;
	}

	return boardData;
};

export const getNextCellCode = (code) => {
	switch (code) {
		case CODES.NOTHING: //û����
			return CODES.FLAG; //�Ҽ�ʱ����Ϊƽ�ز���
		case CODES.MINE://����������
			return CODES.MINE_FLAG; //�Ҽ�����Ϊ�����ϲ���״̬
		case CODES.FLAG://ƽ�ز���
			return CODES.QUESTION;//���ƽ���ʺ�
		case CODES.MINE_FLAG://���ϲ���
			return CODES.MINE_QUESTION;//��������ʺ�
		case CODES.QUESTION://ƽ���ʺ�
			return CODES.NOTHING;//�ָ��ɳ�ʼû���׵�״̬
		case CODES.MINE_QUESTION://�����ʺ�
			return CODES.MINE;//�ָ�Ϊ��������
		default:
			return code;
	}
};

export const getFlagIncDec = (code) => {
	switch (code) {
		case CODES.NOTHING:
		case CODES.MINE:
			return 1;
		case CODES.FLAG:
		case CODES.MINE_FLAG:
			return -1;
		default:
			return 0;
	}
};
//��չ������Ϣ�����ʱ���ã�����Ŀǰ����״���͵���ĸ��ӣ�������״���Լ���չ�ĸ�������
export const expandOpenedCell = (boardData, x, y) => {
	let openedCellCount = 0;

	// Define function to get mine count
	const getMineCount = (x, y) => {
		let aroundCode = [];
		let mineCount = 0;

		aroundCode = boardData[y - 1] ? aroundCode.concat(boardData[y - 1][x - 1], boardData[y - 1][x], boardData[y - 1][x + 1]) : aroundCode;
		aroundCode = aroundCode.concat(boardData[y][x - 1], boardData[y][x + 1]);
		aroundCode = boardData[y + 1] ? aroundCode.concat(boardData[y + 1][x - 1], boardData[y + 1][x], boardData[y + 1][x + 1]) : aroundCode;

		mineCount = aroundCode.filter(v => [
			CODES.MINE,
			CODES.MINE_FLAG,
			CODES.MINE_QUESTION
		].includes(v)).length;

		return mineCount;
	};

	// Using DFS algorithm to expand
	const dfsSearch = (x, y) => {
		if (boardData[y][x] !== CODES.NOTHING) {
			return;
		}

		boardData[y][x] = getMineCount(x, y);
		openedCellCount++;

		let aroundPoint = [];
		aroundPoint = boardData[y - 1] ? aroundPoint.concat({ x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 }) : aroundPoint;
		aroundPoint = aroundPoint.concat({ x: x - 1, y }, { x: x + 1, y });
		aroundPoint = boardData[y + 1] ? aroundPoint.concat({ x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }) : aroundPoint;

		if (boardData[y][x] === 0) {
			aroundPoint.forEach((v) => {
				dfsSearch(v.x, v.y);
			});
		}
	};

	dfsSearch(x, y);
	return { boardData, openedCellCount };
};