function f(x,A,b) {
	return x.T().mult(A).mult(x).get(1,1)+b.T().mult(x).get(1,1);
}
function df(x,A,b) {
	return A.mult(x).sum(b);
}
function grad(f,df,lambda,eps) {
	var x = [];
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	x.push(new Matrix('0',b.size.m,1));
	x.push(null);
	x[1] = x[0].dif(df(x[0],A,b).mult(lambda));
	while(x[x.length-1].dif(x[x.length-2]).norm()>=eps) {
		var k = x.length;
		x.push(null);
		x[k] = x[k-1].dif(df(x[k-1],A,b).mult(lambda));
	}
	x[x.length-1].log();
	return x[x.length-1];
}
function newton() {
	var A = Matrix.input('matrix_A');
	var b = Matrix.input('vector_b');
	var t = A.invert().mult(b).mult(-1);
	t.log();
	return t;
}