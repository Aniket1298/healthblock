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
import "./App.css"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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


class DoctorPage extends Component {
  async componentDidMount() {
    
    const obj = new web3obj()
    await obj.loadWeb3()
    await obj.loadBlockchainData()
    this.obj=obj
    var t1=performance.now()
    var something=await obj.contract.methods.getDocData(obj.account).call()
    //console.log("Time to get User data",performance.now()-t1)
    //console.log("THIS is doc'sdata",something)
    if (obj.user){ 
        this.setState({ account: obj.account })
        this.setState({user:obj.user.name})
        this.setState({role:obj.user.role})
        if (this.state.role=="provider" || this.state.role=="Provider"){
            this.props.history.push({pathname:'/provider'})
        }
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
    const  classes  = useStyles
    return (
      <div className="Main">
        <Navbar/>
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
              <Button  onClick={()=> this.props.history.push({pathname:'/uploadpres',obj:this.obj})} variant="contained" color="primary" >
                Upload Prescription
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;    
              &nbsp;    
              <Button onClick={()=> this.props.history.push({pathname:'/dreports',obj:this.obj})} variant="contained" color="primary">
                Reports
              </Button>
              &nbsp;
              &nbsp;
               &nbsp;
              &nbsp;
              <Button onClick={()=> this.props.history.push({pathname:'/patpres',obj:this.obj})} variant="contained" color="primary">
                Prescriptions
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
export default withRouter(DoctorPage);
