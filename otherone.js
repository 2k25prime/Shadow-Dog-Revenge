
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 3500;
    canvas.height = 3500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();

        }
        update(deltaTime){
            this.player.update(this.input.keys, deltaTime);
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;

    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});