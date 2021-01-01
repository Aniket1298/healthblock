
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
  
class ReportsPage extends Component{
    constructor(props){
        super(props)
        this.state={
            name:null,
            role:null,
            account:null,
            hashes:[],
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
      console.log("REPORTS",report_count)
      var file = null
      var arr=[]
      for (let i=0;i<report_count;i++){
        file = await contract.methods.reportlist(i).call()
        if (file.owner==this.state.account){
            arr.push([file.name,"https://ipfs.infura.io/ipfs/"+file.report_hash])
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
      const report_count =  await contract.methods.report_count().call()
      console.log("REPORTS",report_count)
      var file = null
      for (let i=0;i<report_count;i++){
        file = await contract.methods.reportlist(i).call()
        if (file.owner==this.state.account){
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
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Button onClick={()=> this.props.history.push({pathname:'/',obj:this.obj})} color="inherit"><h3>Healthblock</h3></Button>
                    </Toolbar>
                  </AppBar>
                </div>
                <div className="Header">
                      <h1>
                        {this.state.name},your medical reports
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

export default withRouter(ReportsPage);
