const http = require('http');
const app = require('./app');
require('dotenv').config();
const port = process.env.PORT||8000;

const server = http.createServer(app);
server.listen(port);
console.log(`server is lintening on port ${port}`);
