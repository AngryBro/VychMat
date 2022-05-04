function gradient_iteration(digits) {
	eval(input_iter);
	//определения
	var x = [null];
	var r = [null];
	var delta = [null];
	var AAT = A.mult(A.T());
	//Стартовые значения
	x[0] = b.copy();
	r[0] = A.mult(x[0]).dif(b);
	delta[0] = r[0].mult(AAT.mult(r[0])) / AAT.mult(r[0]).mult(AAT.mult(r[0]));
	//Динамика
	for(var k = 1; r[k-1].vector_norm()>=eps; k++) {
		x.length++;
		r.length++;
		delta.length++;
		x[k] = x[k-1].dif(A.T().mult(r[k-1]).mult(delta[k-1]));
		r[k] = A.mult(x[k]).dif(b);
		delta[k] = r[k].mult(AAT.mult(r[k])) / AAT.mult(r[k]).mult(AAT.mult(r[k]));
	}
	var iter = x.length;
	var solution = x[iter-1];
	eval(output_iter);
}