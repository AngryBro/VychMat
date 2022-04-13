function edging_method(digits) {
	var a = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var output = document.getElementById('output');
	if(!check_input(a,b)) {
		output.innerHTML = 'Данные некорректны.';
		console.log('Данные некорректны.');
		return;
	}
	digits = digits<3?3:Math.round(digits);
	var A = [];
	var n = a.size.n;
	var gamma = [];
	var beta = [];
	var alpha = [];
	var u = [];
	var v = [];
	A.length = n+1;
	gamma.length = n+1;
	beta.length = n+1;
	alpha.length = n+1;
	u.length = n+1;
	v.length = n+1;
	for(var k = 1; k<n; k++) {
		A[k] = new Matrix('0',k,k);
		for(var i = 1; i<=k; i++) {
			for(var j = 1; j<=k; j++) {
				A[k].set(i,j,a.get(i,j));
			}
		}
	}
	A[n] = a.copy();
	for(var k = 2; k<=n; k++) {
		u[k] = A[k].vector(k);
		u[k].pop(k);
		v[k] = A[k].T().vector(k);
		v[k].pop(k);
		v[k] = v[k].T();
	}
	var D = [];
	D.length = n+1;
	D[1] = new Matrix('vector',[1/A[1].get(1,1)]);
	for(var i = 2; i<=n; i++) {
		beta[i] = D[i-1].mult(u[i]).mult(-1);
		gamma[i] = v[i].mult(D[i-1]).mult(-1);
		alpha[i] = 0;
		for(var k = 1;k<i;k++) {
			alpha[i] += a.get(i,k)*beta[i].get(k);
		}
		alpha[i] += a.get(i,i);
		D[i] = new Matrix('0',i,i);
		for(var j = 1; j<i; j++) {
			D[i].set(j,i,beta[i].get(j)/alpha[i]);
			D[i].set(i,j,gamma[i].T().get(j)/alpha[i]);
			for(var k = 1; k<i; k++) {
				D[i].set(j,k,D[i-1].get(j,k)+beta[i].get(j)*gamma[i].T().get(k)/alpha[i]);
			}
		}
		D[i].set(i,i,1/alpha[i]);
	}
	var html = '\\(A='+a.tex(digits)+',~~~b='+b.tex(digits)+'\\)<br><br>'+
	'\\(A^{-1}_{M.O} = '+D[n].tex(digits)+'\\)<br><br>'+
	'\\(A^{-1} = '+a.invert().tex(digits)+'\\)<br><br>'+
	'\\(x = '+D[n].tex(digits)+'\\cdot '+b.tex(digits)+' = '+
	D[n].mult(b).tex(digits)+'\\)';
	output.innerHTML = html;
	MathJax.typeset();
}