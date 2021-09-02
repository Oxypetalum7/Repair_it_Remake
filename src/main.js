import { Game } from './game.js';
import { Scene } from './scene.js';
import { spr_title, spr_spana, spr_start } from "./title.js";
import { Spr_back1, Caption1, Fighter, Bomb } from './mission1.js';
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
			if ( start.pushFlag ) {
				setTimeout(() => {
					music.pause()
					game.currentScene = mainScene();
				}, 1100)
			}
		} //scene.onenterframe() 終了

		return scene;
	}

	const mainScene = () => {
		const scene = new Scene();
		const background = new Spr_back1('../img/background.png', 640, 480, 0, 0);
		const caption = new Caption1('../img/mission1.png', 300, 51, 50, 300);
		const fighter1 = new Fighter('../img/fighter.png', 200, 124, -200, 100);
		scene.add(background)
		scene.add(caption)
		scene.add(fighter1)
		scene.onenterframe = () => {
			if(fighter1.count % 55 == 0) {
				const tmp = new Bomb('../img/bomb.png', 32, 32, fighter1.x, fighter1.y)
				game.currentScene.add(tmp);
			}
		}
		return scene;
	}

	game.add( titleScene() );
	game.start()

} );