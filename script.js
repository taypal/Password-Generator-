
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var specialEl = document.getElementById('special');
var generateEl = document.getElementById('generate');
var copy = document.getElementById('copy');

var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	special: getRandomSpecial
}

copy.addEventListener('click', () => {
	var textarea = document.createElement('textarea');
	var password = resultEl.innerText;

	if (!password) { return; }

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied');
});

generate.addEventListener('click', () => {
	var length = +lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSpecial = specialEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSpecial, length);
});

function generatePassword(lower, upper, number, special, length) {
	let generatedPassword = '';
	var typesCount = lower + upper + number + special;
	var typesArr = [{ lower }, { upper }, { number }, { special }].filter(item => Object.values(item)[0]);

	if (typesCount === 0) {
		return '';
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	var finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSpecial() {
	var special = '!@#$%&*.'
	return special[Math.floor(Math.random() * special.length)];
}





