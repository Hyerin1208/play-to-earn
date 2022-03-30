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

mapping(uint => address) public changeRank;

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
    address prevRanker = gameRanker[gameName][round][rank];
    if (prevRanker==address(0)){
        gameRanker[gameName][round][rank] = msg.sender;
            approve(msg.sender, reward[rank],true);
            // ArcadeToken.approve(msg.sender, reward[rank]);
            tokenClaim[msg.sender] = true;
    } else {
        for(uint i = rank; i>3; i++){
            changeRank[i]= gameRanker[gameName][round][i];
        }
        for(uint i = rank; i>3; i++){
            if(i+1==4){
                approve(changeRank[i],reward[3],false);
                tokenClaim[changeRank[i]] = false;
            } else {
            gameRanker[gameName][round][i+1]=changeRank[i];
            approve(changeRank[i], reward[i]-reward[i+1],false);
            }
        }
                gameRanker[gameName][round][rank] = msg.sender;
            approve(msg.sender, reward[rank],true);
            // ArcadeToken.approve(msg.sender, reward[rank]);
            tokenClaim[msg.sender] = true;
    }

// for (uint i=rank; i>3; i++){
// }

//     address prevRanker = gameRanker[gameName][round][rank];
//     if(rank==1){

//     }
//     uint prevRank = rank+1;
    
//      if(prevRank>3){
// approve(preRanker, reward[rank],false);
// tokenClaim[preRanker] = false;
//         } else {

//         }



//     if (preRanker==address(0)){
// gameRanker[gameName][round][rank] = msg.sender;
//             approve(msg.sender, reward[rank],true);
//             // ArcadeToken.approve(msg.sender, reward[rank]);
//             tokenClaim[msg.sender] = true;
//     } else {
// // if(preRanker!=msg.sender){

//         uint preRank = rank+1;
//         if(preRank>3){
            
// approve(preRanker, reward[rank],false);
// // ArcadeToken.approve(preRanker, 0);
// tokenClaim[preRanker] = false;
//         } else {
//             gameRanker[gameName][round][preRank] = preRanker;
//             approve(preRanker, reward[rank]-reward[preRank],false);
//             // ArcadeToken.approve(preRanker, reward[preRank]);
//         }
// // }

//     }


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
