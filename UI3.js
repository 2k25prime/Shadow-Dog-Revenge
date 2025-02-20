export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica'
        this.livesImage = document.getElementById('lives');
    }
    
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score, 150 to win: ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time, 150 secs:   ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // energy
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Energy, max is 100: ' + (this.game.energy * 0.001).toFixed(1), 20, 150);
        //stamina
        context.font = this.fontSize * 0.8 +'px ' + this.fontFamily;
        context.fillText('Stamina, max is 50:' + (this.game.stamina *0.001).toFixed(1), 30, 220);
        // lives
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }
        
        // energy gameover
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Without energy, you have lost', 980, 400)
        // game over messages
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningscore && this.game.energy > 0 && this.game.lives > 0){
                context.fillText('BOO-YAH', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Winner Winner chicken dinner', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else if (this.game.score < this.game.winningscore || this.game.energy < 0 && this.game.lives <= 0){
                context.fillText('Not there yet', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Train HARDER!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else if (this.game.score > this.game.winningscore || this.game.energy < 0 && this.game.lives <= 0){
                context.fillText('Not there yet', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Train HARDER!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else if (this.game.score < this.game.winningscore || input.includes('Escape')){
            this.game.gameOver = false;
            } 
        }
        context.restore();
    }
}