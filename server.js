const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/no-sql-challenge',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },
);

mongoose.set('debug', process.env.NODE_ENV !== 'production');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    });
});

