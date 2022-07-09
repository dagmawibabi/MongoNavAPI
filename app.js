let express = require('express');
let app = express();
let cors = require('cors');

// Routes
let connectRoute = require('./routes/connectRoute');

// ENV
let port = process.env.PORT || 3000;

// CORS
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)

// Server
app.listen(port, () => {
    console.log("Hey there, I'm listening on port " + port);
});

// Route Handlers
app.get('/mna/', (req, res) => {
    res.send('Welcome!');
});

app.use('/mna/connect/', connectRoute);