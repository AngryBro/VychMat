function LU_transform(A,b) {
	var LU = A.LU();
	var L = LU.L;
	var U = LU.U;
	var x = new Matrix('0',b.size.m,1);
	var y = x.copy();
	var n = b.size.m;
	for(var i = 1; i<=n; i++) {
		var xi = 0;
	}
}