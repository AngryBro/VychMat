class Matrix {
	constructor() {
		switch(arguments[0]) {
			case 'array': {
				if(arguments.length>=2) {
					this.array = arguments[1];
				}
				else {
					return new None('Нет массивов элементов матрицы.');
				}
				break;
			}
			case '0': {
				if(arguments.length>=3) {
					var m = arguments[1];
					var n = arguments[2];
					var arr = []
					for(var i = 0; i<m; i++) {
						var temp = []
						for(var j = 0; j<n; j++) {
							temp.push(0);
						}
						arr.push(temp);
					}
					this.array = arr;
				}
				else {
					return new None('Отсутствуют размеры нулевой матрицы.');
				}
				break;
			}
			case '1': {
				if(arguments.length>=2) {
					var n = arguments[1];
					var arr = []
					for(var i = 0; i<n; i++) {
						var temp = []
						for(var j = 0; j<n; j++) {
							temp.push(i==j?1:0);
						}
						arr.push(temp);
					}
					this.array = arr;
				}
				else {
					return new None('Отсутствуют размеры единичной матрицы.');
				}
				break;
			}
			default: {
				return new None('Некорректное задание матрицы')
			}
		}
		this.size = {m : this.array.length, n: this.array[0].length, sqr: this.array.length==this.array[0].length};
		for(var i = 0; i<this.array.length; i++) {
			if(this.array[i].length!=n) {
				return new None('Неверные размеры матрицы. Некорректный массив.');
			}
		}
	}
	tex() {
		var temp = [];
		for(var i = 0; i<this.size.m; i++) {
			temp.push(this.array[i].join(' & '));
		}
		return '\\begin{pmatrix} '+temp.join(' \\\\ ')+'\\end{pmatrix}';
	}
	log() {
		var log = [];
		for(var i = 0; i<this.size.m; i++) {
			log.push(JSON.stringify(this.array[i]));
		}
		console.log(log.join('\n'));
	}
}
class None {
	constructor(description) {
		this.description = description;
	}
}