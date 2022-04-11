// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./CreateNFT.sol";
import "./AmusementArcadeToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenClaim is Ownable{


    AmusementArcadeToken private ArcadeToken;
    CreateNFT private NFT;

    constructor(address TokenAddress, address NFTAddress) {
    ArcadeToken =  AmusementArcadeToken(TokenAddress);
    NFT =  CreateNFT(NFTAddress);
    }

mapping(address=>mapping(address=>uint)) public claim;



modifier checkNFT() {
    require(NFT.balanceOf(msg.sender)!=0);
    _;
}

function setClaim(address user,uint amount) public onlyOwner{
    if(claim[address(this)][user]>0){
        uint newAmount = claim[address(this)][user]+amount;
        claim[address(this)][user] = newAmount;
        ArcadeToken.approve(user,newAmount);
    } else {
claim[address(this)][user] = amount;
ArcadeToken.approve(user,amount);
    }
}

  function getClaim() public view returns(uint) {
      uint myclaim = claim[address(this)][msg.sender];
      require(myclaim==ArcadeToken.allowance(address(this),msg.sender));
      return myclaim;
  }

  function getmsgsender() public view returns (address) {
    return ArcadeToken.getmsgsender();
  }

  function gettoken() public {
      uint tokenvalue = ArcadeToken.allowance(address(this),msg.sender);
      require(tokenvalue==claim[address(this)][msg.sender]);
      require(ArcadeToken.balanceOf(address(this))>=
      tokenvalue,"transfer amount exceeds balance");
      ArcadeToken.transfer(msg.sender,tokenvalue);
      ArcadeToken.approve(msg.sender,0);
      claim[address(this)][msg.sender] = 0;
  }

function ChangOption(uint _tokenId ) payable public checkNFT{
    uint cost = 1000;
    require(ArcadeToken.balanceOf(msg.sender)>1000,"amount exceeds balance");
ArcadeToken.transferFrom(msg.sender,address(this),cost);
    NFT.changeOption(_tokenId,msg.sender);
}


function mybalance()public view returns(uint){
    return ArcadeToken.balanceOf(msg.sender);
}

function contractbalance()public view returns(uint){
    return ArcadeToken.balanceOf(address(this));
}

}