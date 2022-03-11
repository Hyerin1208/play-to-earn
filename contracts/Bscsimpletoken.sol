// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Bscsimpletoken {
    mapping(address=> uint) public balances;

    uint public totalSupply = 10000 * 10 ** 18;
    string public name = "Bsc Simple Token";
    string public symbol = "BST";
    uint public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint value);

    constructor() {
        balances[msg.sender] = totalSupply;
    }
    
    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }

    function transfer(address to, uint value) public returns(bool) {
        require(balanceOf(msg.sender) >= value, 'balance too low');
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

}