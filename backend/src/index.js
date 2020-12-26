const IpfsHttpClient = require('ipfs-http-client')
const ipfs = IpfsHttpClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
async function hell(){


    const file =await ipfs.add("this.state.buffer", (error, result) => {
        console.log('IPFS result', result)
        if(error) {
          console.error(error)
          return
        }
    })
    console.log(file)

}
hell()