//create an object that defines what +-/* operations
var buttonOperations = {
	'+': function(num1, num2) {return num1+num2;},
	'-': function(num1, num2) {return num1-num2;},
	'/': function(num1, num2) {return num1/num2;},
	'*': function(num1, num2) {return num1*num2;}
}

var currentNumber = 0;
var operator = '';
var screenOutput = document.getElementById("output");

//EVENT LISTENERS

//operator buttons
var operators = document.getElementsByClassName("operator");
for(j=0; j<operators.length; j++) {
	operators[j].addEventListener("click", equation)
}

//number buttons
var arr = document.getElementsByClassName("col-md-2");
for(i=0; i< arr.length; i++) {
	arr[i].addEventListener("click", number);
};

//clear all
document.getElementById("clear").addEventListener("click", clearAll);

//equals
document.getElementById("equals").addEventListener("click", equals);



function equation() {
	firstNumber = parseInt(screenOutput.innerHTML);
	operator = this.innerHTML;
	clearAll();
};

function clearAll() {
	screenOutput.innerHTML = "";
};

function number() {
	screenOutput.innerHTML += this.innerHTML;
};

function equals() {
	var secondNumber = parseInt(screenOutput.innerHTML);
	clearAll();
	screenOutput.innerHTML = buttonOperations[operator](firstNumber, secondNumber);
};
