function check_input(A,b) {
	return A.size.sqr&&(A.size.m==b.size.m)&&(b.size.n==1)&&(A.det()!=0)&&(A.size.n*A.size.m>3)&&(b.size.m>1);
}