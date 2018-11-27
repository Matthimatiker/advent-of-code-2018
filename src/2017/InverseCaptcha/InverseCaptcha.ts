/**
 * @param sequence A sequence of digits.
 * @see https://adventofcode.com/2017/day/1
 */
export const sequenceSum = (sequence : String) => {
    if (sequence.length == 0) {
        return 0;
    }
    const toCheck = sequence + sequence.charAt(0);
    let sum = 0;
    for (let i = 0; i < sequence.length; i++) {
        if (toCheck.charAt(i) == toCheck.charAt(i + 1)) {
            sum += parseInt(toCheck.charAt(i), 10);
        }
    }
    return sum;
};
