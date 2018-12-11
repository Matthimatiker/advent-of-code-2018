import puzzleInput from './puzzle-input.txt'
import {TreeParser} from "./Tree";

const data = puzzleInput.split(' ').map(value => parseInt(value, 10));

const root = TreeParser.parse(data);

console.log(`Metadata sum: ${root.metadataSum()}`);