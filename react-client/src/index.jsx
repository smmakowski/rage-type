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
      playerName: '',
      timeLeft: 66,
      charCount: 0
    }

    this.changeName = this.changeName.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.addToCharCount = this.addToCharCount.bind(this);
    this.playGame = this.playGame.bind(this);
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

  addToCharCount () {
    this.setState({charCount: this.state.charCount + 1});
    $('input').val('');
  }

  playGame() {
    $('p').show();
    this.setState({charCount: 0});
    this.setState({timeLeft: 66});

    this.runTimer();

  }


  runTimer() {
      setTimeout(function(){
        this.setState({timeLeft: this.state.timeLeft - 1});
      }, 1000);        
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
        <Terminal addChars={this.addToCharCount} items={this.state.items}/>
      </div>

      <div id="side">
        <Controls playGame={this.playGame} changeName={this.changeName}/>
        <ScoreBoard items={this.state.items}/>
      </div>
      

    </div>)
  }


}

ReactDOM.render(<App />, document.getElementById('app'));