var AmusementArcadeToken = artifacts.require("./AmusementArcadeToken.sol");
var CreateNFT = artifacts.require("./CreateNFT.sol");
var TokenClaim = artifacts.require("./TokenClaim.sol");
var StakingToken = artifacts.require("./StakingToken.sol");

module.exports = async function (deployer) {
  await deployer.deploy(AmusementArcadeToken);
  await deployer.deploy(CreateNFT);
  await deployer.deploy(
    TokenClaim,
    AmusementArcadeToken.address,
    CreateNFT.address
  );
  await deployer.deploy(
    StakingToken,
    CreateNFT.address,
    AmusementArcadeToken.address
  );
};
