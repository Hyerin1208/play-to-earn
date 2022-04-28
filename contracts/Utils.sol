// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./CreateNFT.sol";
import "./AmusementArcadeToken.sol";

contract Utils{

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


        event GetNFTResult (
      uint tokenId,
            address from,
      address to
    );
    event EvoResult(uint rare, uint star);

function ChangOption(uint _tokenId, uint _cost) public checkNFT returns(bool){
    if(checkbalance(msg.sender)>_cost){
ArcadeToken.transferFrom(msg.sender,ArcadeToken.getOwner(),_cost);
    uint[] memory returnResult = NFT.changeOption(_tokenId,msg.sender);
    emit EvoResult(returnResult[0], returnResult[1]);
    return true;
    }
    return false;
}

function GetNFTItem(uint tokenId,uint _cost) public checkNFT returns(bool){
if(checkbalance(msg.sender)>_cost){
    address owner = NFT.WhoIsOwner(tokenId);
    ArcadeToken.transferFrom(msg.sender,owner,_cost);
NFT.getNFTItem(tokenId,msg.sender);
emit GetNFTResult(tokenId, owner, msg.sender);
return true;
}
return false;
}


function checkbalance(address _sender)private view returns(uint){
    return ArcadeToken.balanceOf(_sender);
}

}