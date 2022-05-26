function richardson_iteration(digits) {
	eval(input_iter);
	//Определения
	var lambda = rotationApi(A);
	var lmin = lambda.get(1);
	var lmax = lmin;
	for(var i = 1; i<=n; i++) {
		if(lambda.get(i)<lmin) {
			lmin = lambda.get(i);
		}
		if(lambda.get(i)>lmax) {
			lmax = lambda.get(i);
		}
	}
	var eta = lmin/lmax;
	var x0 = new Matrix('0',n,1);
	x0.set(1,1);
	var block = 3;
	x1 = iterations(x0,A,b,block,lmin,lmax,eta);
	var iter = 0;
	while(x1.dif(x0).vector_norm()>eps) {
		x0 = x1;
		x1 = iterations(x1,A,b,block,lmin,lmax,eta);
		iter++;
	}
	iter = iter*block;
	var solution = x1;
	eval(output_iter);
}
function iterations(x0,A,b,n,lmin,lmax,eta) {
	var nu = [Math.cos(Math.PI/2/n)];
	var tau = [2/(lmin+lmax)];
	var pho = (1-eta)/(1+eta);
	var x = [x0];
	for(var k = 1; k<=n; k++) {
		nu.push(Math.cos(Math.PI*(2*k-1)/2/n));
		tau.push(tau[0]/(1-pho*nu[k]));
		x.push(x[k-1].sum(b.mult(tau[k])).dif(A.mult(x[k-1]).mult(tau[k])));
	}
	return x[x.length-1];
}