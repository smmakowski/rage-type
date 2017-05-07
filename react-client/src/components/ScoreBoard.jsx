import React from 'react';
import Score from './Score.jsx';

const ScoreBoard = (props) => (
  <div id="board">
    <h4>Top 10 Scores Out Of {props.scores.length} Games</h4>
    {props.scores.slice(0,10).map((score, i) => <Score place={i + 1} score={score}/>)}
  </div>
)

export default ScoreBoard;