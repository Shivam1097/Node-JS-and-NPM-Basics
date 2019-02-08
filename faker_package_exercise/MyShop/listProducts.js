var fake=require("faker");

console.log("=============================================================================================================");
console.log("                                   Welcome to MyShop                          ");
console.log("=============================================================================================================");

for(var i=0;i<10;i++){
    console.log(fake.commerce.productName()+" - $"+fake.commerce.price());     // Generates fake products and fake prices!
}


console.log(fake.name.findName());                  // Generate fake names.
console.log(fake.internet.email());                 // Generate fake Emails.
console.log(fake.helpers.createCard());             // Generate fake details of CARDS.
console.log(fake.image.image());                    // Generate fake images.