const mongoose = require('mongoose');

const Cat = require('./model/Cat');

mongoose.set({ 'strictQuery': false });

async function main () {
   await mongoose.connect('mongodb://127.0.0.1:27017/demoData');

   console.log('Database connected');

//    const newCat = new Cat({
//         name: "Garry",
//         age: 1,
//         breed: "Some Cat"
//    });

//    await newCat.save();
    // await Cat.updateOne({ name: 'Mongo ll' }, { $set: {name: 'Mongo II'}});
    await Cat.deleteOne({name: 'Mongo II'});
    const data = await Cat.find();
    console.log(data);
//    data.forEach(cat => console.log(cat.say()));

}

main();
