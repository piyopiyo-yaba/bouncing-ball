/*

*/

// --------------------------------[util]-----オブジェクト-----------------------------------

yabaGameProto0.util = (function () {
    return {
        calcNumberOfTermsTo: (term, r) => (Math.pow(r, term) - 1) / (r - 1),    // 初項1 公比 <r> とする等比数列の第<term>項までの総和を求める
        random: (min, max) => {                                                 // min <= num < max までの乱数<num>を返す
            const num = Math.floor(Math.random() * (max - min)) + min;
            return num;
        },
        round: (number, precision) => {
            const shift = function (number, precision, reverseShift) {
                if (reverseShift) {
                    precision = -precision;
                }
                const numArray = ("" + number).split("e");
                return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
            };
            return shift(Math.round(shift(number, precision, false)), precision, true);
        },
    };
})();