export class DifficultyUI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica'
        this. Difficulty = document.getElementsByClassName('#Difficulty')
        this. Difficulty1 = document.getElementsByClassName('#Difficulty1')
        this. Difficulty2 = document.getElementsByClassName('#Difficulty2')
        this.Difficulty.width= 200
        this.Difficulty.height=200
        this.Difficulty1.width= 200
        this.Difficulty1.height=200
        this.Difficulty2.width= 200
        this.Difficulty2.height=200
    }
    
    draw(context){
        context.save();
        //score
        context.fillText('Score, 170 to win : ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time, 200 secs:   ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // energy
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Energy, max is 200:  ' + (this.game.energy * 0.001).toFixed(1), 20, 150);
        // stamina
        context.font = this.fontSize * 0.8 +'px ' + this.fontFamily;
        context.fillText('Stamina, max is 75:  ' + (this.game.stamina *0.001).toFixed(1), 30, 220);
        // lives
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }
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