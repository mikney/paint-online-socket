import Tool from "./Tool";
import socket from "../core/socket";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

export default class Brush extends Tool {

  mouseDown: boolean = false
  w: any
  h: any

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
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      socket.emit("draw", {
        room: toolState.room,
        type: "brush",
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
        color: this.ctx.fillStyle,
        lineWidth: this.ctx.lineWidth
      })
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  static draw(ctx: any, x: any, y: any, color: any, lineWidth: any) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.lineTo(x, y)
    ctx.stroke()
    // ctx.strokeStyle = ctx.fillStyle
  }
}