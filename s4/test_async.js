function softTraitment(nextFun) {
    let sum = 0;
    console.log('Connecting to Calc API')
    setTimeout(() => {
        console.log('Retreive from Calc API')
        sum = 10000000;
        nextFun(sum);
    }, 3000);
    
}

console.log('Begin')
softTraitment(function (res) {
    by5(res, (res1) => {
        display(res1)
    })
});
 
console.log('End')

function display(sum) {
    console.log('sum : ',sum)
}

function by5(x,callback) {
    setTimeout(() => {
        console.log('Inside by5');
        callback(x*5);
    }, 2000);
    
}