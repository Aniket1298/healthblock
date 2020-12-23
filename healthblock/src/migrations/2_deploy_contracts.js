const Healthblock = artifacts.require("../contracts/Healthblock.sol");

module.exports = function(deployer) {
  deployer.deploy(Healthblock);
};