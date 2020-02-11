// reference: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

function isObject(elem) {
    return !Array.isArray(elem) && typeof elem === "object";
}

function isArray(elem) {
    return Array.isArray(elem);
}

function isTheseObjsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}


export default function assert(elem, expectedRes, message) {
    if(!elem || !expectedRes) throw new Error("You have to insert in the first parameter the TARGET ELEMENT, and in the second one the EXPECTED ELEMENT")

    let condition = elem !== expectedRes;

    if(isArray(elem)) {
        condition = !elem.equals(expectedRes);
        elem = JSON.stringify(elem);
        expectedRes = JSON.stringify(expectedRes);
    } else if(isObject(elem)) {
        condition = !isTheseObjsEqual(elem, expectedRes);
        elem = JSON.stringify(elem);
        expectedRes = JSON.stringify(expectedRes);
    }

    if(condition) {
        const failure = message || `ERROR: Assertion failed! ${elem} is NOT equal to ${expectedRes}`;
        return failure;
    }
    return `PASSED, Febro! ${elem} is equal to ${expectedRes}`;
}