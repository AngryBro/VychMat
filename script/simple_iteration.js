function c(i,j,A) {
	return i==j?0:-A.get(i,j)/A.get(i,i);
}
function simple_iteration(digits) {
	digits = digits<3?3:Math.round(digits);
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var eps = document.getElementById('eps').value;
	eps = (eps<0.001)&&(eps>0)?eps:0.001;
	var n = A.size.n;
	var output = document.getElementById('output');
	x = [null,null];
	x[0] = new Matrix('0',n,1);
	x[1] = b.copy();
	var iter = 0;
	for(var k =1;x[k].dif(x[k-1]).vector_norm()>eps; k++) {
		x.length ++;
		x[k+1] = x[k].copy();
		for(var i = 1; i<=n; i++) {
			x[k+1].set(i,b.get(i)/A.get(i,i));
			for(var j=1;j<=n;j++) {
				x[k+1].set(i,x[k+1].get(i)+c(i,j,A)*x[k].get(j));
			}
		}
		iter++;
		if(iter>1000) {
			console.log('Слишком много итераций');
			break;
		}
	}
	var solution = x[x.length-1];
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