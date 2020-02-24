/*
 .prototype.enque : 続けて二回同じノードをエンキューするとそのノードは自己参照する(バグる)
 .prototype.remove : そのリストにノードが繋がれているという前提がないと不整合(リストの破壊)起きる。
*/

// --------------------------------[LinkList]-----コンストラクタメソッド-----------------------------------

yabaGameProto0.LinkList = function () {
	this.head = null;
	this.tail = null;
};

// --------------------------------[LinkList]-----プロトタイプメソッド-----------------------------------

yabaGameProto0.LinkList.prototype.enque = function (node) {
	if (this.head !== null && this.tail !== null) {
		this.tail.nextNode = node;
		node.preNode = this.tail;
		this.tail = node;

		return;
	}
	this.head = node;
	this.tail = node;
};

yabaGameProto0.LinkList.prototype.remove = function (node) {
	if (node.preNode === null) this.head = node.nextNode;
	else node.preNode.nextNode = node.nextNode;

	if (node.nextNode === null) this.tail = node.preNode;
	else node.nextNode.preNode = node.preNode;

	node.preNode = node.nextNode = null;
};
