const mongoose = require('mongoose');
const mongoUtil = require( '../mongoUtil' );
const db = mongoUtil.getDb();

const notificationSchema = new mongoose.Schema({
  finderUserID:{ type:String, required:true },
  finderUserName:{ type:String, required:true },
  findRoommatePostId:{ type:String, required:true },
  visitPurpose:{ type:String, required:true },
  NotificationSeen:{ type:Boolean, required:true },
  visitDateRange:{ type:String, required:true },
  intreastedUserName:{ type:String, required:true },
  intreastedUserId:{ type:String, required:true }
})

module.exports = db.model("notification", notificationSchema);
