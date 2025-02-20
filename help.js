class Help_Guide {
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
        context.fillText('Score, 170 to win : ' + this.game.score, 20, 50);
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
        context.fillText('Press the ArrowDown key when running to sit', 920, 150)
        // diving key
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('', 970, 100)
        // movement
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('', 960, 50)
        // debug mode
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('', 840, 250)
        // winning score
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('winning score is 130', 1080, 300)
        // tips
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(' ', 280, 350)
        // energy gameover
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('', 980, 400)}
    }