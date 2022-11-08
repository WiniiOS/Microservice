const mongoose = require('mongoose');

/**
* simple Schema For Storing Product Details
* @param {name} String Name of the Product
* @param {description} String Description of the product
* @param {price} Number Price of the product
* Default Created at variable to Stored Time Details
*/


const productSchema = mongoose.Schema({
    name:{ type:String },
    email:{ type:String },
    price:{ type:Number },
    created_at:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('Product',productSchema);
