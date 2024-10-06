const express = require("express");
const mongoose = require("mongoose");
const routes = require('./app/routes/routes');


const app = express();

app.use('/api', routes);
app.use('/storage', express.static(__dirname + '/storage'));

app.listen(3000, async () => {
    console.log('server is ready');
    const mongoConnection = await mongoose.connect('mongodb://localhost/artemuzbeki_db');
    console.log('db is ready');
});