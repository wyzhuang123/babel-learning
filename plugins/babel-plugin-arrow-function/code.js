const fn = (a, b) => {

	const demo = () => {
		console.log(this);
	}
	return a + b;
}

const fn1 = (a, b) => a * b;

const fn2 = (a, b) => ({a, b});