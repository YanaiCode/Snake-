const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")  
//column>row

if (window.innerWidth > window.innerHeight) {
    canv.height = window.innerHeight *.75
    canv.width = canv.height
}
else {
    canv.width = window.innerWidth *.75
    canv.height = canv.width
}

ctx.fillStyle = "grey"
ctx.fillRect(0, 0, canv.width, canv.height)

const game_board = []
let block_number = 0
let counter = 0

let snake_len = 1

for (let i = 0; i<19; i++) {
    game_board.push([])
    for (let n = 0; n<19; n++) {
        game_board[i].push({block_number: counter, blockType: 0, direction: "right"}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple
        counter += 1    
    }
}

console.log(game_board)

let snake_head = game_board[10][5]
snake_head.blockType = 2
let GS_w = (canv.width/19)
let GS_h = (canv.height/19)

function draw() {
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[i][n].block_number%2 == 0) {
                ctx.fillStyle = "green"
            } 
            else {
                ctx.fillStyle = "chartreuse"
            }
            ctx.fillRect(GS_w*i, GS_w*n, GS_w, GS_h)
            if (game_board[i][n].blockType == 2) {
                ctx.beginPath();
                ctx.fillStyle = "blue"
                ctx.arc(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w), (canv.width/40), 0, Math.PI*2, false)
                console.log(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w))
                ctx.fill()
            }
        }
    }
}

function update() {
    if (up) {
        snake_head.direction = "up"
    }
    if (down) {
        snake_head.direction = "down"
    }
    if (left) {
        snake_head.direction = "left"
    }
    if (right) {
        snake_head.direction = "right"
    }
    draw()
    let temp_game_board = []
    for (let i = 0; i<19; i++) {
        temp_game_board.push([])
        for (let n = 0; n<19; n++) {
            temp_game_board[i].push({block_number: game_board[i][n].block_number, blockType: game_board[i][n].blockType, direction: game_board[i][n].direction}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple
        }
    }
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[i][n].blockType == 2) {    
                if (snake_head.direction == "left") {
                    temp_game_board[i][n-1].blockType = 2
                    console.log(i, n)
                }
                if (snake_head.direction == "right") {
                    temp_game_board[i][n+1].blockType = 2
                    console.log(i, n)
                }
                if (snake_head.direction == "up") {
                    temp_game_board[i-1][n].blockType = 2
                    console.log(i, n)
                }
                if (snake_head.direction == "down") {
                    temp_game_board[i+1][n].blockType = 2
                    console.log(i, n)
                }
                if (snake_len > 1) {
                    temp_game_board[i][n].blockType = 1
                }
                else {
                    temp_game_board[i][n].blockType = 0
                }
            }
            
        }
    }
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            game_board[i][n] = ({block_number: temp_game_board[i][n].block_number, blockType: temp_game_board[i][n].blockType, direction: temp_game_board[i][n].direction}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple 
        }
    }
}

let left = false;
let right = false;
let up = false;
let down = false;


document.addEventListener("keydown", e => {
    handleKeyPress(e.key.toLowerCase(), true);
})
document.addEventListener("keyup", e => {
    handleKeyPress(e.key.toLowerCase(), false);
});

function handleKeyPress(key, isPressed) {
    if (key == "arrowup" || key == "w") {
        up = isPressed;
    }
    if (key == "arrowdown" || key == "s") {
        down = isPressed;
    }
    if (key == "arrowleft" || key == "a") {
        left = isPressed;
    }
    if (key == "arrowright" || key == "d") {
        right = isPressed;
    }

}

setInterval(update, 500)
