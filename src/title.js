import { sprImg } from "./Sprite.js";
export class spr_title extends sprImg {
    constructor( img, width, height , x , y){
        super( img, width, height , x, y);
    }

    update( canvas ) {
		this.render( canvas );
	}

    render() {
        const _ctx = canvas.getContext( '2d' );
        _ctx.drawImage(
            this.img,
            0, 
            0, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height, 
		);
    }
}

export class spr_spana extends sprImg {
    constructor( img, width, height , x , y){
        super( img, width, height );
        this.x = x;
        this.y = y;
        this.initx = x;
        this.inity = y;
        this.frameCount = 0;
    }

    update( canvas ) {
        this.x++;
        this.y--;
        this.frameCount++
        if (this.frameCount%128==0){
            this.x = this.initx;
            this.y = this.inity;
        }
		this.render( canvas );
	}

    render() {
        const _ctx = canvas.getContext( '2d' );
        _ctx.drawImage(
            this.img,
            0, 
            0, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height, 
		);
    }
}

export class spr_start extends sprImg {
    constructor( img, width, height , x , y){
        super( img, width, height , x, y);
    }

    update( canvas ) {
		this.render( canvas );
	}

    render() {
        const _ctx = canvas.getContext( '2d' );
        _ctx.drawImage(
            this.img,
            0, 
            0, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width/3*2, 
            this.height/3*2, 
		);
    }
}