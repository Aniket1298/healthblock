
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
        <div className="row">
        {CenteredGrid(index++,hash[0],hash[1])}
        </div>
              
    );
    return (
      <ul>{listItems}</ul>
    );
  }
class ReportsPage extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            account:null,
            hashes:[],
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
      const report_count =  await contract.methods.report_count().call()
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account,report_count:report_count})
      console.log("REPORTS",report_count)
      var file = null
      var arr=[]
      for (let i=0;i<report_count;i++){
        file = await contract.methods.reportlist(i).call()
        if (file.owner==this.state.account){
            arr.push([file.name,file.report_hash])
        }
      }
      this.setState({hashes:arr})
      //console.log("hashes",this.state.hashes)
    }
    async getData(){
    const obj = new web3obj()
      await obj.loadWeb3()
      await obj.loadBlockchainData()
      const contract = obj.contract
      this.setState({name:obj.user.name,role:obj.user.role,account:obj.account})
      const report_count =  await contract.methods.report_count().call()
      console.log("REPORTS",report_count)
      var file = null
      var t1=performance.now()
      for (let i=0;i<report_count;i++){
        file = await contract.methods.reportlist(i).call()
        if (file.owner==this.state.account){
            this.state.hashes.push([file.name,file.report_hash])
        }
      }
      console.log("Retrieval time",performance.now()-t1)
      console.log("hashes",this.state.hashes)
    }
    render(){
          const  classes  = useStyles
        return(
            <div className="ReportsPage" style={{ background:"linear-gradient(#C9D6FF,#E2E2E2)", width:"100%" ,height:"1000px"}}>
                <Navbar/>
                <Button onClick={()=> this.props.history.push({pathname:'/grantaccess',obj:this.obj})} color="inherit"><h4>Grant Access</h4></Button>
                <div className="Header">
                      <h1>
                        {this.state.name},Your medical reports
                      </h1>
                      <ReportCount count ={this.state.report_count}/>
                      &nbsp;
                </div>
               
                <div style={{ marginLeft:"25%"}}>
                <ReportList hashes={this.state.hashes} />
                </div>
            </div>
        )
    }
}

export default withRouter(ReportsPage);
