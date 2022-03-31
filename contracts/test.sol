// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./CreateNFT.sol";
import "./AmusementArcadeToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenClaim is Ownable{

    AmusementArcadeToken private ArcadeToken;
    CreateNFT private NFT;

    constructor(address TokenAddress, address NFTAddress) {
    ArcadeToken =  AmusementArcadeToken(TokenAddress);
    NFT =  CreateNFT(NFTAddress);
    }

    uint public round = 1;

// event SetRanking(address indexed from, address indexed to, uint256 value);

//게임이름->회차->랭킹->유저
mapping(string=>mapping(uint=>mapping(uint=>address))) public gameRanker;

mapping(uint => uint) public reward;



mapping(address=>bool) public tokenClaim;

modifier checkNFT() {
    require(NFT.balanceOf(msg.sender)!=0);
    _;
}

  function approve(address userAddress, uint256 amount, bool rankup) private returns (bool) {
      uint allowance = ArcadeToken.allowance(address(this),userAddress);
      if(allowance!=0){
          if(rankup){
ArcadeToken.increaseAllowance(msg.sender, amount);
          } else {
              ArcadeToken.decreaseAllowance(msg.sender, amount);
          }
      }else {

    ArcadeToken.approve(msg.sender, amount);
      }
    return true;
  }

  modifier checkranker(string memory gameName, uint rank){
      address preRanker = gameRanker[gameName][round][rank];
      require(preRanker!=msg.sender);

      _;

  }

function setRanker(string memory gameName, uint rank) public checkranker(gameName, rank){
    reward[1] = 1000;
    reward[2] = 500;
    reward[3] = 200;
    reward[4] = 0;
    address prevRanker = gameRanker[gameName][round][rank];
    if (prevRanker==address(0)){
        gameRanker[gameName][round][rank] = msg.sender;
            ArcadeToken.increaseAllowance(msg.sender, reward[rank]);
            // ArcadeToken.approve(msg.sender, reward[rank]);
            tokenClaim[msg.sender] = true;
    } else if (prevRanker!=msg.sender) {
for(uint i = 3; i<rank; i--){
    address prevAddress = gameRanker[gameName][round][i];
                if (i+1==4){
                ArcadeToken.decreaseAllowance(prevAddress,reward[i]-reward[i+1]);
                tokenClaim[prevAddress] = false;
                } else {
                ArcadeToken.decreaseAllowance(prevAddress,reward[i]-reward[i+1]);
                    gameRanker[gameName][round][i+1]= prevAddress;
                }
}
        gameRanker[gameName][round][rank] = msg.sender;
            ArcadeToken.increaseAllowance(msg.sender, reward[rank]);
            // ArcadeToken.approve(msg.sender, reward[rank]);
            tokenClaim[msg.sender] = true;
}

}

  function getclaim() public view returns(uint){
      uint result = ArcadeToken.allowance(address(this),msg.sender);
      return result;
  }

  function gettoken() public {
      uint tokenvalue = ArcadeToken.allowance(address(this),msg.sender);
      ArcadeToken.transferFrom(ArcadeToken.getOwner(),msg.sender,tokenvalue);
      ArcadeToken.approve(msg.sender, 0);
  }


}
