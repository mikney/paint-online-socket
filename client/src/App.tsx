import React, {useEffect} from 'react';
import ToolBar from "./components/ToolBar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import "../src/styles/App.scss"
import socket from "./core/socket";
import Brush from "./tools/Brush";
import canvasState from "./store/canvasState";
import {
  BrowserRouter,
  Route,
  Navigate, Routes,
  useLocation,
  useParams
} from "react-router-dom";
import toolState from "./store/toolState";
import {observer} from "mobx-react-lite";

const App = observer(() => {

  // window.socket = socket;
  // let location = useLocation();




  useEffect(() => {
    // console.log(location.pathname);
  })

  function onSignInHandler() {
  }

  return (
    <BrowserRouter>
      {/*<Routes>*/}
      {/*  <Route path={"/:id"} element={*/}
      {/*    toolState.name ?*/}
      {/*        <>*/}
      {/*          <ToolBar/>*/}
      {/*          <SettingBar/>*/}
      {/*          <Canvas />*/}
      {/*        </>*/}
      {/*        : <>*/}
      {/*          <input type="text"/>*/}
      {/*          <button onClick={() => onSignInHandler()}>Войти</button>*/}
      {/*          <h1>da syka</h1>*/}
      {/*        </>*/}
      {/*  } />*/}
      {/*  <Route path={"/"} element={<>*/}
      {/*    <input onChange={(e) => toolState.setName(e.target.value)} type="text"/>*/}
      {/*    <button onClick={() => onSignInHandler()}>Войти</button>*/}
      {/*  </>} />*/}
      {/*  <Route path="21" element={<h1>HEYTO</h1>} />*/}
      {/*  <Route path="*" element={<Navigate to={"/21"} />} />*/}

      {/*</Routes>*/}


      <Routes>
        <Route path={"/:id"} element={
          <>
            <ToolBar/>
            <SettingBar/>
            <Canvas />
          </>
        } />
        {/*<Route path={"/"} element={<>*/}
        {/*  <input onChange={(e) => toolState.setName(e.target.value)} type="text"/>*/}
        {/*  <button onClick={() => onSignInHandler()}>Войти</button>*/}
        {/*</>} />*/}
        {/*<Route path="21" element={<h1>HEYTO</h1>} />*/}
        <Route path="*" element={<Navigate to={`${new Date().getTime()}`} />} />

      </Routes>
    </BrowserRouter>

  );
});

export default App;