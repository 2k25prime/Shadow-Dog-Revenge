import { Player } from './player3.js';
import { InputHandler } from './input3.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import { UI } from './UI4.JS';
import { Refillife } from './refill3.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const Difficulty = document.getElementsByClassName('#Difficulty')
    const Difficulty1 = document.getElementsByClassName('#Difficulty1')
    const Difficulty2 = document.getElementsByClassName('#Difficulty2')
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 600;


    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 183;
            this.speed = 0;
            this.maxspeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.refiller = [];
            this.maxParticles = 50;
            this.refillertimer = 0;
            this.refillerinterval = 1000;
            this.enemytimer = 0;
            this.enemyinterval = 1000;
            this.debug = true;
            this.score = 0;
            this.winningscore = 130;
            this.lastScore = 0;
            this.historyScore = this.lastScore;
            this.energy = 50000;
            this.energyLimit = 0;
            this.stamina = 25000;
            this.maxstamina = 25000;
            this.maxEnergy = 50000;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 100000;
            this.gameOver = false;
            this.gameOverTime = 0;
            this.gameOverTimeMax = 3000;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime){
            if (this.energy < this.maxEnergy) {this.energy += 20;
            } if (this.player.currentState === this.player.states[4] || this.player.currentState === this.player.states[5]){
                this.energy-=40;
            } if (this.energy < 0){
                this.gameOver = true;
            }
            if (this.lastScore < this.score){
                this.lastScore = this.score;
            } if (this.lastScore > this.score){
                this.lastScore = this.historyScore;
            }
            if(this.stamina < this.maxstamina) {this.stamina += 20;
            }
            if (this.player.currentState === this.player.states[7]){
                this.stamina-=40;
            }
            this.time += 20; 
            if (this.time > this.maxTime) this.gameOver =true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemytimer > this.enemyinterval){
                this.addEnemy();
                this.enemytimer = 0;
            } else {
                this.enemytimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
           });
           // handle refillers
           if (this.refillertimer > this.refillerinterval){
            this.addRefiller();
            this.refillertimer = 0;
        } else {
            this.refillertimer += deltaTime;
        }
           this.refiller.forEach(refill => {
            refill.update();
        })
           // handle messages
           this.floatingMessages.forEach(message => {
            message.update();
            });
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.lenght > this.maxParticles) {
                this.particles.lenght = this.maxParticles;
            }
            //handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            this.refiller = this.refiller.filter(refill => !refill.markedForDeletion)
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.refiller.forEach(refill => {
                refill.draw(context);
            })
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.9) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
        addRefiller(){
            if (this.speed > 0) this.refiller.push(new Refillife(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game)
    let lastTime = 0
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
