import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CenteredGrid from './components'

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


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class CovidReportUploadPage extends Component{
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
      const count = await contract.methods.provider_report().call()
      //console.log("REPORT COUNT",count)
      //const files = await contract.methods.covid_report_list(0).call()
      //console.log("FILES and")
      //console.log(files)
      //console.log(files.reports)

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
   
        const obj = new web3obj()
        await obj.loadWeb3()
        await obj.loadBlockchainData()
        const contract = obj.contract
        console.log("Submitting file to IPFS...")
        console.log(contract)
        var account = obj.account
        //alert(account)
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
      console.log(obj)
      console.log(title,hash)
      await obj.uploadCovidReport(title,hash)
      
      this.props.history.push("/")
      }
      render(){
          const classes = makeStyles()
          return(
          <div className="uploadReport" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
            <div className={classes.root}>
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Button onClick={()=> this.props.history.push({pathname:'/',obj:this.obj})} color="inherit"><h3>Healthblock</h3></Button>
                    </Toolbar>
                  </AppBar>
              </div>
            <div className="UploadSection">
              <h3>Upload Report  </h3>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.report_name.value
              this.uploadReport(title)
            }} >
              &nbsp;
              <input type='file' accept=".csv" onChange={this.captureFile} style={{ width: '250px' }} />
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
            
              </div>
          );
      }
    
}
export default withRouter(CovidReportUploadPage);
