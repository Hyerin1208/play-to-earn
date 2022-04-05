// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./CreateNFT.sol";
import "./AmusementArcadeToken.sol";

contract TokenClaim is Ownable{

    AmusementArcadeToken private ArcadeToken;
    CreateNFT private NFT;

    constructor(address TokenAddress, address NFTAddress) {
    ArcadeToken =  AmusementArcadeToken(TokenAddress);
    NFT =  CreateNFT(NFTAddress);
    }

modifier checkNFT() {
    require(NFT.balanceOf(msg.sender)!=0);
    _;
}

  function getclaim() public view returns(uint){
      uint result = ArcadeToken.allowance(ArcadeToken.getOwner(),msg.sender);
      return result;
  }

  function gettoken() public checkNFT(){
      uint tokenvalue = ArcadeToken.allowance(ArcadeToken.getOwner(),msg.sender);
      ArcadeToken.transferFrom(ArcadeToken.getOwner(),msg.sender,tokenvalue);
  }

function mybalance()public view returns(uint){
    return ArcadeToken.balanceOf(msg.sender);
}

}
