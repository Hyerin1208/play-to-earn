var CreateNFT = artifacts.require("./CreateNFT.sol");

module.exports = function (deployer) {
  deployer.deploy(CreateNFT);
};
