function get_matrix(id) {
	var rows = document.getElementById(id).value.split('\n');
	for(var i =0; i<rows.length; i++) {
		rows[i] = rows[i].split(' ');
		if(rows[i].length!=undefined) {
			for(var j = 0; j<rows[0].length; j++) {
				rows[i][j] = Number(rows[i][j]);
			}
		}
	}
	return new Matrix('array',rows).T();
}
function go() {
	/*var A = get_matrix('matrix_A');
	var b = get_matrix('vector_b');
	var array_for_m = A.copy().array;
	array_for_m.push(b.array[0]);
	var M = new Matrix('array',array_for_m);*/
	var M = get_matrix('matrix_M');
	var M0 = M.copy();
	var d = M.getElem(1,1);
	for(var i = 1; i<=M.size.n;i++) {
		M.setElem(1,i,M.getElem(1,i)/d);
	}
	var d;
	for(var i = 2; i<=M.size.m; i++) {
		for(var j = 1; j<i; j++) {
			d = M.getElem(i,j);
			for(var k = 1; k<=M.size.n; k++) {
				M.setElem(i,k,M.getElem(i,k)-d*M.getElem(j,k));
			}
		}
		d = M.getElem(i,i);
		for(var j = i; j<=M.size.n; j++) {
			M.setElem(i,j,M.getElem(i,j)/d);
		}
	}
	var x = new Matrix('vector',M.copy().array[M.size.n-1]);
	for(var i = x.size.m; i>=1; i--) {
		var xi = M.copy().getElem(i,M.size.n);
		for(var j = i+1; j<=M.size.m; j++) {
			xi -= M.copy().getElem(i,j)*x.getElem(j,1);
		}
		x.setElem(i,1,xi);
	}
	document.body.innerHTML += '\\(M_0 = '+M0.tex()+'\\)<br><br>\\(M='+M.tex()+'\\)<br><br>\\(~~~x ='+x.tex()+'\\)'; MathJax.typeset()
}