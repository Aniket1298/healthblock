import Web3 from 'web3'
import Healthblock from './build/contracts/Healthblock.json'
export default class web3obj{
    constructor(){
        this.account=''
        this.contract=null
    }
    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.account=accounts[0]
        const networkId = await web3.eth.net.getId()
        const networkData = Healthblock.networks[networkId]
        if(networkData) {
          const contract = new web3.eth.Contract(Healthblock.abi, networkData.address)
          this.contract = contract
          console.log("Contract",contract.methods)
          const hello = await contract.methods.name().call()
          console.log("Address",this.account)
          //await contract.methods.register("doctor6",1).send({from:this.account})
          const data = await contract.methods.getProfile(this.account).call()
          console.log("DATA",data)
          var user=null
          if (data[0]!=""){
              user={"name":data[0],"role":data[1]}
          }
          this.user=user
        } else {
          window.alert('Healthblock contract not deployed to detected network.')
        }
    }   
}