import React from 'react';
import './App.css';
import Grid from './components/Grid'

export default class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Grid/>
        </header>
      </div>
    );
  }
}
