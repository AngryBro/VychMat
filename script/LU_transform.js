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
	y = solve_triangle(L,b);
	x = solve_triangle(U,y);
	var html = '\\(A='+A.tex()+'='+L.tex()+'\\cdot '+U.tex()+
	'\\)<br><br>'+
	'\\('+L.tex()+'\\cdot y ='+b.tex()+'~~~\\Rightarrow ~~~ y ='+y.tex()+'\\)<br><br>'+
	'\\('+U.tex()+'\\cdot x ='+y.tex()+'~~~\\Rightarrow ~~~ x='+x.tex()+
	'\\)<br><br>Точное решение \\(x^*=A^{-1}b='+
	A.invert().mult(b).tex()+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}