import Tool from "./Tool";
import socket from "../core/socket";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

export default class Line extends Tool {

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
    socket.emit("draw", {room: toolState.room, type: "finish"})
    canvasState.getCanvasImage()
    this.mouseDown = false

  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.x = e.pageX - e.target.offsetLeft
    this.y = e.pageY - e.target.offsetTop
    // this.saved = this.canvas.toDataURL()
    socket.emit("draw", {room: toolState.room, type: "down"})
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      // this.draw(this.x, this.y,  e.pageX - e.target.offsetLeft - this.x, e.pageY - e.target.offsetTop - this.y)
      socket.emit("draw", {room: toolState.room, type: "line", x: this.x, y: this.y, w: e.pageX - e.target.offsetLeft - this.x, h: e.pageY - e.target.offsetTop - this.y})
    }
  }

  static draw(x: any, y: any, w: number, h: number) {

    const img = new Image()
    img.src = toolState.img
    const ctx = canvasState.canvas.getContext('2d')


    img.onload = () => {
      ctx.clearRect(0,0, canvasState.canvas.width, canvasState.canvas.height)
      ctx.drawImage(img, 0, 0, canvasState.canvas.width, canvasState.canvas.height)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + w, y + h)
      ctx.stroke()
    }
  }
}