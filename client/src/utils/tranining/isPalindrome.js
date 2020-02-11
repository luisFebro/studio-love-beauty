const isPalindrome = string => { // n2
    // Validation
    if(string.length === 0) return true;
    if(!string) return console.log("oops! wrong string format");
    if(typeof string !== "string") {
        string = string.toString();
    }
    if(string.length <= 1) return console.log("oops! Type a value which length it is at least 2 characters!")
    string = string.toLowerCase().replace(/\W/g, ''); // remove non-word characters;
    // End Validation

    let isPalindrome;
    let reverse = "";

    let letter;
    let counter = 1;
    for(letter of string) {
        reverse += string.charAt(string.length - counter++) // n1
    }

    isPalindrome = reverse === string;

    return isPalindrome;
}


/* COMMENTS
n1: alt: normalizedString === normalizedString.split('').reverse().join('');

n2: can also be written with recursive algorithm:
// Returns the first character of the string str
var firstCharacter = function(str) {
    return str.slice(0, 1);
};

// Returns the last character of a string str
var lastCharacter = function(str) {
    return str.slice(-1);
};

// Returns the string that results from removing the first
//  and last characters from str
var middleCharacters = function(str) {
    return str.slice(1, -1);
};

var isPalindrome = function(str) {
    // base case #1
    if (str.length <= 1) {
    return true ;
}
    // base case #2
    if (firstCharacter(str) !== lastCharacter(str)) {
       return false;
    }
    // recursive case
    return isPalindrome(middleCharacters(str));
};

var checkPalindrome = function(str) {
    println("Is this word a palindrome? " + str);
    println(isPalindrome(str));
};
*/
console.log(isPalindrome("sas"))