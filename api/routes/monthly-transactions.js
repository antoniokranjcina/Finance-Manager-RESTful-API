const express = require('express');
const router = express.Router();

const MonthlyTransactionsController = require('../controllers/monthly-transactions');


router.get('/', MonthlyTransactionsController.get_all_monthly_transactions);
router.get('/:monthlyTransactionId', MonthlyTransactionsController.get_monthly_transaction);

router.post('/', MonthlyTransactionsController.post_monthly_transaction);

router.patch('/:monthlyTransactionId', MonthlyTransactionsController.patch_monthly_transaction);

router.delete('/', MonthlyTransactionsController.delete_all_monthly_transactions);
router.delete('/:monthlyTransactionId', MonthlyTransactionsController.delete_monthly_transaction);

module.exports = router;