const mongoose = require("mongoose")

/**
* simple Schema for the Order, For Storing user's Order
* @param {products} Array of the selected IDs
* @param {user} String Who create the Order
* @param {total_price} Number Total Price of the Ordered products
* Default Created at variable to Stored Time Details
*/

const orderSchema = mongoose.Schema({
    products:[{ product_id:String }],
    user:{ type:String },
    total_price:{ type:Number },
    created_at:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('Order',orderSchema);
