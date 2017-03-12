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
    alert('Stephen Makowskiの一つのHack ReactorのMVPプロジェクトです.' +
      '使ったテック: React, Express, MongoDB, や Node' +
      '(を使ったかどうか,  ^-^) \n \n' +
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
    this.setState({charCount: this.state.charCount + 5711});

    var line = lines[Math.floor(Math.random() * lines.length)];
    var $termBody = $('#terminalbody');
    $termBody.append(line);
    
    if ($input.val().length > 50) {
      $input.val('');
    }
    
  }

  clearTerminal () {
    $('#terminalbody').empty();
    $('terminalbody').append('ゲムスタートを待っています.')
  }

  //Game Flow Functions
  playGame() {
    var ender = this.endGame.bind(this);
    var requester = this.getData.bind(this);

    this.setupGame();
    this.runGame(function() {
      ender(requester);
    });
  }

  setupGame() {

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

  endGame(cb) {
    alert('おめでとうございます!' + this.state.playerName + 'さん!' + (this.state.charCount) + 'のキャラをタイプしはした！ ﾍ(=￣∇￣)ﾉ');
    //send the data to the data base

    $.ajax({
      method: 'POST',
      url: '/scores', 
      data: JSON.stringify({name: this.state.playerName, score: this.state.charCount}),
      contentType: 'application/json',
      success: (data) => {  
      console.log(data);
      cb();
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
    $('input').hide();
    $('#gamestats').hide();
    $('#terminalbody').append('こんにちは!楽しみのために\"ゲームをスタート\"のボタンを押してください' +
      'ボタンを押すと10秒がなく前にINPUTボックスをクリックして早く何もしてタイプをしてください'
    );
    var getter = this.getData;
      
      setInterval(getter, 1000);

  }

  render () {
    return (<div>
      
      <header>
        <h1>レージ(●o≧д≦o)タイプ!</h1>
        <h3>よこそ, {this.state.playerName}! レージしよう!</h3>
      </header>

      <div id="main">
        <Terminal addChars={this.addToCharCount} />
      </div>

      <div id="gamestats">
        
        <p>{this.state.timeLeft}秒が残ります</p>
        <p>{this.state.charCount} ポイント!</p>
        <p id="playing">ゲム中です! 頑張って</p>
      </div>

      <div id="side">
        <Controls showCredits={this.showCredits} playGame={this.playGame} changeName={this.changeName} toggleScoreBoard={this.toggleScoreBoard} clearTerminal={this.clearTerminal}/>
        <ScoreBoard scores={this.state.scores}/>
      </div>
    </div>)
  }

}

ReactDOM.render(<App />, document.getElementById('app'));