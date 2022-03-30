function solve_triangle(M,b) {
	var x = b.copy();
	var n = b.size.m;
	var up = true;
	var down = true;
	for(var i = 1;i<=n;i++) {
		for(var j = i+1; j<=n; j++) {
			if(M.get(i,j)!=0) {
				down = false;
			}
		}
		for(var j = 1; j<i; j++) {
			if(M.get(i,j)!=0) {
				up = false;
			}
		}
	}
	if(!(up||down)) {
		console.log('Not triangle');
		return new Matrix('NaN');
	}
	if(up) {
		x.set(n,x.get(n)/M.get(n,n));
		for(var i = n-1; i>0; i--) {
			for(var j = i+1; j<=n; j++) {
				x.set(i,x.get(i)-M.get(i,j)*x.get(j));
			}
			x.set(i,x.get(i)/M.get(i,i));
		}
	}
	else {
		x.set(1,x.get(1)/M.get(1,1));
		for(var i = 2; i<=n; i++) {
			for(var j = 1; j<i; j++) {
				x.set(i,x.get(i)-M.get(i,j)*x.get(j));
			}
			x.set(i,x.get(i)/M.get(i,i));
		}
	}
	return x;
}
function Csolve_triangle(M,b) {
	var x = b.toComplex();
	var n = b.size.m;
	M = M.toComplex();
	var up = true;
	var down = true;
	for(var i = 1;i<=n;i++) {
		for(var j = i+1; j<=n; j++) {
			if(!M.get(i,j).eq(new Complex(0,0))) {
				down = false;
			}
		}
		for(var j = 1; j<i; j++) {
			if(!M.get(i,j).eq(new Complex(0,0))) {
				up = false;
			}
		}
	}
	if(!(up||down)) {
		console.log('Not triangle');
		return new Matrix('NaN');
	}
	if(up) {
		M = M.toComplex();
		x.set(n,x.get(n).div(M.get(n,n)));
		for(var i = n-1; i>0; i--) {
			for(var j = i+1; j<=n; j++) {
				x.set(i,x.get(i).dif(M.get(i,j).mult(x.get(j))));
			}
			x.set(i,x.get(i).div(M.get(i,i)));
		}
	}
	else {
		x.set(1,x.get(1).div(M.get(1,1)));
		for(var i = 2; i<=n; i++) {
			for(var j = 1; j<i; j++) {
				x.set(i,x.get(i).dif(M.get(i,j).mult(x.get(j))));
			}
			x.set(i,x.get(i).div(M.get(i,i)));
		}
	}
	return x;
}