import kaboom from "kaboom"

kaboom();

//Setting screen config and defining "k" as a 'get' of kaboom lib.
    const k = kaboom({
        width:800,
        height:600,
        scale:1,
        stretch:false,
        letterbox: true
    });
//End.

//Loading sprites for game.
    k.loadSprite("player", "sprites/bean.png");
    k.loadSprite("apple", "sprites/apple.png");
//End.

//Defining game scene and start real game programming.
    k.scene("game", () => {
        let player = add([
            k.sprite("player"),
            k.pos(center()),
            k.area(),
            k.body(),
            {
                speed:200,
                currentDir:"up"
            },
            "snake-head"
        ]);
//End.

    let snakeBody = [];

//Function will be spawn random apples in the map.
    function spawnApple(){
        k.add([
            k.sprite("apple"),
            k.pos(rand(100,700), rand(100,500)),//Defining random position for each spawned.
            k.area(),//Defining area for future collisions.
            "apple"//Declared a tag for apple object.
        ]);
    };
//End.

//Score att rotine and change player spped for each apple eated.
    let score = add([//Created for show score text in screen.
        k.text("Score: 0"),
        k.pos(24,24),
        { value:0}//Score value, this variable will be increased.
    ]);

    player.onCollide("apple", (apple) => {
        k.destroy(apple);
        spawnApple();

        score.value+=1;
        score.text="Score: " + score.value;

        player.speed+=10;

        //Verify if snakebody have any segment. If yes(snakeBody.length > 0), pick the last body segment(snakeBody[snakeBody.length - 1]). If no, use the snake head with reference. On resume, if snake have body, use the last segment with parameter, if no have body, use the snake head with parameter.
        const lastSegment = snakeBody.length > 0 ? snakeBody[snakeBody.length - 1]: player;
        const newSegment = add([
            k.sprite("player"),
            k.pos(lastSegment.pos),
            k.area(),
            "snake-body"
        ]);
        //Increment a new segment on snake body array.
        snakeBody.push(newSegment);
    });
//End.

//Movement mechanic. Adjust the default direction value for the key that was pressed.
    onKeyDown("up",() => {
        player.currentDir="up"
    });
    onKeyDown("down",() => {
        player.currentDir="down"
    });
    onKeyDown("left",() => {
        player.currentDir="left"
    });
    onKeyDown("right",() => {
        player.currentDir="right"
    });
//End.

//Update player movement, frame by frame.
    onUpdate(() => {
        //Temporary array for save actual snake position.
        const previousPositions = [];
        //Saving actual snake head position. player.pos.clone() make's a copy of snake head for avoid change original value.
        previousPositions.push(player.pos.clone());

        //Saving each snake body piece.
        for(let i = 0; i < snakeBody.length; i++){
            //Clone position of item in array for previousPositions.
            previousPositions.push(snakeBody[i].pos.clone());
        };

        switch (player.currentDir) {
            case "up":
                player.pos.y -= player.speed * dt() //dt() is the time since the last frame, used so that the speed is consistent even with different FPS rates.
                break;
            case "down":
                player.pos.y += player.speed * dt()
                break;
            case "left":
                player.pos.x -= player.speed * dt()
                break;
            case "right":
                player.pos.x += player.speed * dt()
                break;
        };
        
        //It causes each segment of the body to move to the previous position of the segment in front. Example: segment 1 go to snake head position previous, segment 2 go to where the segment 1 was.
        for(let i = 0; i < snakeBody.length; i++){
            snakeBody[i].pos = previousPositions[i];
        };
    });
//End.

//Call the function for spawn first apple.
    spawnApple();
//End.

});

//Run game again.
go("game");
