function select_method(select,button,random) {
	document.getElementById(button).setAttribute('onclick',select.value);
	var rnd_button = document.getElementById(random);
	document.getElementById('eps_div').hidden = select.value.indexOf('iter')!=-1?false:true;
	document.getElementById('omega_div').hidden = select.value.indexOf('relax')!=-1?false:true;
	switch(select.value) {
		case 'sqrt_method(digits.value)': {
			rnd_button.setAttribute('onclick',"random_symmetry_pd('matrix_A','vector_b',20)");
			break;
		}
		case 'rotation(digits.value)': {
			rnd_button.setAttribute('onclick',"random_symmetry_pd('matrix_A','vector_b',20)");
			document.getElementById('vector_b').hidden = true;
			document.getElementById('b=').hidden = true;
			break;
		}
		default: {
			rnd_button.setAttribute('onclick',"random_input('matrix_A','vector_b',20)");
		}
	}
}