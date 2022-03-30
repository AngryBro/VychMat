function sqrt_method() {
	var C = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	if(!check_input(C,b)) {
		output.innerHTML = 'Данные некорректны.';
		console.log('Данные некорректны.');
		return;
	}
	var A = C.copy();
	var n = A.size.n;
	var S = new Matrix('0',n,n);
	for(var i = 1;i<=n; i++) {
		for(var j = 1; j<=n; j++) {
			A.set(i,j,Complex.to(C.get(i,j)));
		}
	}
	S.set(1,1,A.get(1,1).sqrt());
	for(var j = 2; j<=n; j++) {
		S.set(1,j,A.get(1,j).div(S.get(1,1)));
	}
	for(var i = 2; i<=n; i++) {
		var temp = A.get(i,i);
		for(var k = 1; k<i; k++) {
			temp = temp.dif(S.get(k,i).mult(S.get(k,i)));
		}
		S.set(i,i,temp.sqrt());
		for(var j = i+1; j<=n; j++) {
			temp = A.get(i,j);
			for(var k = 1; k<i; k++) {
				temp = temp.dif(S.get(k,i).mult(S.get(k,j)));
			}
			S.set(i,j,temp.div(S.get(i,i)));
		}
		for(var j = 1; j<i; j++) {
			S.set(i,j,new Complex());
		}
	}
	var y;
	var x;
	y = Csolve_triangle(S.T(),b);
	x = Csolve_triangle(S,y);
	var html = '\\(A= '+C.tex()+' = '+S.T().Ctex()+'\\cdot '+S.Ctex()+'\\)<br><br>'+
	'\\('+S.T().Ctex()+'\\cdot y='+b.tex()+' ~~~\\Rightarrow~~~ y = '+y.Ctex()+'\\)<br><br>'
	+'\\('+S.Ctex()+'\\cdot x ='+y.Ctex()+'~~~\\Rightarrow~~~ x = '+x.Ctex()+'\\)<br><br>'+
	'Точное решение \\(x^*=A^{-1}b = '+C.invert().mult(b).tex()+'\\)';
	document.getElementById('output').innerHTML = html;
	MathJax.typeset();
}