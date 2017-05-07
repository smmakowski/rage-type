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
      scores:[],
      playerName: '',
      timeLeft: 10,
      charCount: 0
    }

    // bind everything to App
    this.changeName = this.changeName.bind(this);
    this.runGame = this.runGame.bind(this);
    this.setupGame = this.setupGame.bind(this);
    this.addToCharCount = this.addToCharCount.bind(this);
    this.playGame = this.playGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.getData = this.getData.bind(this);
  }

  // Controller Functions
  showCredits () {
    alert('A Hack Reactor MVP Project by Stephen Makowski.' +
      'Technologies used: React, Express, MongoDB, and Node' +
      ' \n \n' +
      'Big thank you to everyone in Hack Reactor HRSF72! Ya\'ll rule' +
      'Hope you enjoy the game!')
  }

  changeName () {
    // set name on load
    var name = prompt('Please enter your name! (Default name is "PLAYER")');
    if (name === '' || name === null) {
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
    var $input = $('input');
    this.setState({charCount: this.state.charCount + 5711});

    var line = lines[Math.floor(Math.random() * lines.length)] + ' ';
    $input.val($input.val() + line);
    var $termBody = $('#terminalbody');
    $termBody.text($termBody.text() + line);

    if ($termBody.text().length > 1040) {
      $termBody.text($termBody.text().slice(line.length - 1));
    }
    
    
    if ($input.val().length > 70) {
      $input.val('');
    }
    
  }

  clearTerminal () {
    $('#terminalbody').empty();
  }

  //Game Flow Functions
  playGame() {
    var ender = this.endGame.bind(this);

    this.setupGame();
    this.runGame(ender);
  }

  setupGame() {
    this.clearTerminal();
    $('#gamestats').show();
    $('input').show();
    $('#side').hide();
    this.setState({charCount: 0});
    this.setState({timeLeft: 9});
  }

  runGame(cb) {
    var time = 10;
    var runner = function() {
        $('#playing').toggle();
        if (time === 1) {
          clearInterval(ticker);
          cb();
        } else {
          time--;
          this.setState({timeLeft: this.state.timeLeft - 1})
        }
    };
    runner = runner.bind(this);

    var ticker = setInterval(runner, 1000);
  }

  endGame() {
    alert('Great job' + this.state.playerName + '! \n \n You scored' + (this.state.charCount) + 'points！ ﾍ(=￣∇￣)ﾉ');
    //send the data to the data base

    $.ajax({
      method: 'POST',
      url: '/scores', 
      data: JSON.stringify({name: this.state.playerName, score: this.state.charCount}),
      contentType: 'application/json',
      success: (data) => {  
      console.log(data);
      },
      error: (err) => {
        console.log('ERR', err);
      }
    });

    this.setState({charCount: 0})
    $('#gamestats').hide();
    $('input').val('');
    $('input').hide();
    $('#side').show();
    this.clearTerminal();
  }

  //Data Retrieval
  getData () {
    $.ajax({
      url: '/scores', 
      success: (data) => {   
      console.log('DATA RECEIVED', data);
        this.setState({
          scores: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    this.changeName();
    $('input').hide();
    $('#gamestats').hide();
    $('#terminalbody').append('Hello, and welcome to RAGE(●o≧д≦o)TYPE!' +
      'Click the START button to begin a game. You\'ll have 10 seconds to click on the INPUT BOX ' +
      'and type as much much and as fast as you can. It does not matter what you type, it ' +
      'can be complete gibberish. Just button-mash your way to score board!'
    );
    var getter = this.getData;
      
    setInterval(getter, 1000);
  }

  render () {
    return (<div>
      
      <header>
        <h1>RAGE(●o≧д≦o)TYPE!</h1>
        <h3>Welcome, {this.state.playerName}! Let's Rage!</h3>
      </header>

      <div id="main">
        <Terminal addChars={this.addToCharCount} />
      </div>

      <div id="gamestats">
        
        <p>{this.state.timeLeft} seconds remaining</p>
        <p>{this.state.charCount} Points</p>
        <p id="playing">Game in Progress! You can do it!</p>
      </div>

      <div id="side">
        <Controls showCredits={this.showCredits} playGame={this.playGame} changeName={this.changeName} toggleScoreBoard={this.toggleScoreBoard} clearTerminal={this.clearTerminal}/>
        <ScoreBoard scores={this.state.scores}/>
      </div>
    </div>)
  }

}

ReactDOM.render(<App />, document.getElementById('app'));