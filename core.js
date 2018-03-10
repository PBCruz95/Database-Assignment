define([
    'asset-manager',
    'game-engine',
    "entity",
    "player",
    "terrain"
], function(
    AssetManager,
    GameEngine,
    Entity,
    Player,
    Terrain
) {

    let init = function() {
        console.log("init")
    };

    // the "main" code begins here

    toload = [
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');

        let saveButton = document.getElementById("save");
        let loadButton = document.getElementById("load");

        let gameEngine = new GameEngine();

        let player = new Player(gameEngine, 150, 0, null, ctx);

        gameEngine.addEntity(player);
        gameEngine.addEntity(new Terrain(gameEngine, 0, 700, 1000, 50, [32, 32],  null, ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 70, 200, 80, 500,[32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx, 3, [0,0]));
        //gameEngine.addEntity(new Terrain(gameEngine, 300, 500, 50, 200,[32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 500, 400, 200, 100,[32, 32],  null, ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 300, 100, 500, 50,[32, 32], null, ctx, 3, [0,0]));

        gameEngine.init(ctx, saveButton, loadButton);
        gameEngine.start();

        this.save.addEventListener("click", function (e) {
            gameEngine.saveGame();
        }, false);

        gameEngine.socket.on("load", function(e) {
            console.log("CurX: " + player.x);
            console.log("CurY: " + player.y);
            console.log("savedX: " + e.savedX);
            console.log("savedY: " + e.savedY);
            player.x = e.savedX;
            player.y = e.savedY;
            player.centerX = player.x + ((player.spriteWidth*player.scale)/2);
            player.boundX = player.centerX - (player.boundWidth/2);
            player.boundY = player.y + (player.spriteHeight*player.scale - player.boundHeight);
            player.lastBoundY = player.boundY;

            console.log("newX: " + player.x);
            console.log("newY: " + player.y);

            gameEngine.update();
        });
    });

    return {
        init: init
    };

});

