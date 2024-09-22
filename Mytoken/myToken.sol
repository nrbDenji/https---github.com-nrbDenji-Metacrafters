// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract myToken {

string public TokenName = "WILDCORES";
string public TokkenAbbrv = "WCR";
uint public TotalSupply = 0;

mapping(address => uint) public balances;

function mint (address _address, uint _value) public {

TotalSupply += _value;
balances [_address] += _value;

}

function burn (address _address, uint _value) public {

if (balances [_address] >= _value)
{
TotalSupply -= _value;
balances [_address] -= _value;
}

}

}