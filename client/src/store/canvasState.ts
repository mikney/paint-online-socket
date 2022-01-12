import {makeAutoObservable} from "mobx";
import socket from "../core/socket";
import toolState from "./toolState";

class CanvasState {

  canvas: any = null
  undoList: any[] = []
  redoList: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(tool: any) {
    this.canvas = tool
  }

  // setColor(color: any) {
  //   this.canvas.getContext('2d').strokeStyle = color
  // }

  pushToUndo(data: any) {
    this.undoList.push(data)
  }
  pushToRedo(data: any) {
    this.redoList.push(data)
  }

  getCanvasImage() {
    socket.emit("img", {room: toolState.room, img: this.canvas.toDataURL()})
  }

  undo() {
    socket.emit("undo", {room: toolState.room})
    // if (!this.undoList.length) return
    // const undoElement = this.undoList.pop()
    // // if (!undoElement) return
    // this.pushToRedo(this.canvas.toDataURL())
    // const img = new Image()
    // img.src = undoElement
    // img.onload = () => {
    //   this.canvas.getContext('2d').clearRect(0,0, this.canvas.width, this.canvas.height)
    //   this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    // }
  }

  undoSocket(undoElement: any) {
    // if (!this.undoList.length) return
    // const undoElement = this.undoList.pop()
    // if (!undoElement) return
    // this.pushToRedo(this.canvas.toDataURL())
    const img = new Image()
    img.src = undoElement
    img.onload = () => {
      this.canvas.getContext('2d').clearRect(0,0, this.canvas.width, this.canvas.height)
      this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }
  }



  redo() {
    if (!this.redoList.length) return
    const redoElement = this.redoList.pop()
    // if (!redoElement) return
    this.pushToUndo(this.canvas.toDataURL())
    const img = new Image()
    img.src = redoElement
    img.onload = () => {
      this.canvas.getContext('2d').clearRect(0,0, this.canvas.width, this.canvas.height)
      this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

  // redo() {
  //   if (!this.redoList.length) return
  //   const redoElement = this.redoList.pop()
  //   // if (!redoElement) return
  //   this.pushToUndo(this.canvas.toDataURL())
  //   const img = new Image()
  //   img.src = redoElement
  //   img.onload = () => {
  //     this.canvas.getContext('2d').clearRect(0,0, this.canvas.width, this.canvas.height)
  //     this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
  //   }
  // }

}

export default new CanvasState()