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
        context.fillText('Score, to be NO.1 : ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time, gotta go fast 200 secs:   ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // energy
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Energy, know how/when to use ur sp: ' + (this.game.energy * 0.001).toFixed(1), 20, 150);
        // lives
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }
        // Enter key
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Enter key(for a special attack) ', 980, 200)
        setTimeout(5000)
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('', 980, 200)
        // down key
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('ArrowDown key when running to sit', 920, 150)
        // diving key
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('In mid-air, arrowdown to dive', 970, 100)
        // movement
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('normal left, right, up keys', 960, 50)
        // debug mode
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('d to turn off/on debug mode(case sensitive)', 840, 250)
        // winning score
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('winning score is 130', 1080, 300)
        // tips
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('kill enemies with special attack and save ur health and energy, special attack consumes energy', 280, 350)
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