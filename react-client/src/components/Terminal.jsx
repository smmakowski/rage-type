import React from 'react';


const Terminal = (props) => (
  <div id="terminal">
    <h4>hrsf72-mvp-starter</h4>
   	<input placeholder="ここにレージ!" onChange={props.addChars}/>
  </div>
)

export default Terminal;