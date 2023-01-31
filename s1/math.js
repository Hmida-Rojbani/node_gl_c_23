module.exports = {
 sum : function sum(array) {
    let sum = 0;
    array.forEach( el => sum += el);

    return sum;
},
mul : function mul(array) {
    let mul = 1;

    array.forEach( el => mul *= el);

    return mul;
}

}