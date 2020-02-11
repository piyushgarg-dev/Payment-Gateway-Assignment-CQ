const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  purchasedOn: {
    type: Date
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  activeCredits: {
    type: Number
  },
  pendingCredits: {
    type: Number
  }
});

let User = (module.exports = mongoose.model("Users", UserSchema));
