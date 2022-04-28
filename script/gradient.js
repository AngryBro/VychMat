// x[k+1] = x[k] - delta[k] * A * A_T * r[k]
// r[k] = A x[k] - b
// delta = (r[k]*A*A_T*r[k]) / (A*A_T*r[k])^2 
// ||r[k]||<eps
function gradient_iteration(digits) {
	digits = digits<3?3:Math.round(digits);
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var eps = document.getElementById('eps').value;
	eps = (eps<0.001)&&(eps>0)?eps:0.001;
	var n = A.size.n;
	var output = document.getElementById('output');
	x = [null,null];
	x[0] = b.copy();
	var iter = 0;
	var r = [null];
	var delta = [null];
	var AAT = A.mult(A.T());
	var F = [null];
	F[0] = A.mult(x[0]).dif(b);
	r[0] = F[0].mult(-1);
	for(var k = 0; r[k].vector_norm()>=eps; k++) {
		r.length++;
		delta.length++;
		x.length++;
		F.length++;
		delta[k] = r[k].T().mult(r[k]).get(1,1)/
		r[k].T().mult(A.mult(r[k])).get(1,1);
		x[k+1] = x[k].dif(F[k].mult(delta[k]));
		iter ++; console.log(r[k].vector_norm());
		F[k+1] = A.mult(x[k+1]).dif(b);
		r[k+1] = F[k+1].mult(-1);
		if(iter>10000) {
			console.log('Too many iterations');
			break;
		}
	}
	var solution = x[x.length-2];
	var x_star = A.invert().mult(b);
	var html = '\\(A='+A.tex(digits)+',~~~b='+b.tex(digits)+',~~~\\varepsilon ='+eps+
	'\\)<br><br>'+
	'\\(x \\approx '+solution.tex(digits)+'\\)<br><br>'+
	'Количество итераций: '+iter+'<br><br>'+
	'Точное решение \\(x^* = A^{-1} b='+x_star.tex(digits)+'\\)<br><br>'+
	'\\(x - x^* ='+solution.dif(x_star).tex(digits)+'\\)<br><br>'+
	'\\(\\|x - x^*\\| = '+solution.dif(x_star).vector_norm()+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}