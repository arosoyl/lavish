const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    eventId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref:"Event"
    },
    organizationId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref:"Organization" 
    },
    incomes: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref:"User"
            },
            money: {
                type: Number
            },
            message:{
                type: String
            },

        },
    ],
    expenses: [
        {
            activity:{
                type: String
            },
            money_out:{
                type:Number
            },
        },
    ],
    total: { 
        type: Number
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
  },
);

module.exports = mongoose.model("Report", ReportSchema);

// 1 tổ chức có quỹ ban đầu???
// tiền không tiêu hết của hoạt động này??? hay phải 