import React from 'react';


const Terminal = (props) => (
  <div id="terminal">
    <div id="terminalbody">
    </div>
   	<span>> <input placeholder="ここにタイプしてください!" onChange={props.addChars}/> </span>
  </div>
)

export default Terminal;