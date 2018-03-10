define([
    'entity',
],function(
    Entity,
){


    /***********
    Actor interface
    This interface is designed to encompass any Entity that acts upon the game level. This class should not be instantiated.
    Any action shared between actors is located here.

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Actor extends Entity {
        constructor (game, x, y, img=null, ctx=null, scale=null) {
            super(game, x, y, img, ctx);
            this.facing = null;
            this.states = null;
            this.animations = null;
            this.animation = null;
        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();
        }

    } 

    return Actor;
});

