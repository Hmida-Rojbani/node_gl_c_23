function softTraitment() {
    return new Promise((resolve,reject)=>{
        let sum = 0;
        console.log('Connecting to Calc API')
        setTimeout(() => {
            console.log('Retreive from Calc API')
            sum = 10000000;
            resolve(sum);
        }, 3000);
    });
    
    
}

console.log('Begin')
// softTraitment(function (res) {
//     by5(res, (res1) => {
//         display(res1)
//     })
// });
// softTraitment().then(res => by5(res))
//                 .then(res => display(res))
//                 .catch(err => console.error('Error :',err))
async function exec() {
    try {
        let sum = await softTraitment();
        let res = await by5(sum);
        display(res)
    } catch (error) {
       console.error('Error : ',error); 
    }
    
}

exec()
exec()
console.log('End')

function display(sum) {
    console.log('sum : ',sum)
}

function by5(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(x>100000)
            reject('Value is to big')
        console.log('Inside by5');
        resolve(x*5);
    }, 2000);
    })
    
    
}