class Mouse {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        canvas.onmousemove = (e) => {
            let rect = canvas.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        }

    }
}
class Ball {
    constructor(x, y, radius, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.originalX = x || 0;
        this.originalY = y || 0;
        this.radius = radius || 2;
        this.color = color || '#002';
        this.friction = 0.9;
        this.springFactor = 0.01;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    think(mouse) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 30) {
            let angle = Math.atan2(dy, dx);
            let tx = mouse.x + Math.cos(angle) * 30;
            let ty = mouse.y + Math.sin(angle) * 30;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        // spring back
        let dx1 = -(this.x - this.originalX);
        let dy1 = -(this.y - this.originalY);

        this.vx += dx1 * this.springFactor;
        this.vy += dy1 * this.springFactor;

        // friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // actual move
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let pos = new Mouse(canvas);
let balls = [];
let cursor = new Ball(0, 0, 25, "#456");
let ww = window.innerWidth - 15;
let wh = window.innerHeight - 15;

function resizeCanvas(canvas) {
    canvas.width = ww;
    canvas.height = wh;
}


for (let i = 0; i < ww*wh/1500; i++) {
    balls.push(new Ball(
        Math.random() * ww,
        Math.random() * wh,
        5,
        "#333"
    ));
}


function ConnectDots(balls) {
    ctx.beginPath();
    ctx.moveTo(balls[0], balls[0].y);
    balls.forEach(ball => {
        ctx.lineTo(ball.x, ball.y);
    });
    ctx.closePath();
    ctx.strokeStyle = '#999';
    ctx.stroke();

}

function Render() {
    window.requestAnimationFrame(Render);

    ctx.clearRect(0, 0, ww, wh);

    cursor.setPos(pos.x, pos.y);
    cursor.draw(ctx);

    balls.forEach(ball => {

        ball.think(pos);

        ball.draw(ctx);
    });

    ConnectDots(balls);
}



window.onload = function () {
    resizeCanvas(canvas);
    Render();
};