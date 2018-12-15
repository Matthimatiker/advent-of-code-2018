import puzzleInput from './puzzle-input.txt'
import {Light, Observer} from "./Sky";

const lights = puzzleInput.split("\n").map(line => Light.fromText(line));
const observer = new Observer(lights);

console.log('Calculating sky constellations...');
const skies = [];
for (let second = 0; second < 15000; second++) {
    skies.push(observer.after(second));
}

console.log('Sorting sky constellations...');
const sorted = Observer.sortByWordProbability(skies);

console.log('Displaying candidates...');
for (let skyIndex = 0; skyIndex < 3; skyIndex++) {
    console.log(sorted[skyIndex].toString());
    console.log("\n---------------\n");
}