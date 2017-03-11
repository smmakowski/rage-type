import React from 'react';


const Controls = (props) => (
  <div id="controls">
  	<h4>コントロール</h4>
   	<button>Show/hide High Scores</button>
      <button onClick={props.playGame}>ゲームをスタート</button>
      <button onClick={props.changeName}>名前を変える</button>
  </div>
)

export default Controls;