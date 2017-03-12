import React from 'react';

const Score = (props) => (
  <div id="entry">
    第{props.place}番 | {props.score.name}  |  {props.score.score}ポイント
  </div>
)

export default Score;