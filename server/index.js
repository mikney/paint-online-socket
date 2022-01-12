const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')


const app = express();
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origins: ["*"],
  }
});

let listOfDraw = {}
let currentDraw = {}


let undo = 0
io.on("connection", (socket) => {

  socket.on("room", (resp) => {
    console.log(resp)
    socket.join(resp.room)
    io.to(resp.room).emit("newuser", {message: "new user connected"})
  })
  socket.on("draw", (resp) => {
    console.log(resp)
    console.log(resp.room)
    io.to(resp.room).emit("draw", resp)
  })
  socket.on("undo", (resp) => {
    console.log(listOfDraw[resp.room].length)
    if (!(listOfDraw[resp.room]?.length)) return
    if (!undo) {
      listOfDraw[resp.room].pop()
    }
    const current = listOfDraw[resp.room].pop()
    currentDraw[resp.room] = current
    io.to(resp.room).emit("undo", {img: current})
    undo++
  })
  socket.on("img", (resp) => {
    undo = 0
    console.log(!listOfDraw[resp.room])
    console.log('Image was added')
    currentDraw[resp.room] = resp.img

    if(!listOfDraw[resp.room]) listOfDraw[resp.room] = []
    if (listOfDraw[resp.room]?.length === 5) {
      listOfDraw[resp.room].shift()
      listOfDraw[resp.room].push(resp.img)
      return
    }
    listOfDraw[resp.room].push(resp.img)
  })

  socket.emit("connected", {message: `user with id ${socket.id} was connected`})
  console.log(`User connected ${socket.id}`)
});

app.get('/draws', (req, res) => {
  try {
    const {room} = req.query
    console.log(room)
    // res.json({img: listOfDraw[room][listOfDraw[room].length - 1]})
    res.json({img: currentDraw[room]})
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})



httpServer.listen(5000, (err) => {
  console.log("сервер запущен на порту")
});