//Importing lib.
    import kaboom from "kaboom"

//Start lib.
    kaboom();

//Setting screen config and defining "k" as a 'get' of kaboom lib.
    const k = kaboom({
        width:800, //X
        height:600, //Y
        stretch:false, //Define if screen game gonna stretch with screen size values. 
        letterbox:true //Create edges on screen size rounded, put the corners on the middle.
    });
//End.

//Loading sprites.
    playerSprite = k.loadSprite("player","sprites/jj.png");
    candySprite = k.loadSprite("candy","sprites/apple.png");
//End.

//Defining game scene and start mechanic game programming.
    k.scene("game",() => {
        //Player is let beacause your values his change in others code block's.
            let player = add([
                k.sprite(playerSprite),
                k.pos(center()),
                k.area(), //Setup object collison.
                k.body(), //Setup object gravity.
                {
                    speed:200,
                    currentDir:"up"
                },
                "snake-head" //Tag to call the object more easily.
            ]);
        //End.

        //Snake body array for make body size increment.
            let snakeBody = [];

        //Function will be spawn random apples in the map.
            function spawnApple(){
                k.add([
                    k.sprite(candySprite),
                    k.pos(rand(100,700), rand(100,500)), //Defining random position for each spawned.
                    k.area(),
                    "candy"
                ]);
            };
        //End.

        //Score att rotine and change player spped for each apple eated.
            let score = add([ //Created for show score text in screen.
                k.text("Score:0"),
                k.color(0,0,0,0),
                k.pos(24,24),
                {value:0} //Score value, this variable will be increased.
            ]);
            //Verify collision between player and candy.
            player.onCollide("candy",(candy) => {
                k.destroy(candy); //Destroy object.
                spawnApple(); //Call the function will be spawn candy in random positions after collide.

                //k.addKaboom(player.pos);
                k.shake();

                score.value+=1; //Increase new value on score value variable.
                score.text="Score:"+score.value; //Update text with new value.

                player.speed+=10; //Increases player speed value.

                //Verify if snakebody have any segment. If yes(snakeBody.length > 0), pick the last body segment(snakeBody[snakeBody.length - 1]). If no, use the snake head with reference. On resume, if snake have body, use the last segment with parameter, if no have body, use the snake head with parameter.
                const lastSegment = snakeBody.length > 0 ? snakeBody[snakeBody.length-1]: player;
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
                player.currentDir="up" //The lib reference directions based on keyboard dpad.
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
            k.onUpdate(() => {
                //Temporary array for save actual snake position.
                    const previousPositions = [];

                //Saving actual snake head position. player.pos.clone() make's a copy of snake head for avoid change original value.
                    previousPositions.push(player.pos.clone());

                //Saving each snake body piece.
                    for(let i=0; i<snakeBody.length; i++){
                        //Clone position of item in array for previousPositions.
                        previousPositions.push(snakeBody[i].pos.clone());
                    };
                //End.

                //Change player movement direction.
                    switch(player.currentDir) {
                        case "up"://Reconize what key is pressed, based in movement mechanic code block.
                            player.pos.y -= player.speed * dt() //dt() is the time since the last frame, used so that the speed is consistent even with different FPS rates.
                            break; //Break, because if don't have break after check case, the switch will continue check which key was pressed.
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
                //End.
                
                //It causes each segment of the body to move to the previous position of the segment in front. Example: segment 1 go to snake head position previous, segment 2 go to where the segment 1 was.
                    for(let i=0; i<snakeBody.length; i++){
                        snakeBody[i].pos = previousPositions[i];
                    };
                //End.
            });
        //End.
            
            k.onUpdate(() => {
            //Makes collision system to check if the snake touch screen edge, if yes, turn back.
                //0 is the inicial position of screen limit, it's work to height too.
                if(player.pos.x<0) {
                    player.currentDir="right";
                }
                //Final limit of screen, it's work to height too.
                if(player.pos.x>740) {
                    player.currentDir="left";
                }
                if(player.pos.y<0) {
                    player.currentDir="down";
                }
                if(player.pos.y>550) {
                    player.currentDir="up";
                };
            });
        //End.

        //Call the function for spawn first apple, after first spawn, the others block code will work.
            spawnApple();
});
//End.

//Call game scene to run game again.
    go("game");
