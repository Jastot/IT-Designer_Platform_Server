var fs = require('fs');
var path = require('path');

// load the mongoose model for Image
var imgModel = require('../models/Image');

// the GET request handler that provides the HTML UI
exports.getImages = async (req, res, next) => {
  try {
    const users = await imgModel.find();
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
      });
    }
  };

// the POST handler for processing the uploaded file
exports.createImage = (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.file.filename)),
            contentType: 'image/png'
        }
    }
     imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.status(201).json({
              success: true,
              data: obj,
            });
        }
    });
};
