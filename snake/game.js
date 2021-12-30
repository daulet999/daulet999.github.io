const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const bg = new Image();
const foodImg = new Image();
bg.src = 'img/bg.png';
foodImg.src = 'img/apple.png';

let box = 32;
let score = 0;

let food ={
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
// Ивент с клавиатурой
document.addEventListener('keydown', direction);
let dir;
function direction(event){
    if(event.keyCode == 37 && dir !='right') dir = 'left';
    else if(event.keyCode == 38 && dir !='down') dir = 'up';
    else if(event.keyCode == 39 && dir !='left') dir = 'right';
    else if(event.keyCode == 40 && dir !='up') dir = 'down';
    
}

// Нельзя есть себя
function eatTail(head, arr){
    for(let i = 0; i<arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

function drawGame(){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // Счетчик 
    ctx.fillStyle ='white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
// Поедание и увеличение
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food ={
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
        snake.pop();
    }

    //  Ограничение по канвасу
    if(snakeX < box || snakeX > box * 17
        || snakeY < box * 3 || snakeY > box * 17)
        clearInterval(game);
// Движение змейки
    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);
// Увеличение змейки
    snake.unshift(newHead);

}
let game = setInterval(drawGame, 100);