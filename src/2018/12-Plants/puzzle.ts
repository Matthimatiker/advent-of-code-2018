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


// After some generations the plant pattern stabilizes. Then the sum increases by 200.000 per 10.000 generations.
// Then, for 50000000000 generations, the sum is: 1.000.000.000.508

const generation10000 = rules.apply(initialPots, 10000);
console.log(`Generation Future with #${generation10000.pots.length} pots has sum ${generation10000.sumOfPotNumbersWithPlant()}`);

const generation20000 = rules.apply(generation10000, 10000);
console.log(`Generation Future with #${generation20000.pots.length} pots has sum ${generation20000.sumOfPotNumbersWithPlant()}`);