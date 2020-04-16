const mongoose = require('mongoose');
const mongoUtil = require( '../mongoUtil' );
const db = mongoUtil.getDb();

const registerSchema = new mongoose.Schema({
    firstName:{ type:String, required:true },
    lastName:{ type:String, required:true },
    email:{ type:String, required:true },
    password:{ type:String, required:true }
})

module.exports = db.model("signups",registerSchema);
