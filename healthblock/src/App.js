import logo from './logo.svg';
import './App.css'
import Healthblock from './build/contracts/Healthblock.json'
import Web3 from 'web3'

import Button from '@material-ui/core/Button';

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
  onUpload(event){
    this.props.history.push({pathname:'/upload',obj:this.obj})

  }

  render() {
    return (
      <div className="HomePage" style={{marginLeft:"40%",marginTop:"5%",}}>
        <h3>{this.state.account}</h3>
        <h3> Name  {this.state.user}</h3>
        <h3> Role  {this.state.role}</h3>
        <Button onClick={()=> this.props.history.push({pathname:'/upload',obj:this.obj})} variant="contained" color="primary" href="#contained-buttons">
        Upload Report
      </Button>
      <br></br>
      <br></br>
      <Button onClick={()=> this.props.history.push({pathname:'/reports',obj:this.obj})} variant="contained" color="primary" href="#contained-buttons">
        Reports
      </Button>
      </div>
    );
  }
}
export default withRouter(App);
