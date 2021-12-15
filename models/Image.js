var mongoose = require('mongoose');

// The important point here is that
// our data type for the image is a Buffer
// which allows us to store our image as data in the form of arrays.
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema
module.exports = new mongoose.model('Image', imageSchema);
