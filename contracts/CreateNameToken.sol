// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreateNameToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("CreateNameToken", "CNT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function getNFTfromOwner(address to, uint tokenId) public {
        if(getApproved(tokenId) == to){
          safeTransferFrom(owner(),to,tokenId);
        } else {
          approve(to,tokenId);
          safeTransferFrom(owner(),to,tokenId);
        }

    }
}