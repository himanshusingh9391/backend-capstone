const mongoose = require('mongoose');

const AddProductsSellerSchema = new mongoose.Schema(
    {
        image: String,
        title: String,
        description: String,
        price: Number,
        discount: String
    },
);

module.exports = mongoose.model("addnewproducts",AddProductsSellerSchema);
