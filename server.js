const express = require('express')()
const http = require('http').createServer(express)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

let users ={}

io.on('connection', sock => {
    sock.on('message', ({name, message}) => {
        io.emit('message', {name, message})
    })
})

http.listen(4000, () => {
    console.log('Server started on port 4000')
})