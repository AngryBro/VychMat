function simple_iteration_2(digits) {
	eval(input_iter);
	//Def
	lambda = [null,null];
	y = [null,null];
	x = [null,null];
	var iter = 1;
	//Start
	x[0] = new Matrix('0',n,1);
	for(var i = 1; i<=n; i++) {
		x[0].set(i,1);
	}
	//x[0].set(1,1);
	y[1] = A.mult(x[0]);
	lambda[1] = y[1].mult(x[0]);
	x[1] = y[1].mult(1/Math.sqrt(y[1].mult(y[1])));
	//Dynamic
	for(var k = 2; true ; k++) {
		y[k] = A.mult(x[k-1]);
		lambda[k] = y[k].mult(x[k-1]);
		x[k] = y[k].mult(1/Math.sqrt(y[k].mult(y[k])));
		iter++;
		if(x[k].mult(sgn(lambda[k])).dif(x[k-1]).vector_norm()<eps) {
			break;
		}
		if(iter>100000) {
			console.log('Слишком много итераций');
			iter = '100001 (Слишком много)';
			break;
		}
	}
	//Ans
	var solution = {
		lambda: lambda[iter],
		x: x[iter]
	};
	var html = '\\(A = '+A.tex()+',~~~\\varepsilon = '+eps+'\\)<br><br>'+
	'\\(\\lambda = '+solution.lambda+',~~~ x = '+solution.x.tex(digits)+'\\)<br><br>'+
	'Количество итераций: '+iter;
	output.innerHTML = html;
	MathJax.typeset();
}