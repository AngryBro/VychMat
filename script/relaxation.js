function relaxation_iteration(digits) {
	input_iter += `
		var omega = document.getElementById('omega').value;
		if(!((omega>0)&&(omega<2))) {
			omega = 1;
		}
	`;
	eval(input_iter);
	
	//Определение
	var x = [null];
	//Стартовые значения
	x[0] = b.copy();
	//Динамика
	for(var k = 1; (k==1)||(x[k-1].dif(x[k-2]).vector_norm()>=eps) ; k++) {
		x.push(x[k-1].copy());
		for(var i = 1; i<=n; i++) {
			var sum1 = 0;
			var sum2 = 0;
			for(var j = 1; j<i; j++) {
				sum2 += A.get(i,j)*x[k].get(j);
			}
			for(var j = i+1; j<=n; j++) {
				sum1 += A.get(i,j)*x[k-1].get(j);
			}
			x[k].set(i,(1-omega)*x[k-1].get(i)+(b.get(i)-sum1-sum2)*omega/A.get(i,i));
		}
		if(x.length>100000) {
			console.log('Too many iterations');
			return;
		}
	}
	var iter = x.length;
	var solution = x[iter-1];
	var html1 = '\\(\\LARGE\\omega = '+omega+'\\)<br><br>';
	var temp = output_iter;
	output_iter = output_iter.split('output.innerHTML = html;').join('output.innerHTML = html1+html;');
	eval(output_iter);
	output_iter = temp;
}