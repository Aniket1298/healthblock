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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CenteredGrid from './components'
import Navbar from './navbar'
import PresCard from './PresCard'
function ReportCount(props){
  if (props.count==0){
    return <h1>No Prescription</h1>
  }
  else if (props.count==1){
    return <h1>1 Prescription </h1>
  }
  else{
    return <h1>{props.count} {" "}Prescription</h1>
  }
}
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


function ReportList(props) {
    var Reports = props.Pres;
    var index=1;
    console.log("length",props.Pres)
    const listItems = Reports.map((Report) =>
        <div className="row">
              {PresCard(index++,Report[0],Report[1],Report[2])}
              <br/>
              <br/>
        </div>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
class PatientPrescriptions extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            account:null,
            hashes:[],
            report_count:0,
            prescriptions:[],
        }
        this.getData=this.getData.bind(this);
        this.getData()
    }
    async componentWillMount(){
        const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      var hashes
      if (obj.user.role=="doctor"){
          hashes = await contract.methods.getAllPres(obj.account).call()
      }
      if (obj.user.role=="patient"){
           hashes = await contract.methods.getpres(obj.account).call()
      
      }
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account,report_count:hashes.length,hashes:hashes,})
      var temp=[]
      for (var i=0;i<this.state.hashes.length;i++){
            var pres = await obj.contract.methods.presmap(this.state.hashes[i]).call()
            temp.push([pres.owner,pres.patient_to,pres.pres_hash])
          } 
      this.setState({prescriptions:temp})

    }
    async getData(){
      console.log()
    }
    render(){
          const  classes  = useStyles
        return(
            <div className="PresPage" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
                <Navbar/>
                <div className="Header">
                      <h1>
                        {this.state.name}, Prescriptions
                      </h1>
                      <ReportCount count ={this.state.report_count}/>
                      &nbsp;
                </div>
                <div style={{ marginLeft:"25%"}}>
                <ReportList Pres={this.state.prescriptions} />
                </div>
            </div>
        )
    }
}

export default withRouter(PatientPrescriptions);