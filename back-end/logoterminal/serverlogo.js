const figlet = require('figlet');
 
figlet('SiFa - API REST', (err, data)=>{
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});