import React from 'react';
import Score from './Score.jsx';

const ScoreBoard = (props) => (
  <div id="board">
    <h4>ベスト＊スコア</h4>
    <span>{props.scores.length}の楽しんだゲムがあります</span>
    {props.scores.slice(0,9).map(score => <Score score={score}/>)}
  </div>
)

export default ScoreBoard;