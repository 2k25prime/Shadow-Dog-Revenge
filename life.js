export class Heart {
    constructor(game){
        this.game = game
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = 50;
        this.height = 50;
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('heart');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}