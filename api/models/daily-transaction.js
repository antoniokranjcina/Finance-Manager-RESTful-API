const mongoose = require('mongoose');

const dailyTransactionsSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    paymentMethod: {type: String, required: true},
    expenseOrIncome: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
});

module.exports = mongoose.model('DailyTransaction', dailyTransactionsSchema);