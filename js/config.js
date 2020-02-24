/*
いや、定数の宣言を1つにまとめておく必要はないか。それぞれの即時関数の中で宣言することにしよう。
いや、定数の宣言は1つにまとめて、全部引数で渡そう。
世界の広さとビューの画角を混同してはいけない。
ただし現段階では、世界の広さ　＝　画角、つまり1倍の拡大率で全世界を表示しているということにしておく
*/

// --------------------------------[config]-----オブジェクト-----------------------------------
yabaGameProto0.config = (function () {
    const util = yabaGameProto0.util;

    let STANDARD_LENGTH = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    const QUAD = 4; // 四分割
    const NUMBER_OF_CLEAVAGE = 5;					// 分割回数
    const NUMBER_OF_SPACE_LEVEL = NUMBER_OF_CLEAVAGE + 1;
    const NUMBER_OF_TERMS = util.calcNumberOfTermsTo(NUMBER_OF_SPACE_LEVEL, QUAD);
    const NUMBER_OF_CELLS = Math.pow(QUAD, NUMBER_OF_CLEAVAGE);	// 最下位空間のセルの総数
    const NUMBER_OF_ROWS_COLS = Math.sqrt(NUMBER_OF_CELLS);	// 最下位空間の1辺に並ぶセルの数
    const UNIT_LENGTH = util.round( (STANDARD_LENGTH / NUMBER_OF_ROWS_COLS), 3);	// 最下位空間のセルの1辺のピクセル数

    return {
        getConfig: () => {
            return {
                STANDARD_LENGTH: STANDARD_LENGTH,
                QUAD: QUAD,
                NUMBER_OF_SPACE_LEVEL: NUMBER_OF_SPACE_LEVEL,
                NUMBER_OF_TERMS: NUMBER_OF_TERMS,
                NUMBER_OF_CELLS: NUMBER_OF_CELLS,
                UNIT_LENGTH: UNIT_LENGTH,
            };
        },
    };
})();