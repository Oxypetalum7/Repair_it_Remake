import { Game } from './game.js';
import { spr_title, spr_spana, spr_start } from "./title.js";
addEventListener( 'load', () => {
	const title = new spr_title('../img/title.png', 480, 190, 80, 80);
	const start = new spr_start('../img/start.png', 840, 120, 50, 300);
	const spanas = [];
	for(let i = 0; i < 10; i ++) {
		for(let j = 0; j < 10; j++){
			spanas.push(new spr_spana('../img/spana.gif', 64, 64, -64 + 128*j, -64 + 128*i))
		}
	}
	const game = new Game();
	for(let i = 0; i < 100; i ++) {
		game.add(spanas[i])
	}
	game.add(title)
	game.add(start)
	game.start()

} );