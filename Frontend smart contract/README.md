# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

# TITLE: Assessment Contract

## Overview

The `Assessment` contract is implemented in Solidity for the Ethereum blockchain, providing an ATM-like interface for users to deposit and withdraw Ether. The contract enforces a daily withdrawal limit to enhance security, allowing only the owner to perform specific actions.

## Features

- **Owner Control**: Only the contract owner can deposit and withdraw Ether.
- **Daily Withdrawal Limit**: Withdrawals are capped at a specified limit (10,000 ETH) per day.
- **Error Handling**: The contract includes custom error handling for insufficient balance and daily limit exceedance.

## Contract Structure

### State Variables

- **`owner`**: The address of the contract owner, who can deposit and withdraw funds.
- **`balance`**: The total balance held by the contract.
- **`dailyWithdrawalLimit`**: The maximum amount that can be withdrawn in a single day (set to 10,000 ETH).
- **`totalWithdrawnToday`**: The total amount withdrawn today.
- **`lastWithdrawalDay`**: The day of the last withdrawal, used to reset the daily limit.

### Functions

1. **`deposit(uint256 _amount)`**:
   - Allows the contract owner to deposit Ether into the contract.
   - **Modifiers**: `onlyOwner`

2. **`withdraw(uint256 _withdrawAmount)`**:
   - Allows the owner to withdraw Ether, enforcing the daily withdrawal limit.
   - **Error Handling**: Insufficient balance and daily limit exceeded.

3. **`resetDailyWithdrawal()`**:
   - Resets the total withdrawn amount for the day (accessible only to the owner).

## Usage

### 1. Deploy the Contract
Upon deployment, the contract deployer is set as the owner.

### 2. Deposit Ether
The owner can deposit Ether into the contract using the `deposit()` function.

### 3. Withdraw Ether
The owner can withdraw Ether using the `withdraw()` function, subject to the daily withdrawal limit.

### 4. Reset Daily Withdrawal Total
The owner can reset the daily withdrawal tracker using the `resetDailyWithdrawal()` function.

## Security Considerations

- **Ownership Control**: Only the contract owner can perform deposits and withdrawals, preventing unauthorized access.
- **Daily Withdrawal Limits**: Withdrawals are restricted by a daily limit to enhance security.

## Author

Henrick Brian m. Nadonga  
GitHub: [@nbrDenji](https://github.com/nrbDenji)
