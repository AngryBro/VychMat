class Complex {
	constructor() {
		// Re+iIm x+iy
		var x;
		var y;
		switch(arguments.length) {
			case 2: {
				x = arguments[0];
				y = arguments[1];
				break;
			}
			case 0: {
				x = 0;
				y = 0;
				break;
			}
			default: {
				console.log('ERROR arguments in Comlex constructor');
				break;
			}
		}
		this.Re = x;
		this.Im = y;
	}
	sqrt() {
		if(this.Im==0) {
			if(this.Re>=0) {
				return new Complex(Math.sqrt(this.Re),0);
			}
			return new Complex(0,Math.sqrt(-this.Re));
		}
		console.log('AAAAAAAA');
		return NaN;
	}
	static to(x) {
		if(!isNaN(x)) {
			return new Complex(x,0);
		}
		return new Complex(x.Re,x.Im);
	}
	div(d) {
		d = Complex.to(d);
		var a = this.Re; 
		var b = this.Im;
		var x = d.Re;
		var y = d.Im;
		return new Complex((a*x+b*y)/(x*x+y*y),(b*x-a*y)/(x*x+y*y));
	}
	mult(m) {
		m = Complex.to(m);
		var a = this.Re; 
		var b = this.Im;
		var x = m.Re;
		var y = m.Im;
		return new Complex(a*x-b*y,b*x+a*y);
	}
	sum(s) {
		return new Complex(this.Re+s.Re,this.Im+s.Im);
	}
	dif(s) {
		return new Complex(this.Re-s.Re,this.Im-s.Im);
	}
	eq(s) {
		return (this.Re==s.Re)&&(this.Im==s.Im);
	}
	toStr() {
		if(this.Im==0) {
			return String(this.Re);
		}
		var im = Math.abs(this.Im)==1?(this.Im==1?'i':'-i'):this.Im+'i';
		if(this.Re==0) {
			return im;
		}
		return this.Re+(this.Im>0?'+':'')+im;
	}
	log() {
		console.log(this.toStr());
	}
}