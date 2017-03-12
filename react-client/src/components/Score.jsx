import React from 'react';

const Score = (props) => (
  <div>
    { props.score.name }  |  { props.score.score }
  </div>
)

export default Score;