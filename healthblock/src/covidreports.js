
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
import Navbar from './navbar'
import MuiAlert from '@material-ui/lab/Alert';

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
    var hashes = props.hashes;
    var index=1;
    const listItems = hashes.map((hash) =>
        <div className="row" style={{alignContent:"center",alignItems:"center"}}>
              {CenteredGrid(index++,hash[0],hash[1])}
        </div>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
class CovidReportsPage extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            account:null,
            hashes:[],
            user_reports:0,
            report_count:0,
        }
        this.getData=this.getData.bind(this);
        this.getData()
    }
    async componentWillMount(){
        const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
      var report_count =  await contract.methods.provider_report().call()
      //alert("REPR"+report_count)
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account,report_count:report_count})
      console.log("REPORTS HASHES in mount",report_count)
      var file = null
      var arr=[]
      for (let i=0;i<report_count;i++){
        var t1=performance.now()
        file = await contract.methods.covid_report_list(i).call()
        console.log("Retrieval Time",performance.now()-t1)
        //alert(file.report_hash)
        if (file.owner==this.state.account){
            this.state.user_reports+=1
            arr.push([file.name,file.report_hash])
        }
      }
      this.setState({hashes:arr})
      console.log("hashes",this.state.hashes)
        
    }
    async getData(){
    const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
      const report_count =  await contract.methods.provider_report().call()
      const name = await contract.methods.name().call()
      //alert(report_count)
      console.log("REPORTS in get data",report_count)
      var file = null
      for (let i=0;i<report_count;i++){
        file = await contract.methods.covid_report_list(i).call()
        if (file.owner==this.state.account){
            this.state.user_reports+=1
            this.state.hashes.push([file.name,file.report_hash])
        }
      }
      console.log("hashes",this.state.hashes)
    }
    render(){
          const  classes  = useStyles
          console.log(classes.root  )
        return(
            <div className="ReportsPage" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
                <div className={classes.root}>
                 <Navbar/>
                </div>
                <div className="Header">
                      
                      <h1>
                        {this.state.name},Your  Datasets
                      </h1>
                      
                      &nbsp;
                </div>
                <div style={{ marginLeft:"34%"}}>
                <ReportList hashes={this.state.hashes} />
                </div>
                
            </div>
        )
    }
}

export default withRouter(CovidReportsPage);
