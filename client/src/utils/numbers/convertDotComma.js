function convertDotToComma(stringNumber) {
    if(typeof stringNumber !== "string") {
        stringNumber = JSON.stringify(stringNumber);
    }

    return stringNumber.includes(".")
    ? stringNumber.replace(".", ",")
    : stringNumber;
}

function convertCommaToDot(stringNumber) {
    if(typeof stringNumber !== "string") {
        stringNumber = JSON.stringify(stringNumber);
    }

    return stringNumber.includes(",")
    ? stringNumber.replace(",", ".")
    : stringNumber;
}

export { convertDotToComma, convertCommaToDot };