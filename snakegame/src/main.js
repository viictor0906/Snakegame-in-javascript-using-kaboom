import kaboom from "kaboom"

const k = kaboom({
    //Screen config
    width:800,
    height:600,
    scale: 1,
    stretch: true,
    letterbox: true
})

k.loadSprite("player", "sprites/bean.png")

const player = add([
	k.pos(center()),
	k.sprite("player"),{
            speed: 200,
            currentDir: "up"   
        }
])

// Grid settings
const GRID_SIZE = 32//Size of each grid cell.
const COLS = 32//Number of columns.
const ROWS = 32//Number of rows.

//Calc for centralized grid
const gridWidth = COLS * GRID_SIZE
const gridHeight = ROWS * GRID_SIZE
const startX = (k.width() - gridWidth)/2//Centralized horizontal.
const startY = (k.height() - gridHeight)/2//Centralized vertical.

// Function to draw the grid
function drawGrid() {

    //Column position. Vertical.
    for(let x = 0; x <= COLS; x++) {
        //const x = startX + col*GRID_SIZE
        drawLine({
            p1: vec2(x * GRID_SIZE, 0),
            p2: vec2(x * GRID_SIZE, ROWS * GRID_SIZE), 
            width: 1,
            color: rgb(0, 0, 0)
        });
    }
    
    //Row position. Horizont.
    for(let y = 0; y <= ROWS; y++) {
        //const y = startY + row*GRID_SIZE
        drawLine({
            p1: vec2(0, y * GRID_SIZE),
            p2: vec2(COLS * GRID_SIZE, y * GRID_SIZE), 
            width: 1,
            color: rgb(0, 0, 0)
        });
    }
}

//Movement mechanic. Adjust the default direction value for the key that was pressed
onKeyDown("up", () => {
    player.currentDir = "up"
})
onKeyDown("down", () => {
    player.currentDir = "down"
})
onKeyDown("left", () => {
    player.currentDir = "left"
})
onKeyDown("right", () => {
    player.currentDir = "right"
})

drawLine({
    p1: vec2(0),
    p2: mousePos(),
    width: 4,
    color: rgb(0, 0, 255),
})

//Update player movement, frame a frame.
onUpdate(() => {
    if (!player.currentDir) return
    switch (player.currentDir) {
        case "up":
            player.pos.y -= player.speed * dt()
            break
        case "down":
            player.pos.y += player.speed * dt()
            break
        case "left":
            player.pos.x -= player.speed * dt()
            break
        case "right":
            player.pos.x += player.speed * dt()
            break
    }
})
// Draw the grid
drawGrid();
