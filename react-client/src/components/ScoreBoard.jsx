import React from 'react';
import Score from './Score.jsx';

const ScoreBoard = (props) => (
  <div id="board">
    <h4>{props.scores.length}のゲムのベスト10スコア</h4>
    {props.scores.slice(0,10).map((score, i) => <Score place={i + 1} score={score}/>)}
  </div>
)

export default ScoreBoard;