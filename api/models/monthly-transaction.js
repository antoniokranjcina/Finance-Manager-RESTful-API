const mongoose = require('mongoose');

const monthlyTransactionsSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    expenseOrIncome: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
});

module.exports = mongoose.model('MonthlyTransaction', monthlyTransactionsSchema);  