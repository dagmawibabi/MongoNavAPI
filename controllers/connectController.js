let mongoose = require('mongoose');
let Admin = mongoose.mongo.Admin;

let connectToDB = async (req, res) => {
    let DB_URL = req.query.connectionString;
    DB_URL = DB_URL.trim();
    DB_URL = DB_URL.replace(' ', '+');
    
    let allDatabases;   

    let connection = mongoose.createConnection(DB_URL);
    connection.on('open', () => {
        // Lists all databases
        new Admin(connection.db).listDatabases((err, result) => {
            allDatabases = result.databases;  
            console.log(allDatabases);
        });
        // One DB Stats
        connection.db.stats().then((result)=>{
            // console.log(result);
        });
        // Lists all collections names
        connection.db.listCollections().toArray((err, names) => {
            // console.log(names); 
        });
    });


    res.send('done');
}

module.exports = {connectToDB};