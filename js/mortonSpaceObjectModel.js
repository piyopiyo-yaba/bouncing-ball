/*

*/
// --------------------------[mortonSpaceObjectModel]-----オブジェクト-----------------------------------
yabaGameProto0.mortonSpaceObjectModel = ( function() {
    const registerSprite = function(sprite) {
        const {left, top, width, height} = sprite.getBoundingBox(),
              LinerQuarternaryTreeIndex = this.morton2D.getLinerQuarternaryTreeIndex(left, top,width, height);
        
        this.linerQuarternaryTree.register(sprite, LinerQuarternaryTreeIndex);
    },
    collisionDetect = function(ctx) {
        this.linerQuarternaryTree.preOrder(ctx);
    }
    return {
        registerSprite: registerSprite,
        collisionDetect: collisionDetect,
    };

})();