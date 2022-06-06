function invert_iteration(digits) {
	eval(input_iter);
	var x = [];
	var alpha = [];
	AQR = A.QR();
	var QT = AQR.Q.T();
	var R = AQR.R;
	x.push(new Matrix('0',n,1));
	x[0].set(1,1);
	alpha.push(1);
	var iter = 0;
	for(var k = 1; true; k++) {
		x.length++;
		x[k] = solve_triangle(R,QT.mult( x[k-1].mult(1/alpha[k-1]) ));
		alpha.push(0);
		for(var i = 1; i<=n; i++) {
			alpha[k] = Math.max(alpha[k], Math.abs(x[k].get(i)));
		}
		iter++;
		if(Math.abs( 1/alpha[k] - 1/alpha[k-1] )<eps) break;
	}
	var lambda = 1/alpha[iter];
	var u = x[iter];
	var html = '\\( A = '+A.tex(digits)+'~~~\\varepsilon = '+eps+' \\)<br><br>'+
	'\\( \\lambda_{|min|}(A) = '+lambda+' ~~~ u = '+u.tex(digits)+' \\)<br><br>'+
	'Количество итераций: '+iter;
	output.innerHTML = html;
	MathJax.typeset();
}