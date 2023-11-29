const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    image:{
        data: Buffer,
        contentType : String
    },
    name : {
        type: String,
        // required: true
    },
    price:{
        type:Number
    }
})

module.exports = mongoose.model("products",dataSchema)