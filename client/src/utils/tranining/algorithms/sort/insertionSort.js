// reference: https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/pc/challenge-implement-insertion-sort
// algorithm: insertion sort
const insert = (array, rightIndex, value) => {
    let rightInd;
    for(rightInd = rightIndex;
        rightInd >= 0 && array[rightInd] > value;
        rightInd--) {
            array[rightInd + 1] = array[rightInd];
        }
        array[rightInd + 1] = value;
};

var insertionSort = (array) => {
    for (var ind = 1; ind < array.length; ind++) {
        insert(array, ind - 1, array[ind]);
    }
    return array;
};

var array = [22, 11, 99, 88, 9, 7, 42];
console.log(insertionSort(array));

