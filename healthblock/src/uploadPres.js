import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar'
import Button from '@material-ui/core/Button';

const useStyles = theme =>({
    root: {
      minWidth: 400,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class UploadPres extends Component{
    constructor(props){
        super(props)
        this.state={
            buffer:null,
            name:null,
            role:null,
            account:null,
            title:null,
            patient_to:null,
            hash:null,
        }
        this.uploadPres=this.uploadPres.bind(this)
        this.captureFile = this.captureFile.bind(this)
        this.setData= this.setData.bind(this)
        this.handlePatient = this.handlePatient.bind(this)
        this.setData()
    }
    async setData(){
      const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      var account = obj.account
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
      
    }
    handlePatient(event){
        this.setState({patient_to:event.target.value})
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
    async uploadPres () {
        const obj = new web3obj()
        await obj.loadWeb3()
        await obj.loadBlockchainData()
        const contract = obj.contract
        var account = obj.account
        const file =await ipfs.add(this.state.buffer, (error, result) => {
          console.log('IPFS result', result)
          if(error) {
            console.error(error)
            return
          }
      })
      var hash=file.path
      await obj.contract.methods.uploadPres(hash,this.state.patient_to,this.state.account).send({from:this.state.account}).then(
        this.props.history.push("/")  
      )
      }
      render(){
          const classes = useStyles
          return(
          <div className="Main">
            <Navbar/>
            <div className="Header">
            <h1>Upload Prescription  </h1>
            <div className="FormSection">
              <Card className={classes.root}>
                  <CardContent>
                      <form >
                          <TextField value={this.state.patient_to} id="standard-basic" label="Patient's Address" onChange={this.handlePatient}/>
                          <br/>
                          <br/>
                          <input type='file' accept=".jpg,.pdf,.png,.jpg,.jpeg" onChange={this.captureFile} />         
                      </form>
                      <br/>
                      <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={this.uploadPres}>
                      submit
                      </Button>
                  </CardContent>
              </Card>
            </div>
            </div>
              </div>
          );
      }
    
}
export default withRouter(UploadPres);