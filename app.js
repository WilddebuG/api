const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const port = 5000;
// const db = require('./config/db');
//
// global.db = db;

let models = require('./models');
let routers = require('./routers/index');
// let routersCompany = require('./routers/company');
app.use(bodyParser.json());
app.use("/", routers);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
