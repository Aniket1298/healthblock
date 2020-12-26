import logo from './logo.svg';
import './App.css'
import Healthblock from './build/contracts/Healthblock.json'
import Web3 from 'web3'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import web3obj from './healthblock'
import RegisterPage from './register'
import UploadPage from './upload'
class App extends Component {
  async componentDidMount() {
    
    const obj = new web3obj()
    await obj.loadWeb3()
    await obj.loadBlockchainData()
    this.obj=obj
    if (obj.user){ 
      console.log("AACCCUNT",obj.account,"Name",obj.user.name)
    this.setState({ account: obj.account })
    this.setState({user:obj.user.name})
    this.setState({role:obj.user.role})
    this.props.history.push({pathname:'/upload',obj:this.obj})
    } 
    else{
      this.props.history.push({pathname:'/register',obj:this.obj})
      }
    }
  constructor(props) {
    super(props)
    this.state = {
      user:null,
      role:null,
      account: '',
      loading: true,
    }
    this.obj=null;
  }

  render() {
    return (
      <div className="HomePage" style={{marginLeft:"40%",marginTop:"5%",}}>
        <h3>{this.state.account}</h3>
        <h3> Name  {this.state.user}</h3>
        <h3> Role  {this.state.role}</h3>
        <UploadPage obj={this.obj}/>
      </div>
    );
  }
}
export default withRouter(App);
