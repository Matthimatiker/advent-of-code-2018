import {Pots, Rule, Rules} from "./Plants";

const initialState = '#.#.#....##...##...##...#.##.#.###...#.##...#....#.#...#.##.........#.#...#..##.#.....#..#.###';
const ruleDefinitions = "####. => #\n" +
    "..#.. => .\n" +
    "#.#.. => .\n" +
    ".##.. => .\n" +
    "##... => .\n" +
    "#.##. => #\n" +
    "##.#. => .\n" +
    "##..# => .\n" +
    ".###. => .\n" +
    ".#.## => .\n" +
    ".#..# => #\n" +
    "..... => .\n" +
    "###.. => #\n" +
    "#..## => .\n" +
    "##.## => .\n" +
    "#.... => .\n" +
    "...## => #\n" +
    "....# => .\n" +
    "#.#.# => #\n" +
    "###.# => .\n" +
    ".#### => #\n" +
    ".#... => #\n" +
    "#.### => .\n" +
    "..### => .\n" +
    ".#.#. => #\n" +
    ".##.# => .\n" +
    "#..#. => #\n" +
    "...#. => .\n" +
    "#...# => #\n" +
    "..##. => .\n" +
    "##### => #\n" +
    "..#.# => #";

const initialPots = Pots.fromState(initialState);
const rules = new Rules(ruleDefinitions.split("\n").map(definition => Rule.fromDefinition(definition)));

const generation20 = rules.apply(initialPots, 20);

console.log(`Generation 20 '${generation20}' has sum ${generation20.sumOfPotNumbersWithPlant()}`);