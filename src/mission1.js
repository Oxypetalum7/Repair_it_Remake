import { voice1 } from "./sound.js";
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
        //console.log(this.x)
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
        this.hit = true;
    }

    update(canvas) {
        this.render(canvas)
        this.count++;
        if (this.drawStateX > 2) this.hit = false;
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

export class Chara extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
        this.drawStateX = 0;
        this.drawStateY = 2;
        this.frameCount = 0.0;
        this.damaged = false;
        this.count = 0;
        this.alpha = 1;
    }

    update(canvas) {
        this.frameCount+= 0.5;
        if(this.damaged && this.count < 50) {
            this.alhpa = 1 + Math.sin(((this.frameCount%2)*Math.PI)) 
            this.count++
        } else {
            this.alhpa = 1;
            this.count = 0;
            this.damaged = false
        }
        this.render(canvas)
    }

    render() {
        const _ctx =canvas.getContext( '2d' );
        _ctx.globalAlpha = this.alhpa;
        _ctx.drawImage(
            this.img,
            0 + this.drawStateX % 3 * 32,
            0 + this.drawStateY * 32,
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width*1, 
            this.height*1, 
		);
        _ctx.globalAlpha = 1;
    }

    hit(obj) {
        if((Math.abs(this.x - obj.x) < this.width/2 + obj.width/2) && (Math.abs(this.y - obj.y) < this.height/2 + obj.height/2)){
            console.log('hit');
            obj.hit = false;
            voice1.play()
            this.damaged = true;
        }
    }

    walkToRight() {
        if(this.x + this.width < 640){
            this.x += 4;
            this.drawStateY = 2;
            this.drawStateX++;
        }   
    }

    walkToLeft() {
        if(this.x > 0){
            this.x -= 4;
            this.drawStateY = 1;
            this.drawStateX++;
        }
    }
}

export class Battery extends sprImg {
    constructor( img, width, height , x , y ) {
        super( img, width, height , x, y );
        this.drawStateX = 0;
        this.drawStateY = 2;
        this.frameCount = 0.0;
        this.damaged = false;
        this.count = 0;
        this.alpha = 1;
    }

    update(canvas) {
        this.render(canvas)
    }

    render() {
        const _ctx =canvas.getContext( '2d' );
        _ctx.drawImage(
            this.img,
            0, 
            64, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height, 
		);
    }
}