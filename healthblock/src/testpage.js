import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'

class TestPage extends React.Component{
    render(){
        return(
            <div>
                <h2>Hello world</h2>
            </div>
        )
    }
}
export default withRouter(TestPage);
