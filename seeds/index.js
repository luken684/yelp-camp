const mongoose = require('mongoose');
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i , 50; i++){
        const random122 = Math.floor(Math.random()* 122);
        const camp = new Campground ({
            location: `${cities[random122].city}, ${cities[random122].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});