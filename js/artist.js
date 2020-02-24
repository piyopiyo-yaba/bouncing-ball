/*
 定数なし
*/
// --------------------------------[artist]-----オブジェクトー-----------------------------------

yabaGameProto0.artist = (function () {
	const drawMode = {

		ball: (ball, ctx) => {
			const o = ball.getO();

			ctx.beginPath();
			ctx.fillStyle = ball.color;
			ctx.arc(o.x, o.y, ball.r, 0, 2 * Math.PI);
			ctx.fill();
		},
	};

	const drawSprite = (sprite, ctx) => { drawMode[sprite.getType()](sprite, ctx) };

	const drawSpriteCollisionPoints = (sprite, ctx) => {
		const SpriteCollisionPoints = sprite.getCollisionPoints();

		for (let i = 0; i < SpriteCollisionPoints.length; i += 1) {
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.arc(
				SpriteCollisionPoints[i].x,
				SpriteCollisionPoints[i].y,
				1,
				0,
				2 * Math.PI
			);
			ctx.fill();
		}
	};

	return {
		drawSprite: drawSprite,
		drawSpriteCollisionPoints: drawSpriteCollisionPoints,
	};

})();