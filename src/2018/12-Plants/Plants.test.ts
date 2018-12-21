import {expect} from "chai";
import {NO_PLANT, PLANT, Pots, Rule, Rules} from "./Plants";

describe('Pots', () => {
    describe('#trim()', () => {
        it('removes empty pots from head and tail', () => {
            const pots = new Pots([NO_PLANT, PLANT, NO_PLANT, PLANT, NO_PLANT]);

            const trimmed = pots.trim();

            expect(trimmed.pots).to.deep.equal([PLANT, NO_PLANT, PLANT]);
        });

        it('updates index', () => {
            const pots = new Pots([NO_PLANT, PLANT, NO_PLANT, PLANT, NO_PLANT]);

            const trimmed = pots.trim();

            expect(trimmed.initialPotIndex).to.equal(1);
        });

        it('returns correct value if pots are all empty', () => {
            const pots = new Pots([NO_PLANT, NO_PLANT, NO_PLANT]);

            const trimmed = pots.trim();

            expect(trimmed.pots).to.deep.equal([]);
            expect(trimmed.initialPotIndex).to.equal(3);
        });
   });

    describe('#sumOfPotNumbersWithPlant()', () => {
        it('returns correct value if first pot index is positive', () => {
            const pots = new Pots([NO_PLANT, PLANT, PLANT, NO_PLANT, PLANT], 1);

            expect(pots.sumOfPotNumbersWithPlant()).to.equal(2 + 3 + 5);
        });

        it('returns correct value if first pot index is negative', () => {
            const pots = new Pots([PLANT, PLANT, NO_PLANT, PLANT], -2);

            expect(pots.sumOfPotNumbersWithPlant()).to.equal(-2 + -1 + 1);
        });
    });

    describe('#toString()', () => {
        it('returns correct representation', () => {
            const pots = new Pots([NO_PLANT, PLANT, PLANT, NO_PLANT, PLANT]);

            expect(pots.toString()).to.equal('.##.#');
        });
    });

    describe('#fromState()', () => {
        it('returns correct pot sequence', () => {
            const pots = Pots.fromState('#..#.#.');

            expect(pots.pots).to.deep.equal([PLANT, NO_PLANT, NO_PLANT, PLANT, NO_PLANT, PLANT, NO_PLANT]);
            expect(pots.initialPotIndex).to.equal(0);
        });
    });
});

describe('Rule', () => {
    describe('#fromDefinition()', () => {
        it('returns correct rule from definition that results in PLANT', () => {
            const rule = Rule.fromDefinition('...## => #');

            expect(rule.pattern).to.deep.equal([NO_PLANT, NO_PLANT, NO_PLANT, PLANT, PLANT]);
            expect(rule.result).to.equal(PLANT);
        });

        it('returns correct rule from definition that results in NO_PLANT', () => {
            const rule = Rule.fromDefinition('#...# => .');

            expect(rule.pattern).to.deep.equal([PLANT, NO_PLANT, NO_PLANT, NO_PLANT, PLANT]);
            expect(rule.result).to.equal(NO_PLANT);
        });
    });

    describe('matches', () => {
        const rule = new Rule([NO_PLANT, PLANT, NO_PLANT], PLANT);

        it('returns true if pattern matches', () => {
            expect(rule.matches([NO_PLANT, PLANT, NO_PLANT])).to.equal(true);
        });

        it('returns false if pattern does not match', () => {
            expect(rule.matches([NO_PLANT, NO_PLANT, NO_PLANT])).to.equal(false);
        });

        it('throws error if slice for comparison has different size', () => {
            expect(() => {
                rule.matches([PLANT, NO_PLANT]);
            }).to.throw(Error);
        });
    });
});

describe('Rules', () => {
    describe('returns correct value for example', () => {
        const initialState = '#..#.#..##......###...###';
        const ruleDefinitions = "...## => #\n" +
            "..#.. => #\n" +
            ".#... => #\n" +
            ".#.#. => #\n" +
            ".#.## => #\n" +
            ".##.. => #\n" +
            ".#### => #\n" +
            "#.#.# => #\n" +
            "#.### => #\n" +
            "##.#. => #\n" +
            "##.## => #\n" +
            "###.. => #\n" +
            "###.# => #\n" +
            "####. => #";
        const expectedPotsByGeneration = [
            '...#..#.#..##......###...###...........',
            '...#...#....#.....#..#..#..#...........',
            '...##..##...##....#..#..#..##..........',
            '..#.#...#..#.#....#..#..#...#..........',
            '...#.#..#...#.#...#..#..##..##.........',
            '....#...##...#.#..#..#...#...#.........',
            '....##.#.#....#...#..##..##..##........',
            '...#..###.#...##..#...#...#...#........',
            '...#....##.#.#.#..##..##..##..##.......',
            '...##..#..#####....#...#...#...#.......',
            '..#.#..#...#.##....##..##..##..##......',
            '...#...##...#.#...#.#...#...#...#......',
            '...##.#.#....#.#...#.#..##..##..##.....',
            '..#..###.#....#.#...#....#...#...#.....',
            '..#....##.#....#.#..##...##..##..##....',
            '..##..#..#.#....#....#..#.#...#...#....',
            '.#.#..#...#.#...##...#...#.#..##..##...',
            '..#...##...#.#.#.#...##...#....#...#...',
            '..##.#.#....#####.#.#.#...##...##..##..',
            '.#..###.#..#.#.#######.#.#.#..#.#...#..',
            '.#....##....#####...#######....#.#..##.',
        ];

        let initialPots: Pots;
        let rules: Rules;
        beforeEach(() => {
            initialPots = Pots.fromState(initialState);
            const rulesFromDefinitions = ruleDefinitions.split("\n").map((definition => Rule.fromDefinition(definition)));
            rules = new Rules(rulesFromDefinitions);
        });


        expectedPotsByGeneration.forEach((expectedState, generation) => {
            it(`in generation ${generation}`, () => {
                const calculated = rules.apply(initialPots, generation);

                const expectedPots = Pots.fromState(expectedState);
                expect(calculated.trim().toString()).to.equal(expectedPots.trim().toString());
            });
        });

        it('returns correct sum in generation 20', () => {
            const calculated = rules.apply(initialPots, 20);

            expect(calculated.sumOfPotNumbersWithPlant()).to.equal(325);
        });
    });
});