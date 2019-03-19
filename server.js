const express = require('express');
const cors = require('cors');

const databaseRouter = require('./data/router.js');

const server = express();

server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Hubs API</h>
        <p>Welcome to the Lambda Hubs API</p>
    `);
});

server.use('/api/posts', databaseRouter);

module.exports = server; // CommonJS module syntax
