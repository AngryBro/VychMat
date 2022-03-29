function random_input(id_A,id_b,abs) {
	var A_input = document.getElementById(id_A);
	var b_input = document.getElementById(id_b);
	var n = Math.round((Math.random()*6)+2);
	var A = Matrix.random(n,n,-abs,abs,3);
	var b = Matrix.random(n,1,-abs,abs,3).T();
	A_input.value = A.toStr();
	b_input.value = b.toStr();
}