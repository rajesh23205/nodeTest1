const mongoose = require('mongoose');
const mongoUtil = require( '../mongoUtil' );
const db = mongoUtil.getDb();

const registerHotelSchema = new mongoose.Schema({
    // firstName:{ type:String, required:true },
    // lastName:{ type:String, required:true },
    email:{ type:String, required:true },
    mobileNumber:{ type:String, required:true },
    hotelName:{ type:String, required:true },
    house:{ type:String, required:true },
    street:{ type:String },
    address:{ type:String },
    city:{ type:String, required:true },
    state:{ type:String, required:true },
    postCode:{ type:String, required:true },
    country:{ type:String, required:true },
    minRoomCharge:{ type:String, required:true },
    userId:{ type:String, required:true },
    area:{ type:String, required:true }
})

module.exports = db.model("registerHotel",registerHotelSchema);
