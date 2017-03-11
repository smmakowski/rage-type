import React from 'react';


const Controls = (props) => (
  <div id="controls">
  	<h4>Controls</h4>
   	<button>Show/hide High Scores</button>
      <button>Start Game</button>
      <button onClick={props.changeName}>Change Name</button>
  </div>
)

export default Controls;