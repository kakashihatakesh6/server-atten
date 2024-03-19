const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://sages:sages@sages.p1zye6m.mongodb.net/attendance";


connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
    await mongoose.connect(mongoURI);
    await console.log("Connected to Mongoose Successfully!");
}


module.exports = connectToMongo