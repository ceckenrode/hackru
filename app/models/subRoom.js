var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subRoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  chats: [{
    user: String,
    message: String
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  parentRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom"
  }
});

subRoomSchema.methods.hashTagify = function(name) {
  if (name.charAt(0)!== "#"){
    name = "#" + name;
  }
  return name;
};

module.exports = mongoose.model('SubRoom', subRoomSchema);
