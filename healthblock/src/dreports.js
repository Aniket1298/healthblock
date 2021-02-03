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
import  ReportCard from './ReportCard'
function ReportCount(props){
  if (props.count==0){
    return <h1>No Reports</h1>
  }
  else if (props.count==1){
    return <h1>1 Report </h1>
  }
  else{
    return <h1>{props.count} {" "}Reports</h1>
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
    var Reports = props.Reports;
    var index=1;
    console.log("length",props.Reports)
    const listItems = Reports.map((Report) =>
        <div className="row">
              {ReportCard(index++,Report[0],Report[1],Report[2])}
        </div>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
class DoctorReports extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            account:null,
            hashes:[],
            report_count:0,
            reports:[],

        }
        this.getData=this.getData.bind(this);
        this.getData()
    }
    async componentWillMount(){
        const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      const reports = await contract.methods.getReportDoctor(obj.account).call()
      console.log("REPortS",reports[0])
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account,report_count:reports.length,hashes:reports,})
      var temp=[]
      for (var i=0;i<this.state.hashes.length;i++){
            var report = await obj.contract.methods.reports(this.state.hashes[i]).call()
            temp.push([report.owner,report.name,report.report_hash])
          } 
      this.setState({reports:temp})

    }
    async getData(){
      console.log()
    }
    render(){
          const  classes  = useStyles
          console.log("Render",this.state.reports[0])
        return(
            <div className="ReportsPage" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
                <Navbar/>
                <Button onClick={()=> this.props.history.push({pathname:'/uploadpres',obj:this.obj})} color="inherit"><h4>Upload Prescription</h4></Button>
                <div className="Header">
                      <h1>
                        {this.state.name}, Reports assigned
                      </h1>
                      <ReportCount count ={this.state.report_count}/>
                      &nbsp;
                </div>
               
                <div style={{ marginLeft:"25%"}}>
                <ReportList Reports={this.state.reports} />
                </div>
            </div>
        )
    }
}

export default withRouter(DoctorReports);
