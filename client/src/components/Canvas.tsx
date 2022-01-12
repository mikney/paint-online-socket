import React, {useEffect, useRef} from 'react';
import "../styles/Canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {useParams} from "react-router-dom";
import socket from "../core/socket";
import Rect from "../tools/Rect";
import axios from "axios";
import Line from "../tools/Line";
import Circle from "../tools/Circle";


const Canvas = observer(() => {


  let params= useParams<any>();

  const canvasRef = useRef<any>(null)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
  }, [])

  useEffect(() => {
    console.log(params.id);
    toolState.setRoom(params.id)
  })

  useEffect(() => {
    // socket.emit('connection')
    socket.emit('connection', {query:`room=${params.id}`})
    socket.emit('room', {room: params.id})
    socket.on("newuser", resp => {
      console.log(resp)
    })

    getDraws()

    socket.on("draw", (resp) => {
      switch (resp.type) {
        case "brush":
          Brush.draw(canvasState.canvas.getContext('2d'), resp.x, resp.y, resp.color, resp.lineWidth)
          break;
        case "rect":
          Rect.draw(resp.x, resp.y, resp.w, resp.h, resp.fillColor, resp.strokeColor, resp.lineWidth)
          break;
        case "line":
          Line.draw(resp.x, resp.y, resp.w, resp.h)
          break;
        case "circle":
          Circle.draw(resp.x, resp.y, resp.w, resp.h, resp.fillColor, resp.strokeColor, resp.lineWidth)
          break;
        case "finish":
          canvasState.canvas.getContext('2d').beginPath()
          canvasState.canvas.getContext('2d').strokeStyle = toolState.strokeColor
          canvasState.canvas.getContext('2d').fillStyle = toolState.fillColor
          canvasState.canvas.getContext('2d').lineWidth = toolState.lineWidth

          break;
        case "down":
          toolState.img = canvasState.canvas.toDataURL()
      }
    })

    socket.on("undo", (resp) => {
      console.log(resp.img)
      canvasState.undoSocket(resp.img)
    })
  },[])


  const getDraws = async () => {
    const resp: any = await axios.get("http://localhost:5000/draws", {params: {room: toolState.room}})
    canvasState.undoSocket(resp.data.img)

  }

  function mouseDownHandler() {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={900} height={600}>

      </canvas>
    </div>
  );
});

export default Canvas;