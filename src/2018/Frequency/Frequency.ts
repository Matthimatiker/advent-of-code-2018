/**
 * @param frequencyValues A sequence frequency values.
 * @see https://adventofcode.com/2018/day/1
 */
export function frequency(frequencyValues : number[]): number;
export function frequency(oneFrequencyValuePerLine : string): number;
export function frequency(frequencyValuesOrLines : number[]|string): number {
    let frequencyValues : number[];
    if (typeof frequencyValuesOrLines === "string") {
        frequencyValues = extractFrequencies(frequencyValuesOrLines)
    } else {
        frequencyValues = frequencyValuesOrLines
    }
    // Sum up the frequency values.
    return frequencyValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

export function firstRepeatedFrequency(frequencyValues : number[]): number;
export function firstRepeatedFrequency(oneFrequencyValuePerLine : string): number;
export function firstRepeatedFrequency(frequencyValuesOrLines : number[]|string): number {
    let frequencyValues : number[];
    if (typeof frequencyValuesOrLines === "string") {
        frequencyValues = extractFrequencies(frequencyValuesOrLines)
    } else {
        frequencyValues = frequencyValuesOrLines
    }
    let currentFrequency = 0;
    const seenValues : number[] = [currentFrequency];
    for (let value of infinite(frequencyValues)) {
        currentFrequency += value;
        if (seenValues.indexOf(currentFrequency) !== -1) {
            // We have seen this frequency twice.
            return currentFrequency;
        }
        seenValues.push(currentFrequency);
        if (seenValues.length > 1000) {
            break;
        }
    }
    throw new Error(`Cannot find repeating frequency. Terminating after finding ${seenValues.length} different frequency values.`);
}

function extractFrequencies(frequencyValuePerLine: string): number[] {
    return frequencyValuePerLine.split("\n")
        .map(frequencyLine => parseInt(frequencyLine, 10));
}

function* infinite(list : number[]):IterableIterator<number> {
    const length = list.length;
    let iteration = 0;
    while (true) {
        yield list[iteration % length];
        iteration++
    }
}