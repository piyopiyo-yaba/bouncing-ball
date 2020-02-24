/*
 23:56 2020/02/22 Morton2Dが登録するのではない。
*/

// -----------------[linerQuarternaryTree]-----オブジェクト-----------------------------------

yabaGameProto0.mortonSpaceObjectModel.linerQuarternaryTree = (function () {
	const LinkList = yabaGameProto0.LinkList;
	const { NUMBER_OF_TERMS, NUMBER_OF_SPACE_LEVEL, QUAD } = yabaGameProto0.config.getConfig();
	const util = yabaGameProto0.util;

	const linerQTree = Array(NUMBER_OF_TERMS).fill(null).map(() => new LinkList);

	const register = (sprite, index) => {
		const objForTree = sprite.objForTree;

		if (typeof objForTree.spaceIndex === "undefined") {
			objForTree.spaceIndex = index;
			linerQTree[index].enque(objForTree);
		} else if (objForTree.spaceIndex !== index) {
			linerQTree[objForTree.spaceIndex].remove(objForTree);	// まず空間登録を解除する
			objForTree.spaceIndex = index;				// 空間配列のインデックスを持つプロパティを新しい値で更新して
			linerQTree[objForTree.spaceIndex].enque(objForTree);	// 新たに空間登録を行う(その空間のリストに加わる)
		}
	};

	const collisionCandidateArray = [];

	const preOrder = (ctx, index = 0, spaceLevel = 0, indexInSpaceLevel = 0) => {
		if (spaceLevel >= NUMBER_OF_SPACE_LEVEL) return;
		const noNode = operateInPreOrder(linerQTree[index], ctx);
		const startIndex = util.calcNumberOfTermsTo(spaceLevel + 1, QUAD);

		for (let i = 0; i < QUAD; i += 1) {
			let indexInSpaceNextLevel = i + indexInSpaceLevel * QUAD;
			preOrder(
				ctx,
				startIndex + indexInSpaceNextLevel,
				spaceLevel + 1,
				indexInSpaceNextLevel
			);
			if (!noNode) collisionCandidateArray.pop();
		}
	};

	const operateInPreOrder = (linkList, ctx) => {
		if (linkList.head === null) return true;

		let subject = linkList.head;
		let candidateForCollision;

		while (subject !== linkList.tail) {	//　同一空間内の総当たり
			candidateForCollision = subject.nextNode;
			do {
				subject.sprite.collisionDetect(candidateForCollision.sprite, ctx);
			} while ((candidateForCollision = candidateForCollision.nextNode) !== null);
			subject = subject.nextNode;
		}

		let higherLinkList;

		for (let i = 0; i < collisionCandidateArray.length; i += 1) {	// 上位空間オブジェクトとの総当たりここで当たり判定の順番変えられる
			higherLinkList = collisionCandidateArray[i];
			subject = linkList.head;
			do {
				candidateForCollision = higherLinkList.head;
				do {
					subject.sprite.collisionDetect(candidateForCollision.sprite, ctx);
				} while ((candidateForCollision = candidateForCollision.nextNode) !== null);
			} while ((subject = subject.nextNode) !== null);
		}
		collisionCandidateArray.push(linkList);
		return false;
	};

	return {
		register: register,
		preOrder: preOrder,
	};
})();