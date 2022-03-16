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

    struct NFTItem {
      uint tokenId;
      address payable owner;
      uint price;
      bool sell;
    }

    event NFTItemCreated (
      uint indexed tokenId,
      address owner,
      uint price,
      bool sell
    );

    function CreateNFTItem(string memory tokenURI, uint price) public onlyOwner {
      _tokenIds.increment();
      uint tokenId = _tokenIds.current();
      _safeMint(msg.sender, tokenId);
      _setTokenURI(tokenId, tokenURI);
      idToNFTItem[tokenId]=NFTItem(tokenId,payable(msg.sender),price,true);
      emit NFTItemCreated(tokenId,msg.sender,price,true);
    }

    function getNFTItem(uint tokenId) public payable{
      uint price = idToNFTItem[tokenId].price;
      address owner = idToNFTItem[tokenId].owner;
      require(msg.value==price);
      require(msg.sender!=owner);
      require(idToNFTItem[tokenId].sell==true);
      idToNFTItem[tokenId].owner = payable(msg.sender);
      _transfer(owner, msg.sender, tokenId);
      payable(owner).transfer(msg.value);
      idToNFTItem[tokenId].sell=false;
    }

      function sellMyNFTItem(uint256 tokenId, uint256 price) public {
      require(idToNFTItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(idToNFTItem[tokenId].sell == false);
      idToNFTItem[tokenId].price = price;
      idToNFTItem[tokenId].sell = true;
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

    function UserSelllists() public view returns (NFTItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner != owner() && idToNFTItem[i + 1].sell==true) {
          itemCount += 1;
        }
      }

      NFTItem[] memory items = new NFTItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToNFTItem[i + 1].owner != owner()&& idToNFTItem[i + 1].sell==true) {
          uint currentId = i + 1;
          NFTItem storage currentItem = idToNFTItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

}