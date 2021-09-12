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
		this.keybind( 'right', 'ArrowRight' );
		this.keybind( 'left', 'ArrowLeft' );
        this.keybind( 'space' , ' '  )

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

        this._setEventListener();
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

    _setEventListener() {
		//なにかキーが押されたときと、はなされたときに呼ばれる
		const _keyEvent = e => {
			//デフォルトのイベントを発生させない
			e.preventDefault();
			//_keysに登録された数だけ繰り返す
			for ( let key in this._keys ) {
				//イベントのタイプによって呼び出すメソッドを変える
				switch ( e.type ) {
					case 'keydown' :
						//押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをtrueにする
						if ( e.key === this._keys[key] ) this.input[key] = true;
						break;
					case 'keyup' :
						//押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをfalseにする
						if ( e.key === this._keys[key] ) this.input[key] = false;
						break;
				}
			}
		}
		//なにかキーが押されたとき
		addEventListener( 'keydown', _keyEvent, { passive: false } );
		//キーがはなされたとき
		addEventListener( 'keyup', _keyEvent, { passive: false } );
	} //_setEventListener() 終了

    keybind( name, key ) {
		//キーの名前と、キーコードを関連づける
		this._keys[name] = key;
		//キーが押されているかどうかを入れておく変数に、まずはfalseを代入しておく
		this.input[name] = false;         
	} //keybind() 終了
}
