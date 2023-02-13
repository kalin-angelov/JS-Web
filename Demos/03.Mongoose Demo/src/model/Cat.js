const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You can\'t add cat without name!'],
        minLength: [3, 'The cat name can\'t be less then 3 character\'s!']
    },
    age: {
        type: Number,
        min: 0,
        max: 15
    },
    breed: String
});

catSchema.method('say', function () {
    return `Meow meow n**a, my name is ${this.name}!!!`;
});

const Cat = mongoose.model('Cat', catSchema );

module.exports = Cat;
