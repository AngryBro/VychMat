function select_method(select,button,random) {
	document.getElementById(button).setAttribute('onclick',select.value);
	var rnd_button = document.getElementById(random);
	switch(select.value) {
		case 'sqrt_method(digits.value)': {
			rnd_button.setAttribute('onclick',"random_symmetry_pd('matrix_A','vector_b',20)");
			break;
		}
		default: {
			rnd_button.setAttribute('onclick',"random_input('matrix_A','vector_b',20)");
		}
	}
}