import Brush from "./Brush";

export default class Eraser extends Brush {

  mouseDown: boolean = false
  w: any
  h: any

  constructor(canvas: any) {
    super(canvas);
  }

  draw(x: any, y: any) {
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}