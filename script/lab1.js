var A;
var b;
function get_matrix(id) {
	var rows = document.getElementById(id).value.split('\n');
	for(var i =0; i<rows.length; i++) {
		rows[i] = rows[i].split(' ');
	}
	return new Matrix('array',rows).T();
}
function go() {
	A = get_matrix('matrix_A');
	b = get_matrix('vector_b');
	var array_for_m = A.copy().array;
	array_for_m.push(b.array[0]);
	M = new Matrix('array',array_for_m);
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
	document.body.innerHTML += '<br>'+M.tex(); MathJax.typeset()
}