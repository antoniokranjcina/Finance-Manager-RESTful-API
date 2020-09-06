const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mngoose = require('mongoose');

const dailyTransactionsRoutes = require('./api/routes/daily-transactions');
const monthlyTransactionsRoutes = require('./api/routes/monthly-transactions');
const userRoutes = require('./api/routes/user');


mngoose.connect('mongodb+srv://antoniokranjcina:' + process.env.MONGO_ATLAS_PW +'@cluster0.3r18m.mongodb.net/' + process.env.MONGO_ATLAS_DB_NAME +'?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

mngoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Acess-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/dailyTransactions', dailyTransactionsRoutes);
app.use('/monthlyTransactions', monthlyTransactionsRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;