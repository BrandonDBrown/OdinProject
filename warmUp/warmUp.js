//1. Create a function called my max that takes an array and returns the max value
function my_max(array) {
//	Cant pass an array into math.max. ES6 allows you to use 3 dots to express multiple elements
	return Math.max(...array);
}


//2.Build a function vowel_count() which takes a string and returns the number of vowels (AEIOUY).

function vowel_count(string) {
	string.toLowerCase();
	var vowelCount = 0;
	for (i=1; i<string.length; i++) {
		if (string.charAt(i) === 'a' || string.charAt(i) === 'e' || string.charAt(i)=== 'i' || string.charAt(i)=== 'o' || string.charAt(i)=== 'u' || string.charAt(i)=== 'y') {
			vowelCount += 1;
		} else {
		};
	};
	return vowelCount;
};


//3. Build a function reverse() which takes a string and returns all the characters in the opposite position, e.g. reverse("this is a string") // "gnirts a si siht"

function reverse(string) {
//<!-- make string into array -->
	var arr = string.split(' ');
//<!-- reverse order of elements in the array -->
	arr.reverse();
	var reversing = [];
//<!-- reverse each word in the array -->
	for(i=0; i<arr.length;i++) {
		reversing.push(arr[i].split('').reverse().join(''));
	};
//<!-- join words in the array with a space in between  -->
	return reversing.join(' ');
};

