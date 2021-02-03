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

class GrantAcces extends React.Component{
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
    }    
}