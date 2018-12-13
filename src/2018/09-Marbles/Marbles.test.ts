import {expect} from "chai";
import {Game, Marble, MarbleCircle, Player} from "./Marbles";

describe('Player', () => {
    describe('#getScore()', () => {
        it('returns sum of marble values', () => {
            const player = new Player();
            player.keep(new Marble(11));
            player.keep(new Marble(3));
            player.keep(new Marble(7));

            expect(player.getScore()).to.equal(11 + 3 + 7);
        });

        it('returns 0 if player does not own any marble', () => {
            const player = new Player();

            expect(player.getScore()).to.equal(0);
        });
    });
});

describe('MarbleCircle', () => {
    it('has initially 1 marble', () => {
        const circle = new MarbleCircle();

        expect(circle.marbles).to.have.lengthOf(1);
    });

    describe('#place()', () => {
        it('returns empty list if marble value is not divisible by 23', () => {
            const circle = new MarbleCircle();
            const received = circle.place(new Marble(3));

            expect(received).to.have.lengthOf(0);
        });

        it('returns 2 marbles if placed marble is divisible by 23', () => {
            const circle = new MarbleCircle();
            for (let i = 1; i <= 22; i++) {
                circle.place(new Marble(i));
            }
            const received = circle.place(new Marble(23));

            expect(received).to.have.lengthOf(2);
        });
    });

    describe('#getTurn()', () => {
        it('returns initially 0', () => {
            const circle = new MarbleCircle();

            expect(circle.getTurn()).to.equal(0);
        });

        it('returns correct value if some marbles have been placed', () => {
            const circle = new MarbleCircle();
            circle.place(new Marble(1));
            circle.place(new Marble(2));

            expect(circle.getTurn()).to.equal(2);
        });

        it('returns correct value if some marbles have been removed', () => {
            const circle = new MarbleCircle();
            for (let i = 1; i <= 40; i++) {
                circle.place(new Marble(i));
            }

            expect(circle.getTurn()).to.equal(40);
        });
    });
});

describe('Game', () => {
    describe('calculates correct winner score for', () => {
        const settings = [
            {players: 10, highestMarbleValue: 1618, expectedHighScore: 8317},
            {players: 13, highestMarbleValue: 7999, expectedHighScore: 146373},
            {players: 17, highestMarbleValue: 1104, expectedHighScore: 2764},
            {players: 21, highestMarbleValue: 6111, expectedHighScore: 54718},
            {players: 30, highestMarbleValue: 5807, expectedHighScore: 37305}
        ];
        for (let setting of settings) {
            it(`${setting.players} players and highest marble value of ${setting.highestMarbleValue}`, () => {
                const game = Game.setUpFor(setting.players, setting.highestMarbleValue);
                const winner = game.play();
                expect(winner.getScore()).to.equal(setting.expectedHighScore);
            });
        }
    });
});