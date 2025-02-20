class Refill {
    constructor(game){
        this.game = game
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.frameX = 0
        this.frameY = 0;
        this.markedForDeletion = false
    }
    update(deltaTime){
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // check if off screen
        if (this.x +this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }   
}

export class Refillife extends Refill {
    constructor(game){
        super(game);
        this.game = game;
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = 50;
        this.height = 50;
        this.x = this.game.width;
        this.y = Math.random() * this.game.groundMargin * 90;
        this.image = document.getElementById('refiller');
        this.speedX = 0;
        this.speedY = Math.random() > 0.3 ? 1 : -1;
        this.maxFrame = 0;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        if (this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2,0);
    }
}