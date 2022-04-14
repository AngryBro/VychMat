function norm(x) {
	var m = x.get(1);
	for(var i = 2; i<=x.size.m; i++) {
		xi = Math.abs(x.get(i));
		m = m>xi?m:xi;
	}
	return m;
}
function simple_iteration(digits) {
	
}