import { frequency } from './Frequency';

const fs = require('fs');

const frequencyValues = fs.readFileSync('puzzle-input.txt','utf8');
console.log(frequency(frequencyValues));