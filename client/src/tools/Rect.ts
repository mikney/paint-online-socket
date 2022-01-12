import Tool from "./Tool";
import socket from "../core/socket";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

export default class Rect extends Tool {

  y: any
  x: any
  saved: any
  mouseDown: boolean = false

  constructor(canvas: any) {
    super(canvas);
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false
    socket.emit("draw", {room: toolState.room, type: "finish"})
    canvasState.getCanvasImage()
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.x = e.pageX - e.target.offsetLeft
    this.y = e.pageY - e.target.offsetTop
    socket.emit("draw", {room: toolState.room, type: "down"})
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      socket.emit("draw", {
        room: toolState.room,
        type: "rect",
        x: this.x,
        y: this.y,
        w: e.pageX - e.target.offsetLeft - this.x,
        h: e.pageY - e.target.offsetTop - this.y,
        strokeColor: toolState.strokeColor,
        fillColor: this.ctx.fillStyle,
        lineWidth: this.ctx.lineWidth
      })
    }
  }
  static draw(x: any, y: any, w: number, h: number, fillColor: any, strokeColor: any, lineWidth: any) {

    const img = new Image()
    const ctx = canvasState.canvas.getContext('2d')
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    img.src = toolState.img

    img.onload = () => {
      ctx.clearRect(0,0, canvasState.canvas.width, canvasState.canvas.height)
      ctx.drawImage(img, 0, 0, canvasState.canvas.width, canvasState.canvas.height)
      ctx.beginPath()
      ctx.rect(x, y, w, h)
      ctx.fill()
      ctx.stroke()
    }
  }
}