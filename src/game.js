import { Scene } from './scene.js';
import { music } from "./sound.js"
export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.scenes = [];
        this.currentScene;
        this.input = {};
        this._keys = {};
        this.music = new Audio('../assets/Repair_main_loop.mp3')
        this.isGameClicked = false;
    }
    start() {
        canvas.addEventListener("click", e => {
            if (!this.isGameClicked){
                music.play()
                this.isGameClicked = true;
            } else {
                const rect = canvas.getBoundingClientRect();
                const point = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                for ( let i=0; i<this.currentScene.objs.length; i++ ) {
                    this.currentScene.objs[i].event( point );
                }
            }
        })
        this.currentScene = this.currentScene || this.scenes[0];
        this.mainLoop()
    }

    mainLoop() {
        this.currentScene.update();
        const ctx = this.canvas.getContext('2d');
        ctx.globalAlpha = 1
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        for ( let i=0; i<this.currentScene.objs.length; i++ ) {
			this.currentScene.objs[i].update( this.canvas );
		}
        requestAnimationFrame( this.mainLoop.bind( this ) );
    }

    add( scene ) {
		//引数がSceneのとき、this.scenesの末尾にsceneを追加
		if ( scene instanceof Scene ) this.scenes.push( scene );
		//引数がSceneでなければ、コンソールにエラーを表示
		else console.error( 'Gameに追加できるのはSceneだけだよ！' );
	} //add()終了
}
