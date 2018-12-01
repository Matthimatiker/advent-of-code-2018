/**
 * @param frequencyValues A sequence frequency values.
 * @see https://adventofcode.com/2018/day/1
 */
export const frequency = (frequencyValues : number[]) => {
    // Sum up the frequency values.
    return frequencyValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
