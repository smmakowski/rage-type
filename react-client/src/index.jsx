import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ScoreBoard from './components/ScoreBoard.jsx';
import Terminal from './components/Terminal.jsx';
import Controls from './components/Controls.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      scores:[{name: 'レージさん', points: 1000000}, {name: 'レージさん', points: 1000000},
      {name: 'レージさん', points: 1000000}, {name: 'レージさん', points: 1000000},
      {name: 'レージさん', points: 1000000}],
      playerName: '',
      timeLeft: 44,
      charCount: 0
    }

    this.changeName = this.changeName.bind(this);
    this.runGame = this.runGame.bind(this);
    this.setupGame = this.setupGame.bind(this);
    this.addToCharCount = this.addToCharCount.bind(this);
    this.playGame = this.playGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  // Control Functions
  showCredits () {
    alert('A Hack Reactor MVP project by Stephen Makowski.' +
      'Technologies used: React, Express, MongoDB, and Node' +
      '(...and some jQuery. I hope it isn\'t an anti-pattern ^-^) \n \n' +
      'Big thanks to Everyone in HRSF72, expecially those who put up' +
      'with me during pair programming! Y\'all rule! Hope you enjoy' +
      'the game!')
  }

  changeName () {
    // set name on load
    var name = prompt('名前は...？ 名前がなければPlayerにします');
    if (name === '') {
      name = 'PLAYER'
    } else {
      name = name.toUpperCase();
    }

    this.setState({playerName: name});
  }

  toggleScoreBoard() {
    $('#board').toggle();
  }

  // Terminal display related functions
  addToCharCount () {
    this.setState({charCount: this.state.charCount + 1});

    var line = window.lines[Math.floor(Math.random() * window.lines.length)];
    line = line + ' \n '
    var $termBody = $('#terminalbody');
    $termBody.append(line);
    $termBody.scrollTop = $termBody.scrollHeight;
    $('input').val('');
  }

  clearTerminal () {
    $('#terminalbody').empty();
  }

  //Game Flow
  playGame() {
    this.setupGame();
    this.runGame(this.endGame);
  }

  setupGame() {
    $('p').show();
    this.setState({charCount: 0});
    this.setState({timeLeft: 44});
  }

  runGame(cb) {
    var time = 10;

    var ticker = setInterval(function(){

      console.log(time);
      if (time === 0) {
        clearInterval(ticker);
        cb();
      } else {
        time--;
      }
    }, 1000);
  }

  endGame() {
    alert('Congratz ' + this.state.playerName + ', you typed ' + this.state.charCount + ' characters');

    //send the data to the data base

    //grab data and rerender high score board

    //set characters typed back to 0;

    this.setState({charCount: 0})
    $('p').hide();
  }


  componentDidMount() {
  $('p').hide();
  this.changeName();
    
  // get highscores from db
    $.ajax({
      url: '/scores', 
      success: (data) => {   
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      
      <header>
        <h1>レージ(●o≧д≦o)タイプ!</h1>
        <h3>よこそ, {this.state.playerName}! レージしよう!</h3>
        <p>{this.state.timeLeft}秒が残ります</p>
        <p>{this.state.charCount}キャラをタイプしました</p>
      </header>

      <div id="main">
        <Terminal addChars={this.addToCharCount} />
      </div>

      <div id="side">
        <Controls showCredits={this.showCredits} playGame={this.playGame} changeName={this.changeName} toggleScoreBoard={this.toggleScoreBoard} clearTerminal={this.clearTerminal}/>
        <ScoreBoard scores={this.state.scores}/>
      </div>
    </div>)
  }

}

ReactDOM.render(<App />, document.getElementById('app'));