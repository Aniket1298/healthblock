import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import web3obj from './healthblock'
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'

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



class RegisterPage extends Component{
    constructor(props){
        super(props)
        this.state={
            role:'Patient',
            name:'',
            errors:'',
        }  
        this.handleSubmit=this.handleSubmit.bind(this)
        this.nameChange=this.nameChange.bind(this)
        this.roleChange=this.roleChange.bind(this)
    }
    nameChange(event){
        this.setState({name:event.target.value})
        console.log(this.state.name,event.target.value)
    }
    roleChange(event){
        this.setState({role:event.target.value})
        //console.log(this.state.role,event.target.value) 
    }
    async handleSubmit(event){
        //await web3obj.register(this.state.name,this.state.role)
        const obj = this.props.location.obj
        //alert(obj.account)
        //alert(this.state.name,this.state.role)
        await obj.register(this.state.name,this.state.role).then(
          this.props.history.push('/')

        )
        this.props.history.push('/')
      }
    
    render(){
        const classes = makeStyles()
        return(
            <div className="register" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
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
              <div className="Register" style={{alignContent:"center",alignItems:"center",textAlign:"center"}}>
              <h1>{this.state.errors}</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:{"  "}
                        <input type="text" onChange={this.nameChange} />
                        </label>
                        {"         "}
                        <select onChange={this.roleChange}>
                        <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Provider">Provider</option>
                        </select>
                        {"         "}
                        <input type="submit" value="Submit" />
                    </form>                   
                </div>
              </div>
                      
            </div>  
            
        );
    }
}


export default withRouter(RegisterPage);
