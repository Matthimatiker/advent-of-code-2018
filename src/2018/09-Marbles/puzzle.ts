import {Game} from "./Marbles";

// 473 players; last marble is worth 70904 points
const game = Game.setUpFor(473, 70904);
const winner = game.play();

console.log(`The winner has a score of ${winner.getScore()}`);