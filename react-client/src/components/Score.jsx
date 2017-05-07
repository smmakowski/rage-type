import React from 'react';

const Score = (props) => (
  <div id="entry">
    #{props.place} | {props.score.name}  |  {props.score.score} points
  </div>
)

export default Score;