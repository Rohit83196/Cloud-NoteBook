// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/');
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/rohitverma"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI , (err,db)=>{
        if (err) {
            console.log(err);
        }
        else{
            console.log("connected to mongoose successfully");
        }
        
    })
}

module.exports = connectToMongo;