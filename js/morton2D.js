/*

*/

// -----------------[morton2D]-----オブジェクト-----------------------------------

yabaGameProto0.mortonSpaceObjectModel.morton2D = (function () {
	const util = yabaGameProto0.util;
	const { STANDARD_LENGTH, QUAD, NUMBER_OF_CELLS, UNIT_LENGTH } = yabaGameProto0.config.getConfig();

	const NUMBER_OF_BITS = Math.log2(NUMBER_OF_CELLS);					// NUMBER_OF_CELLSのビット数
	const UNIT_SHIFT = 2;												// 2ビット(4通り)毎のシフト
	const MASK_FOR_SPACE_LEVEL = 0b11 << NUMBER_OF_BITS - UNIT_SHIFT;	// オブジェクトの所属空間レベルを求めるのに使う

	const getLinerQuarternaryTreeIndex = (left, top, width, height) => {
		left = Math.max(0, Math.min(left, STANDARD_LENGTH));
		top = Math.max(0, Math.min(top, STANDARD_LENGTH));

		const leftTopMortonNumber = to2DMortonNumber(left, top);
		const rightBottomMortonNumber = to2DMortonNumber(left + width, top + height);

		return toLinerQuarternaryTreeIndex(leftTopMortonNumber, rightBottomMortonNumber);
	};

	const toLinerQuarternaryTreeIndex = (leftTopMortonNumber, rightBottomMortonNumber) => {

		let i;
		const resultXOR = leftTopMortonNumber ^ rightBottomMortonNumber;

		for (i = 0; i < NUMBER_OF_BITS; i += UNIT_SHIFT) {
			if ((resultXOR & MASK_FOR_SPACE_LEVEL >> i) > 0) break;
		}

		const spaceLevel = i / UNIT_SHIFT;
		const indexOnSpaceLevel = leftTopMortonNumber >> NUMBER_OF_BITS - i;

		return util.calcNumberOfTermsTo(spaceLevel, QUAD) + indexOnSpaceLevel;

	};

	const to2DMortonNumber = (x, y) => {	// 座標からモートン順序を求める
		x = Math.floor(x / UNIT_LENGTH);
		y = Math.floor(y / UNIT_LENGTH);
		return (bitSeparate32(x) | (bitSeparate32(y) << 1));
	};

	const bitSeparate32 = (n) => {
		n = (n | (n << 8)) & 0b00000000111111110000000011111111;
		n = (n | (n << 4)) & 0b00001111000011110000111100001111;
		n = (n | (n << 2)) & 0b00110011001100110011001100110011;
		return (n | (n << 1)) & 0b01010101010101010101010101010101;
	};

	return {
		getLinerQuarternaryTreeIndex: getLinerQuarternaryTreeIndex,
	};
})(); 