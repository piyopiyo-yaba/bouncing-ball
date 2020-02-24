/*

*/
// --------------------------[yabaGameProto0]-----オブジェクト-----------------------------------
const yabaGameProto0 = (function () {
    const init = function () {
        const Ball = yabaGameProto0.Ball;
        const artist = yabaGameProto0.artist;
        const mortonSpaceObjectModel = yabaGameProto0.mortonSpaceObjectModel;
        const util = yabaGameProto0.util;
        const { STANDARD_LENGTH } = yabaGameProto0.config.getConfig();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = STANDARD_LENGTH;
        canvas.height = STANDARD_LENGTH;
        document.body.appendChild(canvas);
        document.body.style.setProperty("margin", "0");

        let balls = [];

        while (balls.length < 10000) {
            const r = util.random(5, 10);
            let ball = new Ball(
                // ball position always drawn at least one ball width
                // away from the adge of the canvas, to avoid drawing errors
                util.random(0, STANDARD_LENGTH - r * 2),
                util.random(0, STANDARD_LENGTH - r * 2),
                r,
                util.random(-7, 7),
                util.random(-7, 7),
                'rgb(' + util.random(0, 255) + ',' + util.random(0, 255) + ',' + util.random(0, 255) + ')',
            );
            mortonSpaceObjectModel.registerSprite(ball);
            balls.push(ball);
        }

        // define loop that keeps drawing the scene constantly
        const loop = () => {
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fillRect(0, 0, STANDARD_LENGTH, STANDARD_LENGTH);

            for (let i = 0; i < balls.length; i++) {
                artist.drawSprite(balls[i], ctx);
                balls[i].update(STANDARD_LENGTH, STANDARD_LENGTH);
                mortonSpaceObjectModel.registerSprite(balls[i]);
            }
            mortonSpaceObjectModel.collisionDetect(ctx);

            ctx.save();
            ctx.strokeStyle = "white";
            ctx.font = "48px serif";
            ctx.fillText(Ball.count, 10, 50);
            Ball.count = 0;
            ctx.restore();
            requestAnimationFrame(loop);
        };

        loop();
    };

    return {
        init: init,
    };
})();