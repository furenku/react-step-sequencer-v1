import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import kick from './samples/kick.wav';
import snare from './samples/snare.wav';
import hihat from './samples/hihat.ogg';

const SamplePlayer = React.forwardRef((props,ref) => {
  let audio;
  return (
    <audio ref={ref} src={props.src} controls/>
  )

})


class App extends Component {

  
  samples = []
  
  constructor(props) {
    super(props);
    let n = 16;
    this.beats = Array.apply(null, {length: n}).map(Number.call, Number)

    console.log(this.beats);

    this.samplers = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ]

    this.samples[0] = kick;
    this.samples[1] = snare;
    this.samples[2] = hihat;
    
  }
  

  componentDidMount() {
    // this.play()    
  }

  componentWillUnmount() {

    this.stop();
  
  }


  handleKeyPress = (event) => {
    if(event.key == 'a'){
      this.trigger(this.samplers[0].current)
    }
    if(event.key == 'b'){
      this.trigger(this.samplers[1].current)
    }
    if(event.key == 'c'){
      this.trigger(this.samplers[2].current)
    }
  }
 
  trigger = audio => {
    audio.currentTime = 0
    audio.play()
  }

  play() {
    let i = 0;
    
    if( ! this.timer ) {

      this.timer = setInterval( () => {
        this.samplers[i].current.play();
        i++;
        i%=this.samplers.length;
      }, 500)

    }

  }

  stop() {
    
    clearInterval( this.timer );
    this.timer = null

  }

  clickBeatButton( i ) {
    console.log(i);
    
  }

  render() {
    let samplePlayers = this.samples.map( ( sample, i ) => {
      
      return <SamplePlayer key={i} ref={this.samplers[i]} src={this.samples[i]}/>
        
    })


    let beatButtons = this.beats.map( n => <button onClick={ () => this.clickBeatButton(n) }>{n}</button>)

    return (
      <div>
        {samplePlayers}
        <input type="text" id="one" onKeyPress={this.handleKeyPress} />
        <button onClick={()=>this.play()}>Play</button>
        <button onClick={()=>this.stop()}>Stop</button>

        <div>
          {beatButtons}
        </div>
      </div>
    );
  }
}

export default App;
