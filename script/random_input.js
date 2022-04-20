function random_input(id_A,id_b,abs) {
	var digits = 3;
	var A_input = document.getElementById(id_A);
	var b_input = document.getElementById(id_b);
	var n = Math.round((Math.random()*6)+2);
	var A = Matrix.random(n,n,-abs,abs,digits);
	for(var i = 1; i<=n; i++) {
		var s = 0
		for(var j = 1; j<=n; j++) {
			s+=Math.abs(A.get(j,i));
		}
		s = Math.round(s*1000)/1000;
		A.set(i,i,(Math.round(Math.random())==0?-1:1)*s);
	}
	var b = Matrix.random(n,1,-abs,abs,digits).T();
	A_input.value = A.toStr();
	b_input.value = b.toStr();
}
function random_symmetry_pd(id_A,id_b,abs) {
	var digits = 3;
	var p = Math.pow(10,digits);
	var A_input = document.getElementById(id_A);
	var b_input = document.getElementById(id_b);
	var n = Math.round((Math.random()*6)+2);
	var A = Matrix.random(n,n,-abs,abs,digits);
	A = A.mult(A.T());
	for(var i = 1; i<=n; i++) {
		for(var j = 1; j<=n; j++) {
			A.set(i,j,Math.round(A.get(i,j)*p)/p);
		}
	}
	var b = Matrix.random(n,1,-abs,abs,digits).T();
	A_input.value = A.toStr();
	b_input.value = b.toStr();
}