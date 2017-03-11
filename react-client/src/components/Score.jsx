import React from 'react';

const Score = (props) => (
  <div>
    { props.score.name }  |  { props.score.points }
  </div>
)

export default Score;