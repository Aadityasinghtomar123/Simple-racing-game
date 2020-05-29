class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }

        runner1 = createSprite(20, 200);
        runner1.scale = 0.90;
        runner1.setCollider("rectangle", 0, 0)
        runner1.addImage("runner1", runner1_img);

        runner2 = createSprite(40, 500);
        runner2.scale = 0.90;
        runner2.setCollider("rectangle", 0, 0);
        runner2.addImage("runner2", runner2_img);

        runner3 = createSprite(60, 200);
        runner3.scale = 0.90;
        runner3.setCollider("rectangle", 0, 0)
        runner3.addImage("runner3", runner3_img);

        runner4 = createSprite(80, 200);
        runner4.scale = 0.90;
        runner4.setCollider("rectangle", 0, 0)
        runner4.addImage("runner4", runner4_img);

        runners = [runner1, runner2,runner3,runner4];

        invisibleGround1 = createSprite(100, 480, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.visible = false;

        invisibleGround2 = createSprite(100, 750, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.visible = false;
    }

    play() {
        form.hide();
        Player.getPlayerInfo();
        player.getBikesAtEnd();


        if (allPlayers !== undefined) {
            background(rgb(128, 128, 128));

            image(track, -400, 250, displayWidth * 8, displayHeight);

            var index = 0;
            var y = 200;
            var x = 0;

        

            for (var plr in allPlayers) {
                index = index + 1;

                y = y + 190;
                x = 360 - (allPlayers[plr].distance+ 100);

                runners[index - 1].x = x;
                runners[index - 1].y = y;
                
                if (index === player.index) {
                    stroke(10);
                    fill("black");
                    ellipse(x, y, 100, 100);
                    runners[index - 1].shapeColor = "black";
                    camera.position.x = runners[index - 1].x;
                    camera.position.y = displayWidth/2;
            }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
                player.update();
        }
    }

}


        if (player.distance == -7800) {
            gameState = 2;
            player.rank += 1
            Player.updateBikesAtEnd(player.rank)
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);

    }
}