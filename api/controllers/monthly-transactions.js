const mongoose = require('mongoose');
const MonthlyTransactions = require('../models/monthly-transaction');

exports.get_all_monthly_transactions = (req, res, next) => {
    MonthlyTransactions
        .find()
        .select('_id expenseOrIncome category date amount description')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.get_monthly_transaction = (req, res, next) => {
    const id = req.params.monthlyTransactionId;
    MonthlyTransactions
        .findById(id)
        .select('_id expenseOrIncome category date amount description')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.post_monthly_transaction = (req, res, next) => {
    const monthlyTransactions = new MonthlyTransactions({
        _id: new mongoose.Types.ObjectId(),
        expenseOrIncome: req.body.expenseOrIncome,
        category: req.body.category,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    });
    monthlyTransactions
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Monthly Transactions created successfully',
                createdDailyTransaction: {
                    _id: result._id,
                    expenseOrIncome: result.expenseOrIncome,
                    category: result.category,
                    date: result.date,
                    amount: result.amount,
                    description: result.description
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.patch_monthly_transaction = (req, res, next) => {
    const id = req.params.monthlyTransactionId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    MonthlyTransactions
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'Product updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_all_monthly_transactions = (req, res, next) => {
    MonthlyTransactions
        .deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All Monthly Transactions deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_monthly_transaction = (req, res, next) => {
    const id = req.params.monthlyTransactionId;
    MonthlyTransactions
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Monthly Transaction deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}