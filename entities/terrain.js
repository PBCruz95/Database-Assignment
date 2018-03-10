define([
    'entity',
],function(
    Entity,
){


    class Terrain extends Entity {
         constructor (game, x, y, boundWidth, boundHeight, dimensions, img=null, ctx=null, scale=null, tiles=null) {
            super(game, x, y, img, ctx);
            this.states = null;
            this.animations = null;
            this.animation = null;
            this.tile = tiles;

            this.width = dimensions[0];
            this.height = dimensions[1];
            this.boundX = this.x;
            this.boundY = this.y;
            this.boundWidth = boundWidth;
            this.boundHeight = boundHeight;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, 
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        };
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();

        }

    } // end Terrain

    return Terrain;
});



