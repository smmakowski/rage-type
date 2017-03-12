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
      timeLeft: 9,
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
    if (name === '' || !name) {
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
    this.setState({charCount: this.state.charCount + 1});

    var line = lines[Math.floor(Math.random() * lines.length)];
    var $termBody = $('#terminalbody');
    $termBody.append(line);
    
    if ($input.val().length > 50) {
      $input.val('');
    }
    
  }

  clearTerminal () {
    $('#terminalbody').empty();
  }

  //Game Flow Functions
  playGame() {
    var requester = this.getData;
    this.setupGame();
    this.runGame(this.endGame);
  }

  setupGame() {
    $('#board').hide();
    $('p').show();
    this.setState({charCount: 0});
    this.setState({timeLeft: 9});
  }

  runGame(cb) {
    var time = 9;
    var runner = function() {
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
    alert('Congratz ' + this.state.playerName + ', you typed ' + this.state.charCount + ' characters');
    //send the data to the data base

    //grab data and rerender high score board

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
    $('p').hide();
    $('#board').show();
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
  $('p').hide();
  this.changeName();
    
  // get highscores from db
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

  render () {
    return (<div>
      
      <header>
        <h1>レージ(●o≧д≦o)タイプ!</h1>
        <h3>よこそ, {this.state.playerName}! レージしよう!</h3>
        <p>ゲム中です!　頑張って</p>
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