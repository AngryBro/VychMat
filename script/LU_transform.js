function LU_transform(digits) {
	digits = digits<3?3:Math.round(digits);
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
	var html = '\\(A='+A.tex(digits)+',~~~b='+b.tex(digits)+'\\)<br><br>'+
	'\\(A ='+L.tex(digits)+'\\cdot '+U.tex(digits)+'\\)<br><br>'+
	'\\('+L.tex(digits)+'\\cdot y ='+b.tex(digits)+'~~~\\Rightarrow ~~~ y ='+y.tex(digits)+'\\)<br><br>'+
	'\\('+U.tex(digits)+'\\cdot x ='+y.tex(digits)+'~~~\\Rightarrow ~~~ x='+x.tex(digits)+
	'\\)<br><br>Точное решение \\(x^*=A^{-1}b='+
	A.invert().mult(b).tex(digits)+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}