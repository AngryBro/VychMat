function rotation_iteration(digits) {
	eval(input_iter);
	var sigma = [null];
	A = [A.copy()];
	var A0 = A[0].copy();
//	var p = Math.ceil(Math.log(1/eps)/Math.LN10)+1;
	var p = 4;
	var aij;
 	for(var k = 1; k<=p; k++) {
		var i=0;
		aij = -1;
		var j = 0;
		for(var i_ = 1; i_<n; i_++) {
			for(var j_ = i_+1; j_<=n; j_++) {
				if((Math.abs(A[0].get(i_,j_))>=aij)&&(i_<=n)&&(j_<=n)) {
					aij = Math.abs(A[0].get(i_,j_));
					i = i_;
					j = j_;
				}
			}
		}
		sigma.push(0);
		for(var i_ = 1; i_<=n; i_++) {
			if(Math.abs(A[0].get(i_,i_))>sigma[k]) {
				sigma[k] = Math.abs(A[0].get(i_,i_));
			}
		}
		sigma[k] = Math.sqrt(sigma[k])/Math.pow(10,k);
		for(var m = 0; aij>sigma[k]; m++) {
		// if(aij<sigma[k]) {
		// 	break;
		// }
		
		if(m>100) break;
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
		A[m+1].log();
		i=0;
		aij = -1;
		j = 0;
		for(var i_ = 1; i_<n; i_++) {
			for(var j_ = i_+1; j_<=n; j_++) {
				if((Math.abs(A[m+1].get(i_,j_))>=aij)&&(i_<=n)&&(j_<=n)) {
					aij = Math.abs(A[m+1].get(i_,j_));
					i = i_;
					j = j_;
				}
			}
		}

		for(var i_ = 1; i_<=n; i_++) {
			if(Math.abs(A[A.length-1].get(i_,i_))>sigma[k]) {
				sigma[k] = Math.abs(A[A.length-1].get(i_,i_));
			}
		}
		sigma[k] = Math.sqrt(sigma[k])/Math.pow(10,k);

		 }
	A = [A[A.length-1].copy()];



	}
	lambda = new Matrix('0',n,1);
	for(var i_ =1; i_<=n; i_++) {
		lambda.set(i_,A[0].get(i_,i_));
	}
	var html = '\\(A= '+A0.tex(digits)+'\\)<br><br>'+
	'\\(A_m= '+A[0].tex(digits)+'\\)<br><br>'+
	'\\(\\lambda(A) = '+lambda.tex(digits)+'\\)<br><br>';
	output.innerHTML = html;
	MathJax.typeset();
}
function sgn(x) {
	return x>=0?1:-1;
}
function rotationApi(A) {
	var sigma = [];
	var n = A.size.n;
	A = [A.copy()];
//	var p = Math.ceil(Math.log(1/eps)/Math.LN10)+1;
	var p = 100;
	var i,j;
	var m = 0;
	var aij;
	var k = 0;
 	for(var m = 0; m<=p; m++) {
		aij = -1;
		sigma.push(0);
		for(var i = 1; i<=n; i++) {
			if(Math.abs(A[m].get(i,i))>sigma[k]) {
				sigma[k] = Math.abs(A[m].get(i,i));
			}
		}
		sigma[k] = Math.sqrt(sigma[k])*Math.pow(10,-k);
		for(var i_ = 1; i_<=n; i_++) {
			for(var j_ = i_+1; j_<=n; j_++) {
				if(Math.abs(A[m].get(i_,j_))>aij) {
					aij = Math.abs(A[m].get(i_,j_));
					i = i_;
					j = j_;
				}
			}
		}
		if(aij<sigma[k]) {
			k++;
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
//		m++;
		if(k==p) {
			break;
		}
	}
	lambda = new Matrix('0',n,1);
	for(var i =1; i<=n; i++) {
		lambda.set(i,A[m].get(i,i));
	}
	return lambda;
}