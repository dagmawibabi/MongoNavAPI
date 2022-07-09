let mongoose = require('mongoose');
let Admin = mongoose.mongo.Admin;

let curDatabase = {};   
let connectToDB = async (req, res) => {
    console.log('connecting to db');
    let DB_URL = req.query.connectionString;
    DB_URL = DB_URL.trim();
    DB_URL = DB_URL.replace(' ', '+');
    

    // connect
    await mongoose.connect(DB_URL,  {  useNewUrlParser: true ,  useUnifiedTopology: true }).then( (MongooseNode) => {                             
        let nativeConnection = MongooseNode.connections[0];        
        new Admin(nativeConnection.db).listDatabases(async (err, result) => {
            curDatabase["totalDB"] = {
                databases: result.databases,
                totalSize: result.totalSize,
                totalSizeMb: result.totalSizeMb,
            };
            await nativeConnection.db.stats().then((result)=>{
                curDatabase.stats = result;
            });
            // Lists all collections names
            await nativeConnection.db.listCollections().toArray((err, names) => {
                curDatabase.collections= names;
            });
            // Server info
            curDatabase.serverInfo = {
                host: nativeConnection.host,
                port: nativeConnection.port,
            };
            res.send(curDatabase);
        });
    });

        
    // let connection = mongoose.createConnection(DB_URL);
    // connection.on('open', async () => {
    //     // Get database overview
    //     await new Admin(connection.db).listDatabases(async (err, result) => {
    //         curDatabase.totalDB = {
    //             databases: result.databases,
    //             totalSize: result.totalSize,
    //             totalSizeMb: result.totalSizeMb,
    //         };
    //     });

    //     // One DB Stats
    //     await connection.db.stats().then((result)=>{
    //         curDatabase.stats = result;
    //     });
    //     // Lists all collections names
    //     await connection.db.listCollections().toArray((err, names) => {
    //         curDatabase.collections= names;
    //     });
    //     // Server info
    //     curDatabase.serverInfo = {
    //         host: connection.host,
    //         port: connection.port,
    //     };

    //     // console.log(curDatabase);
    //     res.send(JSON.stringify(curDatabase));
    //     connection.close();
    // });

    // connection.close();
    
    // res.send(curDatabase);

    
    
}

module.exports = {connectToDB};