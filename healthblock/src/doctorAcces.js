
import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

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
class GrantAccess extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            hash:null,
            doc_address:null,
            account:null,
            hashes:[],
            errors:null,
            report_count:0,
        }
        this.getData=this.getData.bind(this);
        this.handleHash=this.handleHash.bind(this)
        this.handleDocAddress=this.handleDocAddress.bind(this)
        this.handleGrant=this.handleGrant.bind(this)
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
    
    handleHash(event){
      this.setState({hash:event.target.value})
    }
    handleDocAddress(event){
      
      this.setState({doc_address:event.target.value})
    }
    async handleGrant(){
      //console.log(this.state.hash+" data "+this.state.doc_address)
      //alert(this.state.hash+"  "+this.state.doc_address)
      const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const status=await obj.contract.methods.grantAccess(this.state.hash,this.state.doc_address).send({from:this.state.account})
      alert("Status ",status)
    }
    async getData(){
    const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
    }
    render(){
        const  classes  = useStyles
      return(
          <div className="Main">
              <Navbar/>
              <div className="Header">
                    <h1>
                      Grant Report Access to Doctor
                    </h1>
                    <div className="FormSection">
                      <Card>
                        <CardContent>
                        <p>{this.state.error}</p>
                        <form className={classes.root} noValidate autoComplete="off">
                        <TextField value={this.state.hash} id="standard-basic" label="Hash" onChange={this.handleHash}/>
                        <br/>
                        <TextField value={this.state.doc_address} id="standard-basic" label="Doctor's Address"  onChange={this.handleDocAddress}/>
                        <br/>
                    </form>
                    <br/>
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={this.handleGrant}>
                      submit
                    </Button>
                          </CardContent>
                      </Card>
                    </div>
              </div>
              
          </div>
      )
  }
}
export default withRouter(GrantAccess);

