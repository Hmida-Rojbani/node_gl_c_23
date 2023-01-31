module.exports=function sum(array) {
    let sum = 0;
    array.forEach( el => sum += el);
    return sum;
}