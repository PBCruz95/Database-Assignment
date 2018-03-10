define([
],function(
){

    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y, img=null, ctx=null) {
            this.name = this.constructor.name;
            this.game = game;
            this.x = x;
            this.y = y;
            this.gravity = .9;
            this.img = img;
            this.removeFromWorld = false;
            this.ctx = ctx;

            // used for simple rect hitbox
            this.boundX = null;
            this.boundY = null;
            this.lastBoundY = null;
            this.boundWidth = null;
            this.boundHeight = null;
        }

        // TODO, implement a list of bounding shapes, iterate through depending on type (circle or rect) 
        rectangle () {

        }
        circle () {

        }
 

        /* Draws the outline of this entity */
        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () { }

        /* Draws this entity. Called every cycle of the game engine. */
        draw (ctx) {
            if (this.game.showOutlines && this.boundX) {
                drawOutline(ctx)
            }
            if (this.img) {
                this.animation.drawFrame(this.clockTick, ctx, this.x, this.y, true);
            }
        }

        /*
        Collision detection, rectangle
        */
        isColliding(other) {
            let rect1 = {
                "x" : this.boundX,
                "y" : this.boundY,
                "lastY" : this.lastBoundY,
                "width" : this.boundWidth,
                "height": this.boundHeight
            }

            let rect2 = {
                "x" : other.boundX,
                "y" : other.boundY,
                "width" : other.boundWidth,
                "height": other.boundHeight
            }
            
            // This is the same as Mariott's method, just formatted differently
            let collision = 'none';
            var dx = (rect1.x + rect1.width/2) - (rect2.x + rect2.width/2);
            var dy = (rect1.y + rect1.height/2) - (rect2.y + rect2.height/2);
            var lastdy = (rect1.lastY + rect1.height/2) - (rect2.y + rect2.height/2);
            var width = (rect1.width + rect2.width) / 2;
            var height = (rect1.height + rect2.height) / 2;
            var crossWidth = width * dy;
            var lastCrossWidth = width * lastdy;
            var crossHeight = height * dx;
            
            // First check if rect1 and rect2 are close enough to even collide. Then check the intersection depths to determine which side was most involved in the collision.
            if(Math.abs(dx) <= width && Math.abs(dy) <= height) {

                //TODO store last bottom of rect1, compare to bound of rect2, determine if i should fall or not
                if (crossWidth > crossHeight && lastCrossWidth > crossHeight) {
                    (crossWidth < -(crossHeight)) && lastCrossWidth < -(crossHeight) ? collision = 'right' : collision = 'top';

                } else {
                    crossWidth > (-crossHeight) && lastCrossWidth > (-crossHeight) ? collision = 'left' : collision = 'bottom';
                    // console.log("rect1 cur: " + rect1.y);
                    // console.log("rect1 last: " + rect1.lastY);
                    // console.log("rect2: " + rect2.y);

                }

            }
        return collision;

        }

        collided(other, direction) {
            //console.log(`${this.name} colliding with ${other.name} from ${direction}` )
        }
    } // end of Entity class

    return Entity;
});
