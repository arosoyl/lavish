const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
        type: String,
        required: true,
    },
    // fullname: {
    //     type: String,
    //     required: true
    // },
    // gender: {
    //     type: String,
    //     required: true,
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // phone: {
    //     type: String,
    //     required: true
    // },
    // avatar: {
    //     type: String,
    //     default:""
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);