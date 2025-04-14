const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getAccountAdminDetailsFromToken = require('../helpers/getAccountAdminDetailsFromToken');
const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', async(socket)=>{

const token = socket.handshake.auth.token

const admin = await getAccountAdminDetailsFromToken(token)

socket.join(admin?._id?.toString())
})


module.exports = {
    app,
    server
};
