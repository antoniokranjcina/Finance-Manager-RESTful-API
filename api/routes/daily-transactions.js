const express = require('express');
const router = express.Router();

const DailyTransactionsController = require('../controllers/daily-transactions');


router.get('/', DailyTransactionsController.get_all_daily_transactions);
router.get('/:dailyTransactionId', DailyTransactionsController.get_daily_transaction);

router.post('/', DailyTransactionsController.post_daily_transaction);

router.patch('/:dailyTransactionId', DailyTransactionsController.patch_daily_transaction);

router.delete('/', DailyTransactionsController.delete_all_daily_transactions);
router.delete('/:dailyTransactionId', DailyTransactionsController.delete_daily_transaction);

module.exports = router;