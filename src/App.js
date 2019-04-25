import React, { Component } from 'react';


import Logs from './pages/logs';




class App extends Component {
  constructor(){
    super()
    this.state = {
      data: []
    }
    console.log(this.state.data)
  }
  

  // componentDidMount(){
  //   fetch("https://raw.githubusercontent.com/react-native-village/react-native-init/master/stargate/stargate.json").then((answer)=>{
  //     return answer.json()
  //   }).then((complete)=>{
  //     this.setState({data:complete})
  //     console.log(this.state.data)
  //   }).catch((err)=>{
  //     console.log("Error")
  //   })
  // }

  render() {
    return (
      <Logs/>
    );
  }
}
export default App;
