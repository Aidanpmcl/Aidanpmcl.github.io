const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let valueDisplay = null;
let specialSquareClicked = false; 
const squares = [];




function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function applyRandomValueToSquares(squares) {
    for (const square of squares) {
        square.value = random(1, 100);
    }
}

class Square {
    constructor(x, y, velX, velY, color, size, text) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.angle = 0;
        this.text = text;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.fillStyle = "white"; 
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.value, 0, 5);
        if (this.text) {
            ctx.fillStyle = "red";
            ctx.fillText(this.text, 0, -this.size/2 - 10);
        }
        ctx.restore();
    }

    update() {
        if ((this.x + this.size/2) >= width || (this.x - this.size/2) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size/2) >= height || (this.y - this.size/2) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
        this.angle += 0.1; 
      }
    
      collisionDetect() {
        if (this === specialSquare) {
            return; 
        }
        
        for (const square of squares) {
            if (this !== square) {
                const dx = square.x - this.x;
                const dy = square.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + square.size) {
                    if (this !== specialSquare && square !== specialSquare) {
                        const tempColor = this.color;
                        this.color = square.color;
                        square.color = tempColor;
                    }

                    [this.velX, square.velX] = [square.velX, this.velX];
                    [this.velY, square.velY] = [square.velY, this.velY];
                }
            }
        }
    }
}

while (squares.length < 40) {
    const size = random(5, 75);
    const square = new Square(
        random(0 + size/2, width - size/2),
        random(0 + size/2, height - size/2),
        random(-10, 10),
        random(-10, 10),
        randomRGB(),
        size
    );

    squares.push(square);
}

const specialSquare = new Square(width / 2, height / 2, 0, 0, "red", 200, "DONT CLICK ME");
squares.push(specialSquare);

function loop () {
    ctx.fillStyle = "rgb( 0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    if (specialSquareClicked) { 
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("You have gone deaf! Should have worn ear plugs like mom said.", width / 2, height / 2);
    } else {
        for (const square of squares) {
            square.draw();
            square.update();
            square.collisionDetect();
        }
    }
    requestAnimationFrame(loop);
}

function squareClick(event) {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    
    for (const square of squares) {
        const dx = clickX - square.x;
        const dy = clickY - square.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= square.size/2) {
            if (square === specialSquare) {
                square.color = "red";
                specialSquareClicked = true;
                return; 
            }
            else {
                if (valueDisplay) {
                    valueDisplay.remove();
                }
                valueDisplay = document.createElement("div");
                valueDisplay.textContent = "Volume: " + square.value;
                valueDisplay.id = "valueDisplay";
                document.body.appendChild(valueDisplay);
                break;
            }
        }
    }
}

canvas.addEventListener("click", squareClick);
applyRandomValueToSquares(squares);
loop();
