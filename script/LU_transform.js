function LU_transform() {
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var output = document.getElementById('output');
	if(!check_input(A,b)) {
		output.innerHTML = 'Данные некорректны.';
		console.log('Данные некорректны.');
		return;
	}
	var LU = A.LU();
	var L = LU.L;
	var U = LU.U;
	var n = A.size.n;
	var x = new Matrix('0',n,1);
	var y = x.copy();
	y.set(1,b.get(1));
	for(var i = 2; i<=n; i++) {
		var y_i = b.get(i);
		for(var j = 1; j<i; j++) {
			y_i -= L.get(i,j)*y.get(j);
		}
		y.set(i,y_i);
	}
	x.set(n,y.get(n)/U.get(n,n));
	for(var i = n-1; i>0; i--) {
		var x_i = y.get(i);
		for(var j = n; j>i; j--) {
			x_i -= x.get(j)*U.get(i,j);
		}
		x.set(i,x_i/U.get(i,i));
	}
	var html = '\\(A='+A.tex()+'='+L.tex()+'\\cdot '+U.tex()+
	'\\)<br><br>\\(x='+x.tex()+'\\)<br><br>Точное решение \\(x*=A^{-1}b='+
	A.invert().mult(b).tex()+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}