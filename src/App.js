import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import kick from './samples/kick.wav';
import snare from './samples/snare.wav';

const SamplePlayer = React.forwardRef((props,ref) => {
  let audio;
  return (
    <audio ref={ref} i={props.i} src={props.src} controls onEnded={props.onEnded(props.i)}/>
  )

})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: []
    }
    this.samplers = [
      React.createRef(),
      React.createRef(),
    ]
    
  }
  

  componentDidMount() {
    let i = 0;
    this.timer = 
      setInterval( () => {
        this.samplers[i].current.play();
        i++;
        i%=2;
      }, 500)
    
  }


  onEndedHandler = (i) => {
    console.log(this.samplers[i].current);
  }
  render() {
    

    return (
      <div>
        <SamplePlayer ref={this.samplers[0]} i={0} src={kick} onEnded={this.onEndedHandler}/>
        <SamplePlayer ref={this.samplers[1]} i={1} src={snare} onEnded={this.onEndedHandler}/>
      </div>
    );
  }
}

export default App;
