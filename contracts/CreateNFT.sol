// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreateNFT is ERC721URIStorage,Ownable  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("CreateNFT", "CNT") {
    }

mapping(uint => NFTItem) private idToNFTItem;
mapping(address=>bool) private getDefault;

    struct NFTItem {
      uint tokenId;
      address owner;
      uint price;
      uint rare;
      uint star;
      bool getDefault;
      bool sell;
    }

    event NFTItemCreated (
      uint indexed tokenId,
      address owner,
      uint price ,
            uint rare,
      uint star,
      bool getDefault,
      bool sell
    );


    function WhoIsOwner(uint _tokenId) public view returns(address){
      return idToNFTItem[_tokenId].owner;
    }

    function CreateNFTItem(uint _tokenId, string memory _tokenURI, uint _price, bool _getDefault,bool _sell) private {
      _safeMint(msg.sender, _tokenId);
      _setTokenURI(_tokenId, _tokenURI);
      idToNFTItem[_tokenId]=NFTItem(_tokenId,payable(msg.sender),_price,1,1,_getDefault,_sell);
      _approve(msg.sender, _tokenId);
      emit NFTItemCreated(_tokenId,msg.sender,_price,1,1,_getDefault,_sell);
    }

    function CreateNFTinContract(string memory tokenURI, uint price) public{
              _tokenIds.increment();
      uint tokenId = _tokenIds.current();
      if(owner() == msg.sender||(isApprovedForAll(owner(),msg.sender)==true&& getDefault[msg.sender] == true)){
        CreateNFTItem(tokenId,tokenURI,price,false,true);
        } else {
          _setApprovalForAll(owner(), msg.sender, true);
          getDefault[msg.sender] = true;
        CreateNFTItem(tokenId,tokenURI,price,true,false);
        }
      }

function randomOption(uint _input) private view returns (uint) {
uint option;
  uint result = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender,_input)))%100;
if(result>0&&result<50){
  option = 1;
} else if(result>=50&&result<70){
  option = 2;
} else if(result>=70&&result<96){
  option = 3;
} else if(result>=96&&result<99){
  option = 4;
}else if(result==99){
  option = 5;
}
  return option;
}

function changeOption(uint _tokenId, address _msgsender) external returns(uint[] memory){

  uint[]    memory EvoResult = new uint[](2);
  require(idToNFTItem[_tokenId].owner== _msgsender);
  uint rare = randomOption(99);
  uint star = randomOption(1);
  idToNFTItem[_tokenId].rare = rare;
  idToNFTItem[_tokenId].star = star;
  EvoResult[0]=rare;
  EvoResult[1]=star;
return EvoResult; 
}

    function getNFTItem(uint tokenId, address _buyer) external {
        require(isApprovedForAll(owner(),_buyer)== true);
        require(getApproved(tokenId)!=_buyer);
        require(idToNFTItem[tokenId].getDefault!=true);
      address owner = idToNFTItem[tokenId].owner;
      require(idToNFTItem[tokenId].sell==true);
      _transfer(owner, _buyer, tokenId);
      _approve(_buyer, tokenId);
      idToNFTItem[tokenId].owner = _buyer;
      idToNFTItem[tokenId].sell=false;
    }

      function sellMyNFTItem(uint tokenId, uint price) public {
          require(isApprovedForAll(owner(),msg.sender)== true||msg.sender==owner());
          require(getApproved(tokenId)==msg.sender);
      require(idToNFTItem[tokenId].getDefault!=true);
      if(idToNFTItem[tokenId].sell == false){

      idToNFTItem[tokenId].price = price;
      idToNFTItem[tokenId].sell = true;
      } else {
      idToNFTItem[tokenId].price = price;
      }
    }

    function MyNFTlists() public view returns (NFTItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      NFTItem[] memory items = new NFTItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          NFTItem storage currentItem = idToNFTItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

function changeSellState (uint _tokenId) public returns(bool){
 require(idToNFTItem[_tokenId].owner==msg.sender&&idToNFTItem[_tokenId].sell==true);
idToNFTItem[_tokenId].sell=false;
return true;
}

    function OwnerSelllists() public view returns (NFTItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner == owner()) {
          itemCount += 1;
        }
      }

      NFTItem[] memory items = new NFTItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner == owner()) {
          uint currentId = i + 1;
          NFTItem storage currentItem = idToNFTItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function Selllists() public view returns (NFTItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].sell==true) {
          itemCount += 1;
        }
      }

      NFTItem[] memory items = new NFTItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].sell==true) {
          uint currentId = i + 1;
          NFTItem storage currentItem = idToNFTItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function totalNFTs() public view returns (uint) {
      return _tokenIds.current();
    }

}