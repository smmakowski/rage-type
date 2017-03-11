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
      playerName: ''
    }

    this.changeName = this.changeName.bind(this);
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

  componentDidMount() {

  this.changeName();
    
  // get highscores from db
    $.ajax({
      url: '/items', 
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

      </header>

      <div id="main">
        <Terminal items ={this.state.items}/>
      </div>

      <div id="side">
        <ScoreBoard items={this.state.items}/>
        <Controls changeName={this.changeName}/>
      </div>
      

    </div>)
  }


}

ReactDOM.render(<App />, document.getElementById('app'));