import React from 'react'
import { Circle } from 'better-react-spinkit'

function Loading() {
  return (
    <center style ={{display: "grid", placeItems: "center", height: "100vh"}}>
        <div>
            <img src = "https://chattyedu.com.br/wp-content/uploads/2022/08/logo-c.png"
            height={165} width={328} style={{ marginBottom: 10}} ></img>
            <Circle color = "#000000" size={60}></Circle>
        </div>
    </center>
  )
}

export default Loading