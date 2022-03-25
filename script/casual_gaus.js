function check_input(A,b) {
	return A.size.sqr&&(A.size.m==b.size.m)&&(b.size.n==1)&&(A.det()!=0);
}
function go() {
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var M;
	var M0;
	var x;
	if(check_input(A,b)) {
	var array_for_m = A.copy().array;
	array_for_m.push(b.copy().array[0]);
	M = new Matrix('array',array_for_m);
	//var M = get_matrix('matrix_M');
	M0 = M.copy();
	var d = M.get(1,1);
	for(var i = 1; i<=M.size.n;i++) {
		M.set(1,i,M.get(1,i)/d);
	}
	var d;
	for(var i = 2; i<=M.size.m; i++) {
		for(var j = 1; j<i; j++) {
			d = M.get(i,j);
			for(var k = 1; k<=M.size.n; k++) {
				M.set(i,k,M.get(i,k)-d*M.get(j,k));
			}
		}
		d = M.get(i,i);
		for(var j = i; j<=M.size.n; j++) {
			M.set(i,j,M.get(i,j)/d);
		}
	}
	x = new Matrix('vector',M.copy().array[M.size.n-1]);
	for(var i = x.size.m; i>=1; i--) {
		var xi = M.copy().get(i,M.size.n);
		for(var j = i+1; j<=M.size.m; j++) {
			xi -= M.copy().get(i,j)*x.get(j,1);
		}
		x.set(i,1,xi);
	}
	var x_star = A.invert().mult(b); A.log(); b.log()
	html = '\\(M_0 = '+M0.tex()+'\\)<br><br>\\(M='+M.tex()+'\\)<br><br>\\(~~~x ='+x.tex()+'\\)';
	html += '<br><br>Точное решение: \\(x^*=A^{-1}b='+x_star.tex()+'\\)';
	html += '<br><br>Погрешность: \\(x^*-x='+x_star.dif(x).tex()+'\\)';
	}
	else {
	html = 'Неверные входные данные.';
	}
	document.getElementById('output').innerHTML = html;
	MathJax.typeset();
}