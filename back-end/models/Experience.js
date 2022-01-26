const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      required: true,
      ref: 'User',
    },
    title: { 
      type: String, 
      required: true, 
      unique: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    img: { 
      type: String, 
      required: true 
    },
    createdAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
    editedAt: {
      type: Date,
    }, 
    heartUserIds: [
      {
      type: Schema.Types.ObjectId,
      ref: "User"
      },
    ],
    state: {
      type: String,
    },
  },
);

module.exports = mongoose.model("Experience", ExperienceSchema);