import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import web3obj from './healthblock'
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
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
        console.log(this.state.role,event.target.value) 
    }
    async handleSubmit(event){
        //await web3obj.register(this.state.name,this.state.role)
        const obj = this.props.location.obj
        alert(obj.account)
        obj.register(this.state.name,this.state.role)
        this.props.history.push('/')
        }
    
    render(){
        return(
            <div className="register">
                <h1>{this.state.errors}</h1>
                
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                        <input type="text" onChange={this.nameChange} />
                        </label>
                        {"         "}
                        <select onChange={this.roleChange}>
                        <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                            
                        </select>
                        {"         "}
                        <input type="submit" value="Submit" />
                    </form>                   
                </div>      
            </div>  
            
        );
    }
}


export default withRouter(RegisterPage);
