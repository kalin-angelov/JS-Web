const path = require('path');
const fs = require('fs');
const db = require('../data/cubeDb.json');

class Cube {
    constructor (name, description, imageUrl, difficultyLevel) {
        this.id = db.length + 1
        this.name = name,
        this.description = description,
        this.imageUrl = imageUrl,
        this.difficultyLevel = difficultyLevel
    }

    save() {
        db.push(this)
        let jsonData = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/cubeDb.json'), jsonData);
    }
};

module.exports = Cube;
