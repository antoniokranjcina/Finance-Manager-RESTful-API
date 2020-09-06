const mongoose = require('mongoose');
const DailyTransaction = require('../models/daily-transaction');

exports.get_all_daily_transactions = (req, res, next) => {
    DailyTransaction
        .find()
        .select('_id paymentMethod expenseOrIncome category date amount description')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                dailyTransactions: docs.map(doc => {
                    return {
                        _id: doc._id,
                        paymentMethod: doc.paymentMethod,
                        expenseOrIncome: doc.expenseOrIncome,
                        category: doc.category,
                        date: doc.date,
                        amount: doc.amount,
                        description: doc.description
                    }
                })
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.get_daily_transaction = (req, res, next) => {
    const id = req.params.dailyTransactionId;
    DailyTransaction
        .findById(id)
        .select('_id paymentMethod expenseOrIncome category date amount description')
        .exec()
        .then(result => {
            res.status(200).json({result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.post_daily_transaction = (req, res, next) => {
    const dailyTransaction = new DailyTransaction({
        _id: new mongoose.Types.ObjectId(),
        paymentMethod: req.body.paymentMethod, 
        expenseOrIncome: req.body.expenseOrIncome,
        category: req.body.category,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    });
    dailyTransaction
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Daily Transaction created successfully',
                createdDailyTransaction: {
                    _id: result._id,
                    paymentMethod: result.paymentMethod,
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

exports.patch_daily_transaction = (req, res, next) => {
    const id = req.params.dailyTransactionId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    DailyTransaction
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'Daily Transaction updated',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_all_daily_transactions = (req, res, next) => {
    DailyTransaction
        .deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All Daily Transactions deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_daily_transaction = (req, res, next) => {
    const id = req.params.dailyTransactionId;
    DailyTransaction
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Daily Transaction deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}