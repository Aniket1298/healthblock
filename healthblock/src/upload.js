import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class UploadPage extends Component{
    constructor(props){
        super(props)
        this.state={
            report_name:null,
            buffer:null,
            name:null,
            role:null,
            account:null,
        }
        
        this.uploadReport=this.uploadReport.bind(this)
        this.captureFile = this.captureFile.bind(this)
        this.setData= this.setData  .bind(this)
        this.setData()
    }
    async setData(){
      const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      var account = obj.account
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
      const count = await contract.methods.report_count().call()
      console.log("REPORT COUNT",count)
      const files = await contract.methods.reportlist(0).call()
      console.log("FILES and")
      console.log(files)
      console.log(files.reports)

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
    async uploadReport (title) {
      console.log("IPFS",ipfs)
        const obj = new web3obj()
        await obj.loadWeb3()
        await obj.loadBlockchainData()
        const contract = obj.contract
        console.log("Submitting file to IPFS...")
        console.log(contract)
        var account = obj.account
        alert(account)
        const file =await ipfs.add(this.state.buffer, (error, result) => {
          console.log('IPFS result', result)
          if(error) {
            console.error(error)
            return
          }
      })
      console.log(file)
      console.log(file.path)
      const hash= file.path
      console.log("HASH")
      console.log(title,hash)
      await obj.upload(title,hash)
      this.props.history.push("/")
      }
      render(){
          return(
          <div className="uploadReport" style={{marginLeft:"40%",marginTop:"7%", }}>
            <h3>Address {this.state.account}</h3>
            <h3>Name  {this.state.name}</h3>
            <h3>Role {this.state.role}</h3>
              <h5><b>Upload Report  </b></h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.report_name.value
              this.uploadReport(title)
            }} >
              &nbsp;
              <input type='file' accept=".jpg,.pdf,.png,.jpg,.jpeg" onChange={this.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { this.report_name = input }} 
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm">Upload!</button>
              &nbsp;
            </form>
              </div>
          );
      }
    
}
export default withRouter(UploadPage);
