// reference: (There are other references in the link as follows:) https://github.com/gurucg144/khan-academy-algorithms/blob/master/recursive-power.js
var isEven = function(n) {
    return n % 2 === 0;
};

var isOdd = function(n) {
    return !isEven(n);
};

var power = function(x, n) {
    console.log("Computing " + x + " raised to power " + n + ".");
    // base case
    if (n===0) {
        return 1;
    }
    // recursive case: n is negative
    if (n<0) {
        return 1/power(x, -n);
    }
    // recursive case: n is odd
    if (isOdd(n)) {
        return power(x, n-1) * x;
    }
    // recursive case: n is even
    if (isEven(n)) {
        var temp = power(x, n/2);
        return temp*temp;
    }
};

var displayPower = function(x, n) {
    console.log(x + " to the " + n + " is " + power(x, n));
};

displayPower(3, 2);
