
# TITLE: Customtoken

## Overview

The `WILDCORES` token is a simple ERC20-like token contract implemented in Solidity for the Ethereum blockchain. This contract allows the owner to mint new tokens, and users to burn and transfer their tokens. It leverages OpenZeppelin's ERC20 and Ownable contracts to provide secure and efficient token management, with ownership control over minting operations.

## Features

- **Token Name**: WILDCORES
- **Token Symbol**: WCR
- **Minting**: Only the contract owner can mint new tokens using the `mint()` function.
- **Burning**: Any user can burn their tokens to decrease their balance and the total supply using the `burn()` function.
- **Transferring**: Any user can transfer tokens to another address using the `transfer()` function.

## Contract Structure

### State Variables

- **`name`**: The name of the token, set to "WILDCORES".
- **`symbol`**: The abbreviation of the token, set to "WCR".
- **`owner`**: The address of the contract owner, who has special privileges (set upon deployment).

### Inherited OpenZeppelin Contracts

- **`ERC20`**: Implements the standard ERC20 token functionality.
- **`ERC20Burnable`**: Adds the ability for users to burn their tokens.
- **`Ownable`**: Restricts certain functions (like `mint()`) to the owner of the contract.

### Functions

1. **`mint(address to, uint256 amount)`**:
   - Allows the contract owner to mint new tokens and assign them to a specified address.
   - **Modifiers**: `onlyOwner`

2. **`burn(uint256 amount)`**:
   - Allows any user to burn their tokens, reducing both their balance and the total supply.
   - **Requirements**: The user must have enough balance to burn the specified amount.

3. **`transfer(address to, uint256 value)`**:
   - Allows any user to transfer tokens to another address.
   - **Requirements**: The sender must have enough balance to complete the transfer.

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

## Author

Henrick Brian m. Nadonga 
GitHub: [@nbrDenji](https://github.com/nrbDenji)
