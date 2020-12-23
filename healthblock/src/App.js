import logo from './logo.svg';
import './App.css'
import Healthblock from './build/contracts/Healthblock.json'
import Web3 from 'web3'
import React, { Component } from 'react'
import web3obj from './healthblock'
class App extends Component {
  async componentWillMount() {
    const obj = new web3obj()
    await obj.loadWeb3()
    await obj.loadBlockchainData()
    this.setState({ account: obj.account })
    this.setState({user:obj.user.name})
    this.setState({role:obj.user.role})
  }


  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      user:null,
      role:null,
      buffer: null,
      account: '',
      dvideo: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null
    }
  }

  render() {
    return (
      <div>
        {this.state.account}
        {this.state.user}
      </div>
    );
  }
}
export default App;