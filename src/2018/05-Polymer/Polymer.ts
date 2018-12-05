declare type Polymer = string;

const lowerCaseCharacters : string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
const reactingUnits = [];
for (let character of lowerCaseCharacters) {
    reactingUnits.push(character + character.toUpperCase(), character.toUpperCase() + character)
}
const reactionRegExp = new RegExp(`(${reactingUnits.join('|')})`);

/**
 * Removes units in the polymer that can react (same type, different polarity).
 *
 * @param polymer
 * @see https://adventofcode.com/2018/day/5
 */
export function react(polymer: Polymer): Polymer {
    let reactedPolymer = polymer;
    let removedUnits: number = 0;
    do {
        const previousUnits = reactedPolymer.length;
        reactedPolymer = reactedPolymer.replace(reactionRegExp, '');
        removedUnits = previousUnits - reactedPolymer.length;
    } while(removedUnits > 0);
    return reactedPolymer
}