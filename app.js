let express = require('express');
let mongoose = require('mongoose');
let app = express();

// Routes
let connectRoute = require('./routes/connectRoute');

// ENV
let port = process.env.PORT || 3000;

// Server
app.listen(port, () => {
    console.log("Hey there, I'm listening on port " + port);
});

// Route Handlers
app.get('/mna/', (req, res) => {
    res.send('Welcome!');
});

app.use('/mna/connect', connectRoute);