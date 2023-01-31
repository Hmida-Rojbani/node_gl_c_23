const fs = require("fs");

console.log("Begin Read");
let buffer = fs.readFileSync("file.txt");
console.log("buffer :", buffer);
console.log("End Read");
