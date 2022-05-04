var input_iter = `
	digits = digits<3?3:Math.round(digits);
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var eps = document.getElementById('eps').value;
	eps = (eps<0.001)&&(eps>0)?eps:0.001;
	var n = A.size.n;
	var output = document.getElementById('output');
`
var output_iter = `
	var x_star = A.invert().mult(b);
	var html = '\\\\(A='+A.tex(digits)+',~~~b='+b.tex(digits)+',~~~\\\\varepsilon ='+eps+
	'\\\\)<br><br>'+
	'\\\\(x \\\\approx '+solution.tex(digits)+'\\\\)<br><br>'+
	'Количество итераций: '+iter+'<br><br>'+
	'Точное решение \\\\(x^* = A^{-1} b='+x_star.tex(digits)+'\\\\)<br><br>'+
	'\\\\(x - x^* ='+solution.dif(x_star).tex(digits)+'\\\\)<br><br>'+
	'\\\\(\\\\|x - x^*\\\\| = '+solution.dif(x_star).vector_norm()+'\\\\)';
	output.innerHTML = html;
	MathJax.typeset();
`