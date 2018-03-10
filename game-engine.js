define([

],function(

){

     /***************
    GameEngine class
    ****************/
    class GameEngine {

        constructor () {
            this.entities = [];
            this.ctx = null;
            this.click = null;
            this.mouse = null;
            this.wheel = null;
            this.surfaceWidth = null;
            this.surfaceHeight = null;
            // KB input keycodes
            this.controlKeys = {
                "Space": {"active": false},
                "KeyW": {"active": false},
                "KeyS": {"active": false},
                "KeyD": {"active": false},
                "KeyA": {"active": false}
            }
            // control mapping
            this.controls = {
                "jump": "Space",
                "right": "KeyD",
                "left": "KeyA",
            }
        }

        /*
        Initializes the game engine
        */
        init (ctx) {
            this.ctx = ctx;
            this.surfaceWidth = this.ctx.canvas.width;
            this.surfaceHeight = this.ctx.canvas.height;
            this.startInput();

            console.log('game initialized');
        }

        /*
        Starts the game engine
        */
        start () {
            console.log("starting game");
            let that = this;
            (function gameLoop() {
                that.loop();
                requestAnimFrame(gameLoop, that.ctx.canvas);
            })();
        }

        //Timer class
        Timer() {//Added this for when we implement a pause function.
            this.gameTime = 0;
            this.maxStep = 0.05;
            this.wallLastTimestamp = 0;
            function tick() {
                var wallCurrent = Date.now();
                var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
                this.wallLastTimestamp = wallCurrent;

                var gameDelta = Math.min(wallDelta, this.maxStep);
                this.gameTime += gameDelta;
                return gameDelta;
            }
        }

        /*
        Input handling, initializes listeners
        */
        startInput () {
            console.log('Starting input');

            this.ctx.canvas.tabIndex = 0;;

            let getXandY = function (e) {
                let x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
                let y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

                if (x < 1024) {
                    x = Math.floor(x / 32);
                    y = Math.floor(y / 32);
                }

                return { x: x, y: y };
            }

            let that = this;

            // control event listeners go here
            let map = {};

            this.ctx.canvas.addEventListener("keypress", function (e) {
                if (String.fromCharCode(e.which) === ' ') that.space = true;
                e.preventDefault();
                if (!that.controlKeys.hasOwnProperty(e.code)) { that.controlKeys[e.code] = {"active": true}; }
                if (that.controlKeys[e.code].active == false) { that.controlKeys[e.code].active = true; }
                // console.log(`${e.code} is ${that.controls[e.code].active}`);

            }, false);

            this.ctx.canvas.addEventListener("keyup", function (e) {
            	if (!that.controlKeys.hasOwnProperty(e.code)) { that.controlKeys[e.code] = {"active": false}; }
                if (that.controlKeys[e.code].active == true) { that.controlKeys[e.code].active = false }
                // console.log(`${e.code} is ${that.controls[e.code].active}`);

            }, false);

            console.log('Input started');
        }

        /*
        Adds an entity to the game
        */
        addEntity (entity) {
            console.log('added entity');
            this.entities.push(entity);
        }

        addEntitySet (entitySet) {
            for (var entity in entitySet) {
                addEntity(entity);
            }
        }


        /*
        Draws all entities in the list
        */
        draw (drawCallback) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.save();
            for (let i = 0; i < this.entities.length; i++) {
                this.entities[i].draw(this.ctx);
            }
            if (drawCallback) {
                drawCallback(this);
            }
            this.ctx.restore();
        }

        /*
        Updates all entities, calls their update methods
        */
        update () {
            let entitiesCount = this.entities.length;

            for (let i = 0; i < entitiesCount; i++) {
                let entity = this.entities[i];

                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }

            for (let i = this.entities.length - 1; i >= 0; --i) {
                if (this.entities[i].removeFromWorld) {
                    this.entities.splice(i, 1);
                }
            }

            for (let i = 0; i < entitiesCount; i++) {
                let entity = this.entities[i];
                for (let j = 1; j < entitiesCount; j++) {
                    let other = this.entities[j];
                    if (entity != other && entity.isColliding(other) != 'none') {
                        let direction = entity.isColliding(other);
                        entity.collided(other, direction);

                    }
                }
                
            }

        }

        /*
        Defines the game loop
        */
        loop () {
            this.update();
            this.draw();
            this.click = null;
            this.wheel = null;
        }

    } // end of GameEngine
    
    return GameEngine;

});