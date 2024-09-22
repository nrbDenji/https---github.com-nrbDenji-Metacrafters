
## Description
This Solidity program demonstrates the creation of a token while utilizing the `require()`, `assert()`, and `revert()` statements for error handling and validation. The contract includes two main functions:
- **Mint function**: Increases the token supply by adding tokens to a specified address.
- **Burn function**: Reduces the token supply by removing tokens from a specified address, with safety checks in place.

## Functions

### 1. `mint(address _address, uint _value)`
This function adds tokens to the specified `_address` and increases the total token supply. It uses `require()` to ensure the transaction is valid.

### 2. `burn(address _address, uint _value)`
This function removes tokens from the specified `_address` and decreases the total supply. It uses `require()` to check if the address has enough tokens to burn and employs `assert()` to confirm the total supply is reduced correctly.

## Getting Started

### Executing Program

To run this program, use Remix, an online Solidity IDE. Follow these steps:

1. Go to the Remix website at [Remix IDE](https://remix.ethereum.org/).
2. Create a new file by clicking the "+" icon in the left-hand sidebar.
3. Save the file with a `.sol` extension (e.g., `myToken.sol`).
4. Copy and paste the Solidity code into your file. from [(Mytoken/myToken.sol)](https://github.com/nrbDenji/https---github.com-nrbDenji-Metacrafters/blob/main/Mytoken/myToken.sol)
### Compiling the Code
1. Click on the "Solidity Compiler" tab in the left-hand sidebar.
2. Set the compiler version to **0.8.26** (or another compatible version).
3. Click the "Compile myToken.sol" button to compile the code.

### Deploying the Contract
1. Navigate to the "Deploy & Run Transactions" tab in the left-hand sidebar.
2. Select your contract from the dropdown menu.
3. Click the "Deploy" button to deploy the contract.

### Interacting with the Contract
Once deployed, you can interact with the contract using the **mint** and **burn** functions:
- **Mint**: Adds a specific number of tokens to a selected address.
- **Burn**: Removes a specific number of tokens from a selected address, ensuring the address holds enough tokens before the burn.

1. Enter the desired address and value for the function.
2. Click the "transact" button to execute the function.
3. You will see the transaction results in the console.

## Author

Henrick Brian m. Nadonga 
GitHub: [@nbrDenji](https://github.com/nrbDenji)
