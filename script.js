canvas = document.getElementById('mycanvas');
H = W = canvas.width = canvas.height = 500;
pen = mycanvas.getContext("2d");
cs = 30;

function init(){
    snake = {
        len : 4,
        color : "yellow",
        direction : "right",
        cells : [],

            createSnake : function(){
                for(let i = this.len; i > 0; i--){
                    cells.push({x : i,y : 0})
                }
            },

            drawSnake : function(){
                for(let i = 0; i < this.cells.length; i++){
                    pen.fillStyle = this.color;
                    pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs,cs);
                }
            },

            updateSnake : function(){
                var headx = this.cells[0].x;
                var heady = this.cells[0].y;
                this.cells.pop();

                var finalx = headx + 1;
                var finaly = heady;

                if(this.direction == "right"){
                    finalx = headx + 1;
                    finaly = heady;
                }
                else if(this.direction == "left"){
                    finalx = headx - 1;
                    finaly = heady;
                }
                else if(this.direction == "up"){
                    finalx = headx;
                    finaly = heady - 1;
                }
                else if(this.direction == "down"){
                    finalx = headx;
                    finaly = heady + 1;
                }

                this.cells.unshift({x : finalx,y : finaly})

                var lastx = Math.round(W/cs-1);
                var lasty = Math.round(H/cs-1);

                if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastx || this.cells[0].y > lasty){
                    var gameover = true;
                }

            }
    }

    snake.createSnake();

    function keyPressed(e){
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
    }

    addEventListener('keydown',keyPressed);

    var food = {
        x : foodx,
        y : foody,
        color : "red"
    }

    return food;

   
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
}

function update(){
   snake.updateSnake();
}

function gameloop(){

    if(gameover == true){
        clearInterval(f)
        alert("game over")
    }

    draw();
    update();
}

init();

f = setInterval(gameloop,200);
        