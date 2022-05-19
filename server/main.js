const express = require('express')()
const http = require('http').createServer(express)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

let users = {}
let rooms = {}


io.on('connection', sock => {
    sock.on('message', ({name, message}) => {
        io.emit('message', {name, message})
    })
    sock.on('Create Room', (username) => {
        let roomId = getRandomRoomId(7)

        createUser(sock.id)

        users[sock.id].username = username
        users[sock.id].roomid = roomId

        if ( roomId in rooms )
            rooms[roomId][sock.id] = 'user'
        else
            rooms[roomId] = { [sock.id]: 'user' }
        
        console.log(users)
        console.log(rooms)

        // sock.emit('send noti', `You have joined room [ ${roomId} ]`, 'pass')
        sock.emit('redirect user', '/'+roomId)
    })

    sock.on('disconnect', () => {
        if ( sock.id in users )
        {
            let roomId = users[sock.id].roomid

            if ( sock.id in rooms[roomId])
                delete rooms[roomId]
            
            delete users[sock.id]
            console.log(`${sock.id} has disconnected from webpage`)
        }
    })
})

http.listen(4000, () => {
    console.log('Server started on port 4000')
})

function createUser(id){
    users[id] = {
        username: '',
        roomid: '',
        score: 0,
    }
    console.log(`User [ ${id} ] has been created`)
}
function getRandomRoomId(len){
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = ''

    for(let x = 0; x < len; x++){
        id += possible.charAt(getRandomInt(possible.length))
    }
    return id
}

function getRandomInt(max, min=0) {
    return Math.floor(Math.random() * (max-min) + min)
}