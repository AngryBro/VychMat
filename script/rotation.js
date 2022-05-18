function rotation_iteration(digits) {
	eval(input_iter);
	var sigma = [];
	A = [A.copy()];
	var p = Math.ceil(-Math.log(eps)/Math.LN10);
	var i,j;
	var m = 0;
	var aij;
 	for(var k = 0; k<=p; k++) {
		aij = -1;
		sigma.push(0);
		for(var i = 1; i<=n; i++) {
			if(Math.abs(A[m].get(i,i))>sigma[k]) {
				sigma[k] = Math.abs(A[m].get(i,i));
			}
		}
		sigma[k] = Math.sqrt(sigma[k])*Math.pow(10,-k);
		var found = false;
		for(var i_ = 1; i_<=n; i_++) {
			for(var j_ = 1; j_<=n; j_++) {
				if((Math.abs(A[m].get(i_,j_))>aij)&&(i_!=j_)&&(Math.abs(A[m].get(i_,j_))>=sigma[k])) {
					aij = Math.abs(A[m].get(i_,j_));
					i = i_;
					j = j_;
					found = true;
				}
			}
		}
		if(!found) {
			continue;
		}
		var d = Math.sqrt((A[m].get(i,i)-A[m].get(j,j))*(A[m].get(i,i)-A[m].get(j,j))+4*A[m].get(i,j)*A[m].get(i,j));
		var c = Math.sqrt(1/2*(1+Math.abs(A[m].get(i,i)-A[m].get(j,j))/d));
		var s = sgn(A[m].get(i,j)*(A[m].get(i,i)-A[m].get(j,j)))*
		Math.sqrt(1/2*(1-Math.abs(A[m].get(i,i)-A[m].get(j,j))/d));
		A.push(A[m].copy());
		for(var t = 1; t<=n; t++) {
			for(var l = 1; l<=n; l++) {
				if((t!=i)&&(t!=j)&&(l!=i)&&(l!=j)) {
					A[m+1].set(t,l,A[m].get(t,l));
				}
			}
		}
		for(var t = 1; t<=n; t++) {
			if((t!=i)&&(t!=j)) {
				A[m+1].set(t,i,c*A[m].get(t,i)+s*A[m].get(t,j));
				A[m+1].set(i,t,c*A[m].get(t,i)+s*A[m].get(t,j));
				A[m+1].set(t,j,-s*A[m].get(t,i)+c*A[m].get(t,j));
				A[m+1].set(j,t,-s*A[m].get(t,i)+c*A[m].get(t,j));
			}
		}
		A[m+1].set(i,i,c*c*A[m].get(i,i)+2*c*s*A[m].get(i,j)+s*s*A[m].get(j,j));
		A[m+1].set(j,j,s*s*A[m].get(i,i)-2*c*s*A[m].get(i,j)+c*c*A[m].get(j,j));
		A[m+1].set(i,j,0);
		A[m+1].set(j,i,0);
		m++;
	}
	A[m].log();
}
function sgn(x) {
	return x>0?1:(x<0?-1:0);
}