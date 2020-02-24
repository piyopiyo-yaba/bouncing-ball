/*
2:11 2020/02/22 当たり判定はcontext.isPointInPathでやろうと思う。そんで、形状ごとにpointを返す
　定数なし
*/

// --------------------------------[Ball]-----コンストラクタメソッド-----------------------------------

yabaGameProto0.Ball = (function () {
	const LinkListNodeForObject = yabaGameProto0.LinkListNodeForObject;

	return function (x, y, radius, velX, velY, color) {
		this.left = x;
		this.top = y;
		this.r = radius;
		this.velX = velX;
		this.velY = velY;
		this.color = color;
		this.objForTree = new LinkListNodeForObject(this);
	};
})();

// --------------------------------[Ball]-----静的メソッドー-------------------------------------

yabaGameProto0.Ball.getXYObject = (x, y) => { return { x: x, y: y, } };
yabaGameProto0.Ball.getMyInformation = (ball) => console.table(ball);
yabaGameProto0.Ball.count = 0;

// --------------------------------[Ball]-----プロトタイプメソッドー-----------------------------

yabaGameProto0.Ball.prototype.getType = (function () {
	const type = "ball";
	return () => type;
})();

yabaGameProto0.Ball.prototype.getBoundingBox = (function () {
	return function () {
		const d = this.r * 2;
		return {
			left: this.left,
			top: this.top,
			width: d,
			height: d,
		};
	};
})();

yabaGameProto0.Ball.prototype.getO = function () {
	return yabaGameProto0.Ball.getXYObject(this.left + this.r, this.top + this.r);
};

yabaGameProto0.Ball.prototype.update = function (width, height) {
	const d = this.r * 2;

	if ((this.left + d) >= width) {
		this.velX = -(this.velX);
	}
	if (this.left <= 0) {
		this.velX = -(this.velX);
	}

	if ((this.top + d) >= height) {
		this.velY = -(this.velY);
	}

	if (this.top <= 0) {
		this.velY = -(this.velY);
	}

	this.left += this.velX;
	this.top += this.velY;
};

yabaGameProto0.Ball.prototype.collisionDetect = function (otherSprite, ctx) {
	yabaGameProto0.Ball.count++; 	//　計測用
	const border = this.r > otherSprite.r ? this.r : otherSprite.r;
	const myO = this.getO();
	const otherO = otherSprite.getO();
	const dx = Math.abs(myO.x - otherO.x);
	const dy = Math.abs(myO.y - otherO.y);

	return dx <= border && dy <= border;
	/*
		const otherSpriteCollisionPoints = otherSprite.getCollisionPoints();
		
		otherSpriteCollisionPoints.push({	// 呼び出し側ボールインスタンスの中心座標(番兵)
					x: this.o.x,
					y: this.o.y,
					});	
		ctx.beginPath();
		ctx.arc(this.o.x, this.o.y, this.r, 0, 2 * Math.PI);
		
		let hit = false,
			i = 0;
	
		while(! hit) {
			hit = ctx.isPointInPath (otherSpriteCollisionPoints[i].x, otherSpriteCollisionPoints[i].y);
			i += 1;
		}
		return	i === otherSpriteCollisionPoints.length ? !hit : hit;
	*/
};

yabaGameProto0.Ball.prototype.getCollisionPoints = function () {		// バウンディングボックスは【ひし形】とした。
	const o = this.getO();
	const getXYObject = yabaGameProto0.Ball.getXYObject;

	return [
		getXYObject(o.x, o.y),	// 中心
		getXYObject(this.left, o.y),	// 9時方向
		getXYObject(o.x, this.top),	// 0時方向
		getXYObject(o.x + this.r, o.y),	// 3時方向
		getXYObject(o.x, o.y + this.r)	// 6時方向
	];
};
