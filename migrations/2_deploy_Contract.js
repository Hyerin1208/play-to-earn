var AmusementArcadeToken = artifacts.require("./AmusementArcadeToken.sol");
var CreateNFT = artifacts.require("./CreateNFT.sol");
var TokenClaim = artifacts.require("./TokenClaim.sol");

module.exports = async function (deployer) {
    await deployer.deploy(AmusementArcadeToken);
    await deployer.deploy(CreateNFT);
    await deployer.deploy(TokenClaim, AmusementArcadeToken.address, CreateNFT.address);
};
