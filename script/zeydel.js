function zeydel_iteration(digits) {
	digits = digits<3?3:Math.round(digits);
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var eps = document.getElementById('eps').value;
	eps = (eps<0.001)&&(eps>0)?eps:0.001;
	var n = A.size.n;
	var output = document.getElementById('output');
	var approx = true;
	var strong = false;
	for(var k = 1; k<=n; k++) {
		var s = 0;
		for(var i = 1; i<k; i++) {
			s += Math.abs(A.get(k,i));
		}
		for(var i = k+1;i<=n; i++) {
			s += Math.abs(A.get(k,i));
		}
		if(Math.abs(A.get(k,k))<s) {
			approx = false;
		}
		if(Math.abs(A.get(k,k))>s) {
			strong = true;
		}
	}
	approx = approx?(strong?true:false):false;
	if(!check_input(A,b)) {
		output.innerHTML = 'Данные некорректны.';
		console.log('Данные некорректны.');
		return;
	}
	var x = [];
	var n = A.size.n;
	x.length = 2;
	x[0] = new Matrix('0',n,1);
	x[1] = b.copy();
	var k = 1;
	while(x[k].dif(x[k-1]).vector_norm()>eps) {
		x.length++;
		x[k+1] = b.copy();
		for(var i = 1; i<=n; i++) {
			for(var j = 1; j<i; j++) {
				x[k+1].set(i,x[k+1].get(i)+A.get(i,j)*x[k+1].get(j));
			}
			for(var j = i; j<=n; j++) {
				x[k+1].set(i,x[k+1].get(i)+A.get(i,j)*x[k].get(j));
			}
		}
		k+=1;
		if(k>100) {
			console.log('Too many iterations');
			break;
		}
	}
	var solution = x[x.length-1];
	var x_star = A.invert().mult(b);
	solution.log()
}