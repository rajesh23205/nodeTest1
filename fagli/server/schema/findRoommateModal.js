const mongoose = require('mongoose');
const mongoUtil = require( '../mongoUtil' );
const db = mongoUtil.getDb();

const findRoommateSchema = new mongoose.Schema({
    visitPurpose:{ type:String, required:true },
    dateRange:{ type:String, required:true },
    details:{ type:String, required:true },
    hotelId:{ type:String, required:true },
    userId:{ type:String, required:true },
    date:{ type:Number, required:true },
    month:{ type:Number, required:true },
    year:{ type:Number, required:true },
    finderUserID:{ type:String, required:true },
    finderUserName:{ type:String, required:true },
    intreastedUsers: { type:String, required:false }
})

module.exports = db.model("findRoommate",findRoommateSchema);
