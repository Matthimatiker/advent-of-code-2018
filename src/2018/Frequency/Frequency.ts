/**
 * @param frequencyValues A sequence frequency values.
 * @see https://adventofcode.com/2018/day/1
 */
export function frequency(frequencyValues : number[]): number;
export function frequency(oneFrequencyValuePerLine : string): number;
export function frequency(frequencyValuesOrLines : number[]|string): number {
    let frequencyValues : number[];
    if (typeof frequencyValuesOrLines === "string") {
        frequencyValues = frequencyValuesOrLines.split("\n")
            .map(frquencyLine => parseInt(frquencyLine, 10))
    } else {
        frequencyValues = frequencyValuesOrLines
    }
    // Sum up the frequency values.
    return frequencyValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}