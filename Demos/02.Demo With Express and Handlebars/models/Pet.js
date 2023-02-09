const fs = require('fs');
const path = require('path');
const db = require('../data/db.json');

class Pet {
    constructor(name, breed, age, weight, image) {
        this.id = db.length + 1;
        this.name = name,
        this.breed = breed,
        this.age = age,
        this.weight = weight,
        this.imgUrl = image;
    }

    save() {
        db.push(this);
        let jasonData = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/db.json'), jasonData);
    }
}

module.exports = Pet;
