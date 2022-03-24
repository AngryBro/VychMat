class Matrix {
	constructor() {
		switch(arguments[0]) {
			case 'array': {
				if(arguments.length>=2) {
					var arr = arguments[1];
					for(var i = 0; i<arr.length; i++) {
						if((arr[0].length!=arr[i].length)&&(arr[i].length==0)) {
							console.log('ERROR: Incorrect matrix size');
							return new Matrix('NaN');
						}
					}
					this.array = arguments[1];
				}
				else {
					console.log('ERROR: No array for matrix');
					return new Matrix('NaN');
				}
				break;
			}
			case '0': {
				if(arguments.length>=3) {
					var m = arguments[1];
					var n = arguments[2];
					var arr = [];
					for(var i = 0; i<n; i++) {
						var temp = []
						for(var j = 0; j<m; j++) {
							temp.push(0);
						}
						arr.push(temp);
					}
					return new Matrix('array',arr);
				}
				console.log('ERROR: No size of null-matrix');
				return new Matrix('NaN');
			}
			case '1': {
				if(arguments.length>=2) {
					var n = arguments[1];
					var arr = [];
					for(var i = 0; i<n; i++) {
						var temp = []
						for(var j = 0; j<n; j++) {
							temp.push(i==j?1:0);
						}
						arr.push(temp);
					}
					return new Matrix('array',arr);
				}
				console.log('ERROR: No size of I matrix');
				return new Matrix('NaN');
			}
			case 'vectors': {
				if(arguments.length>=2) {
					for(var i = 1; i<arguments.length; i++) {
						if((arguments[i].size.n!=1)||
							(arguments[i].size.m!=arguments[1].size.m)) {
								console.log('ERROR: Incorrect vectors for matrix');
								return new Matrix('NaN');
						}
					}
					var arr = []
					for(var i = 1; i<arguments.length; i++) {
						arr.push(arguments[i].array[0]);
					}
					return new Matrix('array',arr);
				}
				console.log('ERROR: No vectors for matrix');
				return new Matrix('NaN');
			}
			case 'vector': {
				if(arguments.length>1) {
					return new Matrix('array',[arguments[1]]);
				}
				console.log('ERROR: No vector for matrix');
				return new Matrix('NaN');
			}
			case 'NaN': {
				return new Matrix('array',[[NaN]]);
			}
			default: {
				return new Matrix('NaN');
			}
		}
		this.size = {
			m : (this.array[0][0]!=NaN)?this.array[0].length:0,
			n: (this.array[0][0]!=NaN)?this.array.length:0,
			sqr: (this.array.length==this.array[0].length)&&(this.array[0][0]!=NaN)
		};
	}
	static input(id) {
		var rows_raw = document.getElementById(id).value.split('\n');
		var rows = [];
		for(var i = 0; i<rows_raw.length;i++) {
			if(rows_raw[i].replace(/\s+/,"")!="") {
				rows.push(rows_raw[i]);
			}
		}
		for(var i =0; i<rows.length; i++) {
			rows[i] = rows[i].split(/\s+/);
			if(rows[i][0]=="") {
				rows[i].shift();
			}
			if(rows[i].length!=undefined) {
				for(var j = 0; j<rows[0].length; j++) {
					rows[i][j] = Number(rows[i][j]);
				}
			}
		}
		return new Matrix('array',rows).T();
	}
	arr() {
		return JSON.parse(JSON.stringify(this.array));
	}
	copy() {
		return new Matrix('array',JSON.parse(JSON.stringify(this.array)));
	}
	vector(i) {
		if((i<1)||(i>this.size.n)) {
			console.log('ERROR: Vector\'s index out of range');
			return new Matrix('NaN');
		}
		return new Matrix('vector',this.arr()[i-1]);
	}
	raw_tex() {
		var temp = [];
		var eps = (arguments.length>0)?arguments[0]:3;
		var out = new Matrix('array',JSON.parse(JSON.stringify(this.array)));
		var p = Math.pow(10,eps);
		for(var i = 0; i<this.size.n; i++) {
			for(var j = 0; j<this.size.m;j++) {
				out.array[i][j] = Math.round(out.array[i][j]*p)/p;
			}
		}
		for(var i = 0; i<out.size.n; i++) {
			temp.push(out.array[i].join(' & '));
		}
		return '\\begin{pmatrix} '+temp.join(' \\\\ ')+'\\end{pmatrix}';
	}
	raw_log() {
		var log = [];
		for(var i = 0; i<this.size.n; i++) {
			log.push(JSON.stringify(this.array[i]));
		}
		console.log(log.join('\n'));
	}
	tex() {
		if(arguments.length>0) {
			return this.T().raw_tex(arguments[0]);
		}
		return this.T().raw_tex();
	}
	log() {
		this.T().raw_log();
	}
	get(i,j) {
		if((i<1)||(j<1)||(i>this.size.m)||(j>this.size.n)) {
			console.log('ERROR: No element ('+i+','+j+')');
			return NaN;
		}
		return this.array[j-1][i-1];
	}
	set(i,j,e) {
		if((i<1)||(j<1)||(i>this.size.m)||(j>this.size.n)) {
			console.log('ERROR: No element ('+i+','+j+')');
		}
		else {
			this.array[j-1][i-1] = e;
		}
	}
	T() {
		var arr = [];
		for(var i = 0; i<this.size.m; i++) {
			var temp = [];
			for(var j = 0; j<this.size.n; j++) {
				temp.push(this.array[j][i]);
			}
			arr.push(temp);
		}
		return new Matrix('array',arr);
	}
	mult(m_) {
		if(m_==JSON.stringify(m_)) {
			var arr = JSON.parse(JSON.stringify(this.array));
			for(var i = 0; i<arr.length; i++) {
				for(var j = 0; j<arr[0].length; j++) {
					arr[i][j] *= m_;
				}
			}
			return new Matrix('array',arr);
		}
		else {
			var _m_ = this.size.m;
			var _n_ = this.size.n;
			var _k_ = m_.size.n;
			if(_n_!=m_.size.m) {
				console.log('ERROR: Inconsistent matrices');
				return new Matrix('NaN');
			}
			else {
				var res = new Matrix('0',_m_,_k_);
				for(var i = 1; i<=_m_; i++) {
					for(var j = 1; j<=_k_; j++) {
						var ij = 0;
						for(var k = 1; k<=_n_; k++) {
							ij += this.get(i,k)*m_.get(k,j);
						}
						res.set(i,j,ij);
					}
				}
				return res;
			}
		}
	}
	minor_matrix(_j,_i) {
		var arr = [];
		for(var i=0; i<this.size.n; i++) {
			if(i!=_i-1) {
				var temp = [];
				for(var j = 0; j<this.size.m; j++) {
					if(j!=_j-1) {
						temp.push(this.array[i][j]);
					}
				}
				arr.push(temp);
			}
		}
		return new Matrix('array',arr);
	}
	det() {
		if(!this.size.sqr) {
			console.log('ERROR: Not square matrix');
			return NaN;
		}
		if(this.size.m*this.size.n==1) {
			return this.array[0][0];
		}
		var s = 0;
		for(var i = 0; i<this.size.m; i++) {
			s+=this.array[0][i]*((i%2)*(-2)+1)*this.minor_matrix(i+1,1).det();
		}
		return s;
	}
	minor(i,j) {
		return this.minor_matrix(i,j).det();
	}
	A(i,j) {
		return (((i+j)%2)*(-2)+1)*this.minor(i,j);
	}
	invert() {
		var res = new Matrix('0',this.size.m,this.size.n);
		if(this.size.n!=this.size.m) {
			console.log('ERROR: Not square matrix');
			return new Matrix('NaN');
		}
		var n = this.size.n;
		for(var i = 1; i<=n; i++) {
			for(var j = 1; j<=n; j++) {
				res.set(j,i,this.A(i,j));
			}
		}
		res = res.mult(1/this.det());
		return res;
	}
	sum(s) {
		var m = this.size.m;
		var n = this.size.n;
		if(JSON.stringify(s.size)!=JSON.stringify(this.size)) {
			console.log('ERROR: Different size matrices');
			return new Matrix('NaN');
		}
		var res = this.copy();
		for(var i = 0; i<n; i++) {
			for(var j = 0; j<m; j++) {
				res.array[i][j] += s.array[i][j];
			}
		}
		return res;
	}
	dif(s) {
		var m = this.size.m;
		var n = this.size.n;
		if(JSON.stringify(s.size)!=JSON.stringify(this.size)) {
			console.log('ERROR: Different size matrices');
			return new Matrix('NaN');
		}
		var res = this.copy();
		for(var i = 0; i<n; i++) {
			for(var j = 0; j<m; j++) {
				res.array[i][j] -= s.array[i][j];
			}
		}
		return res;
	}
	minus() {
		var m = this.size.m;
		var n = this.size.n;
		var res = this.copy();
		for(var i = 0; i<n; i++) {
			for(var j = 0; j<m; j++) {
				res.array[i][j] *=(-1);
			}
		}
		return res;
	}
	LU() {
		var A = this.copy();
		var n = A.size.n;
		if((A.det()*A.get(1,1)==0)||(!A.size.sqr)) {
			console.log('No LU view');
			return new Matrix('NaN');
		}
		var L = new Matrix('0',n,n);
		var U = L.copy();
		for(var i = 1; i<=n; i++) {
			for(var j = 1; j<=n; j++) {
				U.set(i,j,0);
				L.set(i,j,0);
			}
			L.set(i,i,1);
		}
		for(var i=1; i<=n; i++) {
			for(var j = 1; j<=n; j++) {
				if(i<=j) {
					var s = 0
					for(var k = 1; k<i; k++) {
						s += L.get(i,k)*U.get(k,j);
					}
					U.set(i,j,A.get(i,j)-s);
				}
				else {
					var s = 0
					for(var k = 1; k<j; k++) {
						s += L.get(i,k)*U.get(k,j);
					}
					L.set(i,j,(A.get(i,j)-s)/U.get(j,j));
				}
			}
		}
		return {
			L: L,
			U: U
		};
	}
}