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
        type: String,  // Volunteer + Org
        required: true,
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/ddr1jplps/image/upload/v1644202585/avatar/tteqztgr5kl1wgjcfu8o.jpg"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);