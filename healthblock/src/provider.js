import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'


import logo from './logo.svg';
import './App.css'
import Healthblock from './build/contracts/Healthblock.json'
import Web3 from 'web3'

import RegisterPage from './register'
import UploadPage from './upload'
import "./App.css"

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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


class ProviderPage extends Component {
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
    const  classes  = useStyles
    return (
      <div className="HomePage" style={{  background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
        <div className={classes.root}>
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      
                      <Button onClick={()=> this.props.history.push({pathname:'/',obj:this.obj})} color="inherit"> <h3>Healthblock</h3>   </Button>
                    </Toolbar>
                  </AppBar>
                </div>
        <div class="typewriter">
          <h1>Securing HealthCare Data.</h1>
        </div>
        <div className="Header">
              <h1>
                Welcome {this.state.user}
              </h1>
        </div>
        
        &nbsp;
        <div className="MainPageContent" >
              <h3> Address {this.state.account}</h3>

              <div className="row">
              <Button  onClick={()=> this.props.history.push({pathname:'/covidupload',obj:this.obj})} variant="contained" color="primary" >
                Upload Covid Reports
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              
              <Button onClick={()=> this.props.history.push({pathname:'/covidreports',obj:this.obj})} variant="contained" color="primary">
                Reports
              </Button>
              </div>
              &nbsp;     
        </div>
        &nbsp;
        &nbsp;
      </div>
    );
  }
}
export default withRouter(ProviderPage);