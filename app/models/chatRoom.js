var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
  zipcode: {
    type: String,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  subRooms: [{
    type: Schema.Types.ObjectId,
    ref: "subRoom"
  }]
});


module.exports = mongoose.model('ChatRoom', chatRoomSchema);
