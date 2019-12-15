// reference: https://stackoverflow.com/questions/16994662/count-animation-from-number-a-to-b

export default function animateNumber(ref, start, end, duration, next) {
    start = parseFloat(start);
    end = parseFloat(end);
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = ref;
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if(current >= end) {
            clearInterval(timer);
            next(true);
        }
    }, stepTime);
}