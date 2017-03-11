import React from 'react';
import Score from './Score.jsx';

const ScoreBoard = (props) => (
  <div id="board">
    <h4>High Scores</h4>
    There are { props.items.length } items.
    { props.items.map(item => <Score item={item}/>)}
  </div>
)

export default ScoreBoard;