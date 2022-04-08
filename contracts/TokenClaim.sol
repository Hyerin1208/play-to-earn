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

mapping(address=>mapping(address=>uint)) private claim;



modifier checkNFT() {
    require(NFT.balanceOf(msg.sender)!=0);
    _;
}

function setClaim(address user,uint amount) public onlyOwner{
    if(claim[address(this)][user]>0){
        uint newAmount = claim[address(this)][user]+amount;
        claim[address(this)][user] = newAmount;
        ArcadeToken.approve(msg.sender,newAmount);
    } else {
claim[address(this)][user] = amount;
ArcadeToken.approve(msg.sender,amount);
    }
}

  function getClaim() public view checkNFT returns(uint) {
      uint myclaim = claim[address(this)][msg.sender];
      require(myclaim==ArcadeToken.allowance(address(this),msg.sender));
      return myclaim;
  }

  function gettoken() public checkNFT{
      uint tokenvalue = ArcadeToken.allowance(address(this),msg.sender);
      require(tokenvalue==claim[address(this)][msg.sender]);
      require(ArcadeToken.balanceOf(address(this))>=tokenvalue,"transfer amount exceeds balance");
      ArcadeToken.transferFrom(address(this),msg.sender,tokenvalue);
  }

function ChangOption(uint _tokenId) payable public checkNFT{
    uint cost = 1000;
    require(ArcadeToken.balanceOf(msg.sender)>1000,"amount exceeds balance");
ArcadeToken.transferFrom(msg.sender,address(this),cost);
    NFT.changeOption(_tokenId,msg.sender);
}

  function transfer(address recipient, uint256 amount) public returns (bool) {
      require(ArcadeToken.balanceOf(msg.sender)>amount);
      AmusementArcadeToken myToken = AmusementArcadeToken(msg.sender);
myToken.transfer(recipient,amount);
    return true;
  }


function mybalance()public view returns(uint){
    return ArcadeToken.balanceOf(msg.sender);
}

}