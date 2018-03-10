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

        let gameEngine = new GameEngine();

        gameEngine.addEntity(new Player(gameEngine, 150, 0, null, ctx));
        gameEngine.addEntity(new Terrain(gameEngine, 0, 700, 1000, 50, [32, 32],  null, ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 70, 200, 80, 500,[32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx, 3, [0,0]));
        //gameEngine.addEntity(new Terrain(gameEngine, 300, 500, 50, 200,[32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 500, 400, 200, 100,[32, 32],  null, ctx, 3, [0,0]));
        gameEngine.addEntity(new Terrain(gameEngine, 300, 100, 500, 50,[32, 32], null, ctx, 3, [0,0]));

        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

