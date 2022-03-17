var AmusementArcadeToken = artifacts.require("./AmusementArcadeToken.sol");

module.exports = function (deployer) {
    deployer.deploy(AmusementArcadeToken);
};
