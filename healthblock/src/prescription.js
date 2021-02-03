import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CenteredGrid from './components'
import Navbar from './navbar'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

class AddPrescription extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            buffer:null,
            patient_address:null,
            account:null,
            hashes:[],
            errors:null,
            report_count:0,
        }
        this.getData=this.getData.bind(this);
        this.handleAddress=this.handleAddress.bind(this)
        this.captureFile=this.captureFile.bind(this)
        this.handleUpload=this.handleUpload.bind(this)
        this.getData()
    }
    async componentWillMount(){
        const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract                               
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account,})
      //console.log("hashes",this.state.hashes)
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
    handleAddress(event){
      this.setState({patient_address:event.target.value})
    }
    handleDocAddress(event){
      this.setState({doc_address:event.target.value})
    }
    handleUpload(){
      alert(this.state.patient_address+ "  "+this.state.buffer)
    }
    async getData(){
    const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
    }
    render(){
      const classes = useStyles
      return(
        <div className="Pres">
          <Navbar/>
          <div className="Header">
            <h1>
              Upload Prescription
            </h1>
            <p>{this.state.error}</p>
            <form className={classes.root}>
              <TextField value={this.state.patient_address} id="standard-basic" label="Address" onChange={this.handleAddress}/>
              <br/>
              <br/>
              <input type='file' accept=".jpg,.pdf,.png,.jpg,.jpeg" onChange={this.captureFile} style={{ width: '100px' }} />         
              </form>
              <Button size="small" className={classes.margin} color="primary" onClick={this.handleUpload}>
                  Submit
              </Button>
              </div>
        </div>
        
      )
    }
    
}
export default withRouter(AddPrescription);

