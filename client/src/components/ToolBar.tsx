import React from 'react';
import '../styles/Toolbar.scss'
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import toolState from "../store/toolState";
import {observer} from "mobx-react-lite";


const ToolBar = observer(() => {


  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    toolState.setFillColor(e.target.value)
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={() => new Brush(canvasState.canvas)}/>
      <button className="toolbar__btn rect" onClick={() => new Rect(canvasState.canvas)}/>
      <button className="toolbar__btn circle" onClick={() => new Circle(canvasState.canvas)} />
      <button className="toolbar__btn eraser" onClick={() => {
        new Brush(canvasState.canvas)
        toolState.setFillColor("#ffffff")
      }}/>
      <button className="toolbar__btn line" onClick={() => new Line(canvasState.canvas)}/>
      <input type="color" value={toolState.fillColor} onChange={(e) => changeColor(e)}/>
      <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
      {/*<button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>*/}
      {/*<button className="toolbar__btn save"/>*/}
    </div>
  );
});

export default ToolBar;