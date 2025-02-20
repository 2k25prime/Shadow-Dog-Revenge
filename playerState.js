import { Dust, Fire, Splash } from "./particles.js";


let controllerIndex = null;
        let upPressed = false;
        let downPressed = false;
        let leftPressed = false;
        let rightPressed = false;
        let bPressed = false;

window.addEventListener('gamepaddisconnected', (event) => {
    console.log('disconnected')
})


window.addEventListener('gamepadconnected', (event) => {
    controllerIndex = event.gamepad.index;
            console.log('connected')




        
});


const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
    CHOMP: 7,
}

class State{
    constructor(state, game){
        this.state = state;
        this.game = game;
        
    }
}





export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
        this.game = game;
    }
    enter(){
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    
        handleInput(input){
        if (input.includes('ArrowLeft')) {
            this.game.player.setState(states.RUNNING, 1);
        }
        if (input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        } 
    }
}

export class Running extends State {

    constructor(game){
        super('RUNNING', game);
        
    }
    enter(){
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
             bPressed = buttons.pressed;
        }
    }
    
    handleInput(input){
        if (input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 3)
        }
        if (input.includes('f') && this.game.player.onGround() && this.game.player.currentState !== this.game.player.states[4]){
            this.game.player.setState(states.CHOMP, 1.9);
        }

        if (leftPressed) {
            this.game.player.setState(states.RUNNING, 1);
        }
        if (rightPressed){
            this.game.player.setState(states.RUNNING, 1);
        } 
       
                if (downPressed){
                    this.game.player.setState(states.SITTING, 0);
                } 
                else if (upPressed){
                    this.game.player.setState(states.JUMPING, 1)
                } 
        }   
        }
            
            
            

       






export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
        this.game = game;
    }
   
    enter(){
        this.game.particles.push(new Dust(this.game, this.game.player.x, this.game.player.y));
        if (this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.ROLLING, 3);
        }  else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }  else if (input.includes('f')){
            this.game.player.setState(states.CHOMP, 1.9);
        }
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING', game);
        this.game = game;
    }
    enter(){
        this.game.particles.push(new Dust(this.game, this.game.player.x, this.game.player.y));
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 3;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        } else if (input.includes('f')){
            this.game.player.setState(states.CHOMP, 1.9);
        }
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING', game);
        this.game = game;
    }
    enter(){
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
          if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('ArrowDown') || input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game){
        super('DIVING', game);
        this.game = game;
    }
    enter(){
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i ++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
            }
        } else if (input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 3);
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT', game);
        this.game = game;
    }
    enter(){
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 9;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        if (this.game.player.frameX >= 6 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 6 && this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }
    }
}

export class Chomp extends State{
    constructor(game){
        super('CHOMP', game);
        this.game = game;
    }
    enter(){
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 7;
    }
    controllerInput(){
        if (controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[controllerIndex];

            const buttons = gamepad.buttons;
            upPressed = buttons[12].pressed
             downPressed = buttons[13].pressed;
            leftPressed = buttons[14].pressed;
             rightPressed = buttons[15].pressed;
        }
    }
    handleInput(input){
        if (input.includes('f') && this.game.player.onGround() && this.game.player.currentState !== this.game.player.states[4]){
            this.game.player.setState(states.CHOMP, 1.9);
        } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('ArrowDown') || input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        } else if (input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        } if (this.game.player.frameX >= 6 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}












 