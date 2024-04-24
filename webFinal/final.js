const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let valueDisplay = null;
let specialBallClicked = false; // Variable to track if the special ball is clicked

const balls = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function applyRandomValueToBalls(balls) {
    for (const ball of balls) {
        ball.value = random(1, 100);
    }
}

class Ball {
    constructor(x, y, velX, velY, color, size, text) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.value = 0;
        this.text = text;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "white"; 
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.value, this.x, this.y + 5);
        if (this.text) {
            ctx.fillStyle = "red";
            ctx.fillText(this.text, this.x, this.y - this.size - 10);
        } 
    }

    update() {
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
      }
    
      collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = ball.x - this.x;
                const dy = ball.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + ball.size) {
                    
                    [this.velX, ball.velX] = [ball.velX, this.velX];
                    [this.velY, ball.velY] = [ball.velY, this.velY];
                }
            }
        }
    }
}   



while (balls.length < 30) {
    const size = random(25,40)
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-10, 10),
        random(-10, 10),
        randomRGB(),
        size,
    )

    balls.push(ball);
}

// Add a red ball with special text
const specialBall = new Ball(width / 2, height / 2, 0, 0, "red", 80, "DONT CLICK ME");
balls.push(specialBall);

function loop () {
    ctx.fillStyle = "rgb( 0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    if (specialBallClicked) { // Check if the special ball is clicked
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, width, height);
    } else {
        for (const ball of balls) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }
    requestAnimationFrame(loop);
}

function ballClick(event) {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    
    for (const ball of balls) {
        const dx = clickX - ball.x;
        const dy = clickY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= ball.size) {
            if (ball === specialBall) {
                // Turn the special ball red when clicked and set the specialBallClicked variable to true
                ball.color = "red";
                specialBallClicked = true;
            }
            else {
                // Create a value display element if a regular ball is clicked
                if (valueDisplay) {
                    valueDisplay.remove();
                }
                valueDisplay = document.createElement("div");
                valueDisplay.textContent = "Volume: " + ball.value;
                valueDisplay.id = "valueDisplay";
                document.body.appendChild(valueDisplay);
            }
            break; 
        }
    }
}

canvas.addEventListener("click", ballClick);
applyRandomValueToBalls(balls);
loop();
