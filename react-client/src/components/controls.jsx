import React from 'react';


const Controls = (props) => (
  <div id="controls">
  	<h4>コントロール</h4>
   	<button onClick={props.toggleScoreBoard}>スコアのトグル</button>
   	<button onClick={props.clearTerminal}>端末を空にする</button>
    <button onClick={props.playGame}>ゲームをスタート</button>
    <button onClick={props.changeName}>名前を変える</button>
    <button onClick={props.showCredits}>クレジット</button>

  </div>
)

export default Controls;