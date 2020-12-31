import logo from './logo.svg';
import './App.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import {Form} from 'react-bootstrap'
import web3obj from './healthblock'
function ReportList(props) {
    var hashes = props.hashes;
    console.log("REPOS",hashes)
    const listItems = hashes.map((hash) =>
        <div>
            <a href={hash[1]} target="_blank">{hash[0]}</a> 

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
        return(
            <div className="ReportsPage" style={{marginLeft:"40%",marginTop:"5%"}}>
                <h3>Address {this.state.account}</h3>
                <h3>Name  {this.state.name}</h3>
                <h3>Role {this.state.role}</h3>
                <ReportList hashes={this.state.hashes} />
            </div>
        )
    }
}

export default withRouter(ReportsPage);
