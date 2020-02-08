// reference: https://stackoverflow.com/questions/16994662/count-animation-from-number-a-to-b
import getDecimalPart from './getDecimalPart';
import { convertDotToComma } from './convertDotComma';
// e. g
// animateNumber(
//     animatedNumber.current,
//     0,
//     cashCurrentScore,
//     3000,
//     setShowTotalPoints
// );
export default function animateNumber(ref, start, end, duration, next) {
    start = parseFloat(start);
    end = parseFloat(end);
    console.log("end", end);

    var obj = ref;
    if(end === 0 || !end) {
        obj.innerHTML = 0;
        next(true);
        return;
    };

    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if(current >= end) {
            const isInteger = Number.isInteger(parseFloat(end));
            const finalNumber = Math.floor(end) + parseFloat(getDecimalPart(end));
            if(!isInteger) { obj.innerHTML = convertDotToComma(finalNumber) }

            clearInterval(timer);
            next(true);
        }
    }, stepTime);
}