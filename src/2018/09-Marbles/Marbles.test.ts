import {expect} from "chai";
import {Game} from "./Marbles";

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
            it(`${setting.players} players and highest Marble value of ${setting.highestMarbleValue}`, () => {
                const game = Game.setUpFor(setting.players, setting.highestMarbleValue);
                const winner = game.play();
                expect(winner.getScore()).to.equal(setting.expectedHighScore);
            });
        }
    });
});