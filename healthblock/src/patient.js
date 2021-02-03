import logo from './logo.svg';
import './App.css'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import React, { Component } from 'react'
import web3obj from './healthblock'
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
import Navbar from './navbar'
class PatientPage extends Component{
    constructor(props){
        super(props)
        this.state={
            report_name:null
        }
        alert(this.props.hel)
        this.uploadReport=this.uploadReport.bind(this)
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
    uploadReport = title => {
        const obj = new web3obj()
        await obj.loadWeb3()
        await obj.loadBlockchainData()
        const contract = obj.contract
        console.log("Submitting file to IPFS...")
        const account = obj.account
        ipfs.add(this.state.buffer, (error, result) => {
          console.log('IPFS result', result)
          if(error) {
            console.error(error)
            return
          }
    
          this.setState({ loading: true })
          contract.methods.uploadReport(title,result[0].hash).send({ from: account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        })
      }
    
      changeVideo = (hash, title) => {
        this.setState({'currentHash': hash});
        this.setState({'currentTitle': title});
      }
    
}
export default withRouter(PatientPage);
