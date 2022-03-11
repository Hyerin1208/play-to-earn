var Bscsimpletoken = artifacts.require("./Bscsimpletoken.sol");

module.exports = function (deployer) {
    deployer.deploy(Bscsimpletoken);
};
