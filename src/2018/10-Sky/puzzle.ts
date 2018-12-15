import puzzleInput from './puzzle-input.txt'
import {Light, Observer, Sky} from "./Sky";

const lights = puzzleInput.split("\n").map(line => Light.fromText(line));
const observer = new Observer(lights);

console.log('Calculating sky constellations...');
interface SkyWithSecond {
    sky: Sky,
    second: number
}
const skies: SkyWithSecond[] = [];
for (let second = 0; second < 15000; second++) {
    skies.push({sky: observer.after(second), second: second});
}

console.log('Sorting sky constellations...');
const sorted = skies.sort((left, right) => Observer.dimensionComparator(left.sky, right.sky));

console.log('Displaying candidates...');
for (let skyIndex = 0; skyIndex < 3; skyIndex++) {
    console.log(`Sky after second ${sorted[skyIndex].second}:`);
    console.log(sorted[skyIndex].sky.toString());
    console.log("\n---------------\n");
}