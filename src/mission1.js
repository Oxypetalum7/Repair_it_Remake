import { sprImg } from "./sprite.js";

export class Spr_back1 extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
    }

    update( canvas ) {
		this.render( canvas );
	}

    render(){
        const _ctx =canvas.getContext( '2d' );
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

export class Caption1 extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
        this.alpha = 0;
        this.count = 0;
        this.scale = 1.2;
        this.dist = 0;
    }

    update( canvas ) {
        this.render( canvas );
        if(this.count > 10){
            this.dist-= 8
        }
        this.count++
	}

    render(){
        const _ctx =canvas.getContext( '2d' );
        _ctx.save();
        _ctx.grobalAlpha = this.alpha;
        _ctx.translate(canvas.width/2, canvas.height/2)
        _ctx.scale(this.scale, this.scale);
        _ctx.drawImage(
            this.img,
            0, 
            0, 
            this.width, 
            this.height, 
            -this.width/2, 
            -this.height/2 + this.dist, 
            this.width, 
            this.height, 
		);
        _ctx.restore()
    }
}

export class Fighter extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
        this.scale = -0.5;
        this.dx = 4;
        this.count = 0
    }

    update(canvas) {
        this.x += this.dx;
        console.log(this.x)
        if((this.x > 840 || this.x < -200)) {
            this.dx = -this.dx
            this.scale = -this.scale
        }
        this.render(canvas)
        this.count++
    }

    render() {
        const _ctx =canvas.getContext( '2d' );
        _ctx.save()
        _ctx.translate(this.x, this.y)
        _ctx.scale(this.scale, 0.5);
        _ctx.drawImage(
            this.img,
            0, 
            0, 
            this.width, 
            this.height, 
            -this.width/2, 
            -this.height/2, 
            this.width, 
            this.height, 
		);
        _ctx.restore()
    }
}

export class Bomb extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
        this.drawStateX = 0;
        this.drawStateY = 0;
        this.count = 0;
    }

    update(canvas) {
        this.render(canvas)
        this.count++;
        if(this.y > 400) {
            if(this.count % 12 == 0){
                this.drawStateX ++;
                this.drawStateY = 5;
            }
        } else {
            this.y += 4
            if(this.count % 9 == 0) {
                this.drawStateX = this.count % 2
             }
        }
    }

    render() {
        const _ctx =canvas.getContext( '2d' );
        _ctx.drawImage(
            this.img,
            32 + this.drawStateX * 32, 
            0 + this.drawStateY * 32, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height, 
		);
    }
}



