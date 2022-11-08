const mongoose = require('mongoose');

/**
* simple Schema For Storing User Details
* @param {name} String Name of the user
* @param {email} string Email of the user
* @param {password} string Password of the user
* Default Created at variable to Stored Time Details
*/


const userSchema = mongoose.Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true },
    password:{ type:String, required:true },
    created_at:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('User',userSchema);
