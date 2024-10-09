
# TITLE: Customtken

## Overview

The `WILDCORES` token is a simple ERC20-like token contract implemented in Solidity for the Ethereum blockchain. This contract allows the owner to mint new tokens, and users to burn and transfer their tokens. It provides a straightforward mechanism for managing token balances while enforcing ownership control for minting.

## Features

- **Token Name**: WILDCORES
- **Token Symbol**: WCR
- **Minting**: Only the contract owner can mint new tokens.
- **Burning**: Any user can burn their tokens to decrease their balance and the total supply.
- **Transferring**: Any user can transfer tokens to another address.

## Contract Structure

### State Variables

- **`tokenName`**: The name of the token, set to "WILDCORES".
- **`tokenAbbrv`**: The abbreviation of the token, set to "WCR".
- **`totalSupply`**: The total supply of tokens in circulation, initially set to 0.
- **`owner`**: The address of the contract owner, who has special privileges.
- **`balances`**: A mapping to track the token balances of each address.

### Modifiers

- **`onlyOwner`**: Restricts certain functions to be callable only by the contract owner.

### Functions

1. **`mint(address _address, uint _value)`**:
   - Allows the owner to mint new tokens and assign them to a specified address.
   - **Modifiers**: `onlyOwner`

2. **`burn(uint _value)`**:
   - Allows any user to burn their tokens, reducing both their balance and the total supply.
   - **Requirements**: The user must have a sufficient balance.

3. **`transfer(address _to, uint _value)`**:
   - Allows any user to transfer their tokens to another address.
   - **Requirements**: The sender must have a sufficient balance.

## Usage

### 1. Deploy the Contract
Upon deployment, the contract deployer is set as the owner.

### 2. Mint Tokens
The owner can mint new tokens by calling the `mint()` function with the recipient's address and the amount of tokens to mint.

### 3. Burn Tokens
Any user can burn their tokens by calling the `burn()` function with the amount of tokens they wish to burn.

### 4. Transfer Tokens
Users can transfer tokens to other addresses using the `transfer()` function by providing the recipient's address and the amount to transfer.

## Security Considerations

- **Ownership Control**: Only the contract owner can mint new tokens, preventing unauthorized creation of tokens.
- **Balance Checks**: Functions like `burn()` and `transfer()` check for sufficient balances to prevent underflows and ensure users have enough tokens for their operations.

## Author

Henrick Brian m. Nadonga 
GitHub: [@nbrDenji](https://github.com/nrbDenji)
