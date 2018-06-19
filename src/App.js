import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import kick from './samples/kick.wav';
import snare from './samples/snare.wav';
import hihat from './samples/hihat.ogg';


const SamplePlayer = React.forwardRef((props, ref) => {
  return (
    <audio src={props.src} ref={ref} controls/>
  )
})


class App extends Component {

  samples = [
    kick,
    snare,
    hihat
  ];

  samplePlayerRefs = [];

  handleKeyPress = (event) => {
    
    const indexes = {
      'a': 0,
      'b': 1,
      'c': 2,
    }

    let index = indexes[event.key];
    
    if( index != undefined ) {
      
      let audio = this.samplePlayerRefs[index].current;
      
      this.trigger( audio )
      
    }
 }

  trigger = audio => {
    audio.currentTime = 0;
    audio.play();
  }

  render() {

    let samplePlayers = this.samples.map( ( sample, i ) => {
      
      this.samplePlayerRefs[i] = React.createRef()
      
      return <SamplePlayer
        key={i}
        src={sample}
        ref={this.samplePlayerRefs[i]}
      />

    })

    console.log( samplePlayers )

    return (
      <div>
        
        {samplePlayers}
        
        <input type="text" onKeyPress={this.handleKeyPress} />

      </div>
    );
  }
}

export default App;

