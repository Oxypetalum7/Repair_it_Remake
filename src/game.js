
export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.objs = [];
        this.music = new Audio('../assets/Repair_main_loop.mp3')
    }
    start() {
        this.music.play();
        this.music.currentTime = 0
        this.music.volume = 0.1;
        this.mainLoop()
        this.music.addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
          }, false);
    }

    mainLoop() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        for ( let i=0; i<this.objs.length; i++ ) {
			this.objs[i].update( this.canvas );
		}
        requestAnimationFrame( this.mainLoop.bind( this ) );
    }

    add( obj ) {
		this.objs.push( obj );
	}
}
