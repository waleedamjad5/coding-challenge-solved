"use strict";

const binaryInsert = (value, array, startVal, endVal) => {
    var length = array.length;
    var start = ![undefined, null].includes(startVal) ? startVal : 0;
    var end = ![undefined, null].includes(endVal) ? endVal : length - 1;
    var m = start + Math.floor((end - start) / 2);

    if (length === 0) {
        array.push(value);
        return;
    }

    if (value.log.date.getTime() === array[m].log.date.getTime()) {
        array.splice(m + 1, 0, value);
        return;
    }

    if (value.log.date < array[end].log.date) {
        array.splice(end + 1, 0, value);
        return;
    }

    if (value.log.date > array[start].log.date) {
        array.splice(start, 0, value);
        return;
    }

    if (start >= end) {
        return;
    }

    if (value.log.date > array[m].log.date) {
        binaryInsert(value, array, start, m - 1);
        return;
    }

    if (value.log.date < array[m].log.date) {
        binaryInsert(value, array, m + 1, end);
        return;
    }
    /*
     * kill process if an insert is ignored
     */
    console.log('An insert has been ignored.');
    console.log(value.log.date);
    console.log(array[m].log.date, m)
    console.log(value.log.date.getTime() == array[m].log.date.getTime());
    console.log(array[end].log.date, end)
    console.log(array[start].log.date, start)
    process.exit();
};

module.exports = {
    binaryInsert
}
