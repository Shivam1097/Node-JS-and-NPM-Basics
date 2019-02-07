// First install Node.js and add to PATH.
// Just type 'node <filename.js>' in the terminal and hit enter to execute the the node app.


// Average function example
function avg(arr){
    var sum=0;
    arr.forEach(function (arr){
        sum+=arr;
    });
    console.log(Math.round(sum/arr.length));
}




var num=[40,65,77,82,80,54,73,63,95,49];s
avg(num)