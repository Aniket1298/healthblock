# Healthblock
## HealthRecord Storing and sharing using Blockchain
### How to run the project
### Prerequites
### 1.Install ganache
### 2.setup a new project and add truffle-config.js to it.
### 3.setup metamask and add account from the free accounts given in ganache.
### 4.add port 7545 in truffle-config.

``` 
git clone https://github.com/Aniket1298/healthblock.git
cd healthblock/healthblock
npm install
cd src
truffle migrate --reset
cd ..
npm start
```
### Currently Supporting Features
### Role Based Authentication i.e. Doctor and Patient
### Uploading of Report to ipfs and storing it's hash in blockchain
### Rendering Uploaded Reports of patient
