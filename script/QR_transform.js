function QR_transform(digits) {
	digits = digits<3?3:Math.round(digits);
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var output = document.getElementById('output');
	if(!check_input(A,b)) {
		output.innerHTML = 'Данные некорректны.';
		console.log('Данные некорректны.');
		return;
	}
	var QR = A.QR();
	var Q = QR.Q;
	var R = QR.R;
	var x = solve_triangle(R,Q.T().mult(b));
	var x_star = A.invert().mult(b);
	var output = document.getElementById('output');
	var html = '\\(A='+A.tex(digits)+',~~~b='+b.tex(digits)+'\\)<br><br>'+
	'\\(A = '+Q.tex(digits)+'\\cdot '+R.tex(digits)+'\\)<br><br>'+
	'\\(Q^{-1} ='+Q.invert().tex(digits)+',~~~Q^T='+Q.T().tex(digits)+'\\)<br><br>'+
	'\\('+R.tex(digits)+'\\cdot x = '+Q.T().tex(digits)+'\\cdot '+b.tex(digits)+'\\)<br><br>'+
	'\\('+R.tex(digits)+'\\cdot x = '+Q.T().mult(b).tex(digits)+'\\)<br><br>'+
	'\\(x = '+x.tex(digits)+'\\)<br><br>'+
	'Точное решение: \\(x^*=A^{-1}b='+x_star.tex(digits)+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}