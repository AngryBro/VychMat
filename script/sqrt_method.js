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
		for(var j = 1; j<i; j++) {
			S.set(i,j,new Complex(0,0));
		}
	}
	for(var i = 2; i<=n; i++) {
		var s = new Complex(0,0);
		for(var k = 1; k<i; k++) {
			
			s = s.sum(S.get(k,i).mult(S.get(k,i)));
		}
		S.set(i,i,A.get(i,i).dif(s).sqrt());
		for(var j = i+1; j<=n; j++) {
			var s = new Complex(0,0);
			for(var k = 1; k<i; k++) {
				s = s.sum(S.get(k,i).mult(S.get(k,j)));
			}
			S.set(i,j,A.get(i,j).dif(s).div(S.get(i,i)));
		}
	}
	S.Clog(); S.T().Clog()
	S.T().Cmult(S).log();
}