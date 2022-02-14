const mongoose = require('mongoose');

const Expenses = new mongoose.Schema({

    activity: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

const Incomes = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // User - role 1 - ORG
    },
    amount: {
        type: Number,
        required: true
    }
})



const ReportSchema = new mongoose.Schema({

    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // User - role 1 - ORG
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    expenses: [
        Expenses
    ],
    incomes: [
        Incomes
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Report", ReportSchema);
