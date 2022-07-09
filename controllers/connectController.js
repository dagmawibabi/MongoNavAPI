let mongoose = require('mongoose');
let Admin = mongoose.mongo.Admin;

let connectToDB = async (req, res) => {
    console.log('connecting to db');
    let DB_URL = req.query.connectionString;
    DB_URL = DB_URL.trim();
    DB_URL = DB_URL.replace(' ', '+');
    
    let curDatabase = {};   

    let connection = mongoose.createConnection(DB_URL);
    connection.on('open', async () => {
        // Get database overview
        await new Admin(connection.db).listDatabases(async (err, result) => {
            curDatabase.totalDB = {
                databases: result.databases,
                totalSize: result.totalSize,
                totalSizeMb: result.totalSizeMb,
            };
        });

    

        // One DB Stats
        await connection.db.stats().then((result)=>{
            curDatabase.stats = result;
        });
        // Lists all collections names
        await connection.db.listCollections().toArray((err, names) => {
            curDatabase.collections= names;
        });


        curDatabase.serverInfo = {
            host: connection.host,
            port: connection.port,
        };

        // host port name connection.host connection.port connection.name
        // console.log(curDatabase);
        res.send(curDatabase);
    });

    // connection.close();
    
    
}

module.exports = {connectToDB};