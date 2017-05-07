import React from 'react';


const Controls = (props) => (
  <div id="controls">
  	<h4>Controls</h4>
   	<button onClick={props.toggleScoreBoard}>Toggle Scoreboard</button>
    <button onClick={props.playGame}>Start Game</button>
    <button onClick={props.changeName}>Change Name</button>
    <button onClick={props.showCredits}>Credits</button>

  </div>
)

export default Controls;