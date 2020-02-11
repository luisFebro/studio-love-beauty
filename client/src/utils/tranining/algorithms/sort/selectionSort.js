// reference: https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/pc/challenge-implement-selection-sort
// Selection Sort Algorithm.
var swap = function(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
};

var indexOfMinimum = function(array, startIndex) {

    var minValue = array[startIndex];
    var minIndex = startIndex;

    for(var i = minIndex + 1; i < array.length; i++) {
        if(array[i] < minValue) {
            minIndex = i;
            minValue = array[i];
        }
    }
    return minIndex;
};

var selectionSort = function(array) {
    var c;
    for(c = 0; c < array.length; c++) {
        var minInd = indexOfMinimum(array, c);
        swap(array, c, minInd);
    }
    return array;
};

var array = [22, 11, 99, 88, 9, 7, 42, 0];
const res = selectionSort(array);
console.log("res", res);