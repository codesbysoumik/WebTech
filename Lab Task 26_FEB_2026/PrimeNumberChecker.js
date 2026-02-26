// Prime Number Checker

var num = 29;
var isPrime = true;

if (num <= 1) {
    isPrime = false;
}

for (var i = 2; i < num; i++) {
    if (num % i === 0) {
        isPrime = false;
        break;
    }
}

if (isPrime) {
    console.log(num + " is a prime number.");
} else {
    console.log(num + " is not a prime number.");
}