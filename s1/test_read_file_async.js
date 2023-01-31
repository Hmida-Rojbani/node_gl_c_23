const fs = require("fs");

console.log("Begin Read");
fs.readFile("file.txt",  (err,res) => console.log("buffer :", res));

console.log("End Read");
