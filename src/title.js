import { sprImg } from "./Sprite.js";
import { music, button1 } from "./sound.js";

export class spr_title extends sprImg {
    constructor( img, width, height , x , y){
        super( img, width, height , x, y);
        this.blankAlpha = 1;
        this.pushFlag = false;
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

    event(point) {
        const hit1 = (0 <= point.x && point.x <= canvas.width)  && (0 <= point.y && point.y <= canvas.width)  
        if (hit1) { 
            this.pushFlag = true;
        }
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
        this.pushFlag = false;
        this.blankAlpha = 1;
    }

    update( canvas ) {
        if (this.pushFlag) {
            if (this.blankAlpha > 0) {
                this.blankAlpha = (this.blankAlpha*1000 - 20)/1000;
                console.log(this.blankAlpha)
            }
        }
        this.frameCount++
        if (this.frameCount%1024==0){
            this.x = this.initx;
            this.y = this.inity;
        }
        if(this.frameCount%8==0){
            this.x+=2;
            this.y-=2;
        }
        this.render( canvas );
	}

    render() {
        const _ctx = canvas.getContext( '2d' );
        _ctx.globalAlpha = this.blankAlpha
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

    event(point) {
        const hit1 = (0 <= point.x && point.x <= canvas.width)  && (0 <= point.y && point.y <= canvas.width)  
        if (hit1) { 
            this.pushFlag = true;
        }
    }
}

export class spr_start extends sprImg {
    constructor( img, width, height , x , y){
        super( img, width, height , x, y);
        this.frameCount = 0;
        this.pushFlag = false;
        this.btnAlphafrq;
        this.blankAlpha = 1;
    }

    update( canvas ) {
        if( !this.pushFlag ){
            this.frameCount += 0.015;
            this.btnAlphafrq = this.blankAlpha + Math.sin(((this.frameCount%2)*Math.PI)) 
            this.render( canvas );
        } else {
            this.frameCount += 0.45;
            if (this.blankAlpha > -1) {
                this.blankAlpha = (this.blankAlpha*1000 - 40)/1000;
            }
            this.btnAlphafrq = this.blankAlpha + Math.sin(((this.frameCount%2)*Math.PI)) 
            this.render_pushed( canvas );
        }
	}

    render() {
        const _ctx = canvas.getContext( '2d' );
        _ctx.globalAlpha = this.btnAlphafrq
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

    render_pushed() {
        const _ctx = canvas.getContext( '2d' );
        if ( this.btnAlphafrq > 0 ) {
            _ctx.globalAlpha = this.btnAlphafrq
        } else {
            _ctx.globalAlpha = 0
        }
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

    event(point) {
        const hit1 = (0 <= point.x && point.x <= canvas.width)  && (0 <= point.y && point.y <= canvas.width)  
        if (hit1) { 
            if(!this.pushFlag){
                button1.play()
                this.pushFlag = true;
            }
        }
    }
}