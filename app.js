const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")  

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

let snake_head = game_board[5][10]
snake_head.blockType = 2
let GS_w = (canv.width/19)
let GS_h = (canv.height/19)

function draw() {
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[n][i].block_number%2 == 0) {
                ctx.fillStyle = "green"
            } 
            else {
                ctx.fillStyle = "chartreuse"
            }
            ctx.fillRect(GS_w*i, GS_w*n, GS_w, GS_h)
            if (game_board[n][i].blockType == 2) {
                ctx.beginPath();
                ctx.fillStyle = "blue"
                ctx.arc(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w), (canv.width/40), 0, Math.PI*2, false)
                ctx.fill()
            }
        }
    }
}

function update() {
    draw()
    let temp_game_board = []
    for (let i = 0; i<19; i++) {
        temp_game_board.push([])
        for (let n = 0; n<19; n++) {
                    temp_game_board[i].push({block_number: game_board[n][i].block_number, blockType: game_board[n][i].blockType, direction: game_board[n][i].direction}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple
                }
            }
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[n][i].blockType == 2) {    
                if (snake_head.direction = "left") {

                }
                if (snake_head.direction = "right") {
                    temp_game_board[n+1][i].blockType = 2
                    console.log(n, i)
                    if (snake_len > 1) {
                        temp_game_board[n][i].blockType = 1
                    }
                    else {
                        temp_game_board[n][i].blockType = 0
                    }

                }
                if (snake_head.direction = "up") {

                }
                if (snake_head.direction = "down") {

                }
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
                    game_board[n][i] = ({block_number: temp_game_board[n][i].block_number, blockType: temp_game_board[n][i].blockType, direction: temp_game_board[n][i].direction}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple 
                }
            }
            }
        }
    }
}

setInterval(update, 500)
