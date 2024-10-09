// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract myToken {
    string public tokenName = "WILDCORES";
    string public tokenAbbrv = "WCR";
    uint public totalSupply = 0;
    address public owner;

    mapping(address => uint) public balances;

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can execute this function");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    // Function to mint new tokens (only owner)
    function mint(address _address, uint _value) public onlyOwner {
        totalSupply += _value;
        balances[_address] += _value;
    }

    // Function to burn tokens (any user can burn)
    function burn(uint _value) public {
        require(balances[msg.sender] >= _value, "Insufficient balance to burn");
        totalSupply -= _value;
        balances[msg.sender] -= _value;
    }

    // Function to transfer tokens (any user can transfer)
    function transfer(address _to, uint _value) public {
        require(balances[msg.sender] >= _value, "Insufficient balance to transfer");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }
}
