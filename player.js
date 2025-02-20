import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, Chomp} from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./FloatingMessages.js";
import { Refillife } from "./refill.js";

export class Player {
    constructor(game){
        this.game = game;
        this.spriteWidth = 573;
        this.spriteHeight = 523;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 3;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game), new Chomp(this.game)];
        this.currentState = null;
    }
    update(input, deltaTime){
        this.checkRefill();
        this.checkCollision();
        this.currentState.handleInput(input);
        this.currentState.controllerInput();
        // horizontal movement
        this.x += this.speed;
       if (input.includes('ArrowRight') && this.currentState !== this.states[6]){ this.speed = this.maxSpeed;
       } 
       else if (input.includes('ArrowLeft')& this.currentState !== this.states[6]){ this.speed = -this.maxSpeed;
       }
       else this.speed = 0;
       if (this.x < 0) this.x = 0;
       if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
       //vertical movement
       this.y += this.vy;
       if (!this.onGround()) this.vy += this.weight;
       else this.vy = 0;
       //sprite animation
       if (this.frameTimer > this.frameInterval){
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
       } else {
        this.frameTimer += deltaTime;
       }
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    onGround(){
        if (this.currentState == this.states[4])this.game.groundMargin = 183;
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxspeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if (this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[7]){
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 50));
                    
                } else {
                    this.setState(6, 0);
                    this.game.score-=1
                    this.game.lives--;
                    if (this.game.lives <= 0) {this.game.gameOver = true;
                    } if (this.game.energy <= 0) this.game.gameOver =  true;
                }
            } 
        });
    }
    checkRefill(){
        this.game.refiller.forEach(refill => {
            if (
                refill.x < this.x + this.width &&
                refill.x + refill.width > this.x &&
                refill.y < this.y + this.height &&
                refill.y + refill.height > this.y
            ){
                refill.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, refill.x + refill.width * 0.5, refill.y + refill.height * 0.5));
                if (this.currentState !== this.states[6]){
                    this.game.stamina = 75000
                    this.game.energy = 300000
                    this.game.lives+=3.5;
                    if (this.game.lives === 15){
                        refill.markedForDeletion = false
                        this.game.lives+= 0;
                    }
                    if (this.game.lives === 14){
                        this.game.lives+= 0;
                    }
                    if (this.game.lives === 13){
                        this.game.lives+= 0;
                    }
                    this.game.floatingMessages.push(new FloatingMessage('Refill', refill.x, refill.y, 400, 150));

                }
            }
        })
    }
    checkStamina(){
        if(this.currentState === this.states[7]){
            this.game.energy -= 40;
        }
      }
}
function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
      try { score = parseFloat(score); } catch (e) { score = 0; }
    }
}

