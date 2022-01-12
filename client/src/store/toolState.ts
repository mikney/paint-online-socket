import {makeAutoObservable} from "mobx";

class ToolState {

  tool: any = null
  name: string = ''
  room: string = ''
  img: any
  strokeColor: any = "#000000"
  fillColor: any = "#000000"
  lineWidth: any = 1

  constructor() {
    makeAutoObservable(this)
  }

  setRoom(id: any) {
    this.room = id
  }

  saveDataUrl(img: any) {
    this.img = img
  }

  setName(name: string) {
    this.name = name
  }

  setTool(tool: any) {
    this.tool = tool
  }

  setFillColor(color: any) {
    this.tool.fillColor = color
    this.fillColor = color
  }

  setStrokeColor(color: any) {
    this.strokeColor = color
    this.tool.strokeColor = color
  }

  setLineWidth(width: any) {
    this.tool.lineWidth = width
    this.lineWidth = width
  }
}

export default new ToolState()