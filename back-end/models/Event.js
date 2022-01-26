const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    organizationId:
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref='Organization'
    },
    volunteers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Volunteer"
      }
    ],
    reports: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Report"
      },
    ],
    start_time:
    {
      type: Number,
      required: true
    },
    end_time:
    {
      type: Number,
      required: true
    },
    address:
    {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: "On-going"
    },
    maximum: {
      type: Number,
      default: 50
    },
    // createdAt: {
    //   type: Date,
    // },
    // deletedAt: {
    //   type: Date,
    // },
    // editedAt: {
    //   type: Date,
    // },

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", EventSchema);