import { Game } from './game.js';
import { Scene } from './scene.js';
import { sprImg } from './Sprite.js';
import { spr_title, spr_spana, spr_start } from "./title.js";
import { music } from "./sound.js"
addEventListener( 'load', () => {

	const game = new Game();

	const titleScene = () => {
		const scene = new Scene();
		const title = new spr_title('../img/title.png', 480, 190, 80, 80);
		const start = new spr_start('../img/start.png', 840, 120, 50, 300);
		const spanas = [];
		for(let i = 0; i < 12; i ++) {
			for(let j = 0; j < 12; j++){
				if (j % 2 == 0) {
					spanas.push(new spr_spana('../img/spana.gif', 64, 64, -256 + 128*j, -256 + 128*i))
				} else {
					spanas.push(new spr_spana('../img/spana.gif', 64, 64, -256 + 128*j, -196 + 128*i))
				}
			}
		}
		for(let i = 0; i < 144; i ++) {
			scene.add(spanas[i])
		}
		scene.add(title)
		scene.add(start)

		scene.onenterframe = () => {
			//スペースキーが押されたとき、メインシーンに切り替える
			if ( start.pushFlag ) {
				setTimeout(() => {
					music.pause()
					game.currentScene = mainScene();
				}, 2000)
			}
		} //scene.onenterframe() 終了

		return scene;
	}

	const mainScene = () => {
		const scene = new Scene();
		const Game = new sprImg()
		return scene;
	}

	game.add( titleScene() );
	game.add( mainScene() );
	game.start()

} );