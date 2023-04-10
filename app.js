require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes')

const app = express();
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://perpustakaan.upi.edu:8080'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false
    }
}));

app.use('/v1/api', router);

// err handler
app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT_FOUND',
        message: 'Resource Not Found',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL_SERVER_ERROR',
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => console.log(`Serving port ${PORT}`));