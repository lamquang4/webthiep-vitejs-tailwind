const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getAccountDetailsFromToken = require('../helpers/getAccountDetailsFromToken');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', async(socket)=>{
    console.log("connect", socket.id)

const token = socket.handshake.auth.token

const user = await getAccountDetailsFromToken(token)

socket.join(user?._id?.toString())
})


module.exports = {
    app,
    server
};
