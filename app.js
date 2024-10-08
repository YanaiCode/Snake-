const canv = document.querySelector("canvas")
const ctx = canv.getContext("2d")  
//column>row

const TYPE_NOTHING = 0
const TYPE_SNAKE_BODY = 1
const TYPE_SNAKE_HEAD = 2
const TYPE_APPLE = 3

canv.width = window.innerWidth
canv.height = window.innerHeight

ctx.fillStyle = "grey"
ctx.fillRect(0, 0, canv.width, canv.height)

const game_board = []
let block_number = 0
let counter = 0
let score = 0

let snake_len = 0
let game_over = false

let snake_arr = []

for (let i = 0; i<19; i++) {
    game_board.push([])
    for (let n = 0; n<19; n++) {
        game_board[i].push({block_number: counter, blockType: 0, direction: "right"}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple
        counter += 1    
    }
}

function randint(n1, n2) {
    Math.random()
    return Math.round(Math.random()*(n2-n1)+n1)
}
// assert(randint(0,18)<=18&&randint(0,18)>=0)

let snake_head = game_board[5][1]
snake_head.blockType = TYPE_SNAKE_HEAD
let apple = game_board[randint(0,18)][randint(0,18)]
apple.blockType = TYPE_APPLE

let GS_h = 0
let GS_w = 0

if (window.innerWidth < window.innerHeight) {
    GS_w = (canv.width/19)
    GS_h = (canv.width/19)
}
else {
    GS_w = (canv.height/19)
    GS_h = (canv.height/19)
}


function draw() {
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[i][n].block_number%2 == 0) {
                ctx.fillStyle = "green"
            } 
            else {
                ctx.fillStyle = "chartreuse"
            }
            ctx.fillRect(GS_w*n, GS_w*i, GS_w, GS_h)
            if (game_board[i][n].blockType == TYPE_SNAKE_HEAD) {
                ctx.beginPath();
                ctx.fillStyle = "blue"
                ctx.arc(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w), (GS_h/2), 0, Math.PI*2, false)
                ctx.fill()
            }
            if (game_board[i][n].blockType == TYPE_SNAKE_BODY) {
                ctx.beginPath();
                ctx.fillStyle = "cyan"
                ctx.arc(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w), (GS_h/2), 0, Math.PI*2, false)
                ctx.fill()
            }
            if (game_board[i][n].blockType == TYPE_APPLE) {
                ctx.beginPath();
                ctx.fillStyle = "red"
                ctx.arc(n*(GS_w)+(.5*GS_w), i*(GS_h)+(.5*GS_w), (GS_h/2), 0, Math.PI*2, false)
                ctx.fill()
            }
        }
    }
    if (game_over == true) {
        ctx.fillStyle = "black"
        ctx.fillRect(canv.width/2-125, canv.height/2-75, 250, 120)
        ctx.fillStyle = "red"
        ctx.font = "54px Arial"
        let text = ctx.measureText("You died"); // TextMetrics object
        ctx.fillText("You died", (canv.width-text.width)/2, canv.height/2)
    }
    ctx.fillStyle = "black"
    ctx.font = "24px Arial"
    let score_text_w = ctx.measureText("Score: " + score).width;
    ctx.fillText("Score: " + score, (1/2)*window.innerWidth, 20)
}

function update() {
    draw()
    if (Date.now()-timer>delay) {
        timer = Date.now()
        update_snake()
    }
}

let timer = Date.now()
let delay = 500


function update_snake() {
    let temp_game_board = []
    for (let i = 0; i<19; i++) {
        temp_game_board.push([])
        for (let n = 0; n<19; n++) {
            temp_game_board[i].push({block_number: game_board[i][n].block_number, blockType: game_board[i][n].blockType, direction: game_board[i][n].direction}) //block types: 0 = nothing, 1 = snake body, 2 = snake head, 3 = apple
        }
    }
    for (let i = 0; i<19; i++) {
        for (let n = 0; n<19; n++) {
            if (game_board[i][n].blockType == TYPE_SNAKE_HEAD) {    
                let offsetI = 0;
                let offsetN = 0;
                if (snake_head.direction == "left") {
                    offsetN = -1;
                }
                if (snake_head.direction == "right") {
                    offsetN = 1;
                }
                if (snake_head.direction == "up") {
                    offsetI = -1;
                }
                if (snake_head.direction == "down") {
                    offsetI = 1
                }
                if (!(0 <= i+offsetI && i+offsetI < 19 && 0 <= n+offsetN && n+offsetN < 19)) {
                    console.log("snake dies")

                    offsetI *= 0
                    offsetN *= 0
                    game_over = true
                }
                if (temp_game_board[i+offsetI][n+offsetN].blockType == TYPE_APPLE) {
                    score += 1
                    snake_len += 1
                    let new_apple_pos = temp_game_board[randint(0,18)][randint(0,18)]
                    while (new_apple_pos.blockType != TYPE_NOTHING) {
                        new_apple_pos = temp_game_board[randint(0,18)][randint(0,18)]
                    }
                    new_apple_pos.blockType = TYPE_APPLE
                    if (snake_len == 0) {
                        console.log("test")
                        temp_game_board[i][n].blockType = TYPE_SNAKE_BODY
                    }
                }

                temp_game_board[i+offsetI][n+offsetN].blockType = TYPE_SNAKE_HEAD
                snake_arr.unshift(temp_game_board[i+offsetI][n+offsetN])
                console.log(snake_arr)
                snake_arr.pop()

                temp_game_board.block
                if (snake_len > 0) {
                    temp_game_board[i][n].blockType = TYPE_SNAKE_BODY
                }
                else {
                    temp_game_board[i][n].blockType = TYPE_NOTHING
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




document.addEventListener("keydown", e => {
    if (game_over == false) {
        handleKeyPress(e.key.toLowerCase(), true);
    }
    else {

    }
})
// document.addEventListener("keyup", e => {
//     handleKeyPress(e.key.toLowerCase(), false);
// });

function handleKeyPress(key, isPressed) {
    if (key == "arrowup" || key == "w") {
        snake_head.direction = "up"
    }
    if (key == "arrowdown" || key == "s") {
        snake_head.direction = "down"
    }
    if (key == "arrowleft" || key == "a") {
        snake_head.direction = "left"
    }
    if (key == "arrowright" || key == "d") {
        snake_head.direction = "right"
    }

}

setInterval(update, 17)
