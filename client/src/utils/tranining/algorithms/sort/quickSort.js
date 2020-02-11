// reference: https://gist.github.com/channancy/5c2dc2131dad073a09db385d53d7c1f2

// Swaps two items in an array, changing the original array
var swap = function(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
};

// This function partitions given array and returns
// the index of the pivot.
var partition = function(array, p, r) {
    // Compare array[j] with array[r], for j = p, p+1,...r-1
    // maintaining that:
    var q = p;

    // array[r] (last element) is the pivot

    // array[p..q-1] are values known to be <= to array[r]
    // i.e. Values to left of pivot are less than or equal to pivot

    // array[q..j-1] are values known to be > array[r]
    // i.e. Values to right of pivot are greater than pivot

    // array[j..r-1] haven't been compared with array[r]

    // If array[j] > array[r], just increment j.
    for (var j = p; j < r; j++) {
        // If array[j] <= array[r], swap array[j] with array[q],
        // increment q, and increment j.
        if (array[j] <= array[r]) {
            swap(array, j, q);
            q++;
        }
    }

    // Once all elements in array[p..r-1]
    // have been compared with array[r],
    // swap array[r] with array[q], and return q.
    swap(array, r, q);

    // q is the new index of the pivot
    return q;
};


var quickSort = function(array, p, r) {
    if (p < r) {
        var pivot = partition(array, p, r);
        quickSort(array, p, pivot - 1);
        quickSort(array, pivot + 1, r);
    }
};

var array = [9, 7, 5, 11, 12, 2, 14, 3, 10, 6];
quickSort(array, 0, array.length-1);
println("Array after sorting: " + array);
Program.assertEqual(array, [2,3,5,6,7,9,10,11,12,14]);

var array = [9, 7, 5, 0, 12, 2, 14, -1, 10, 6];
quickSort(array, 0, array.length-1);
println("Array after sorting: " + array);
Program.assertEqual(array, [-1,0,2,5,6,7,9,10,12,14]);