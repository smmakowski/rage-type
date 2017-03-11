import React from 'react';


const Terminal = (props) => (
  <div id="terminal">
    <h4></h4>
    <div id="terminalbody">
    </div>
   	<span>> <input placeholder="ここにレージ!" onChange={props.addChars}/> </span>
  </div>
)

export default Terminal;