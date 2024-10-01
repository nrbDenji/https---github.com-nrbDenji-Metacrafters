
# MultiPurposeWallet - Solidity Smart Contract

## Overview

The `MultiPurposeWallet` is a smart contract written in Solidity for the Ethereum blockchain, designed to manage and securely handle multiple functions related to wallet operations. It allows the owner to deposit funds, submit transfer requests, approve them, and execute the transfers. This contract ensures that only the owner can perform critical actions, using modifiers to enforce access control.

## Features

- **Deposit funds:** Only the owner can deposit funds into the wallet.
- **Submit transfer requests:** The owner can initiate a request to transfer funds to a recipient.
- **Approve transfer requests:** Before a transfer can be executed, it must be approved by the owner.
- **Execute approved transfers:** After approval, the owner can execute the transfer, which sends the specified amount to the designated recipient.
- **Check wallet balance:** The current wallet balance can be queried at any time.

## Contract Structure

### State Variables

- **`owner`**: Holds the address of the wallet owner. Only this address can execute certain functions like deposits, approvals, and transfers.
- **`walletBalance`**: Tracks the current balance of the wallet.
- **`currentTransferRequest`**: A structure (`TransferRequest`) to manage transfer request details such as the amount to transfer, the recipient, and approval status.

### Events

- **`TransferRequested(uint256 amount, address recipient)`**: Triggered when a new transfer request is created.
- **`TransferApproved(uint256 amount, address recipient)`**: Triggered when a transfer request is approved by the owner.
- **`TransferExecuted(uint256 amount, address recipient)`**: Triggered when a transfer is successfully executed.

### Constructor

- **`constructor()`**: Initializes the contract by setting the contract deployer as the owner and allowing the initial balance (sent with the contract deployment) to be stored in `walletBalance`.

### Modifiers

- **`onlyOwner`**: Ensures that only the owner of the wallet can perform certain actions such as depositing, submitting, approving, or executing transfers.

### Functions

1. **`deposit()`**:
   - Allows the owner to deposit Ether into the wallet. The wallet balance is updated accordingly.
   - **Modifiers**: `onlyOwner`
   - **Event**: None

2. **`submitTransferRequest(uint256 _amount, address payable _recipient)`**:
   - Allows the owner to submit a request to transfer funds to a recipient.
   - Ensures that the requested amount is available in the wallet and the recipient's address is valid.
   - **Modifiers**: `onlyOwner`
   - **Event**: `TransferRequested`

3. **`approveTransfer()`**:
   - Approves a pending transfer request. Only the owner can approve transfers.
   - **Modifiers**: `onlyOwner`
   - **Event**: `TransferApproved`

4. **`executeTransfer()`**:
   - Executes the approved transfer. The transfer amount is deducted from the wallet's balance and sent to the recipient.
   - If the transfer fails, the function reverts the transaction to ensure funds remain intact.
   - **Modifiers**: `onlyOwner`
   - **Event**: `TransferExecuted`

5. **`getWalletBalance()`**:
   - Returns the current balance of the wallet.
   - **Modifiers**: None
   - **Event**: None

## Usage

### 1. Deploy the Contract
Upon deployment, the contract creator is set as the owner, and the initial balance (if any Ether is sent during deployment) is added to the wallet balance.

### 2. Deposit Funds
The owner can deposit funds into the contract using the `deposit()` function. Only the owner can call this function.

### 3. Submit a Transfer Request
The owner can initiate a transfer request using the `submitTransferRequest(uint256 _amount, address payable _recipient)` function. This records the transfer request details.

### 4. Approve Transfer
Before the transfer can be executed, the owner must approve it using the `approveTransfer()` function. This marks the transfer as ready for execution.

### 5. Execute Transfer
Once approved, the owner can execute the transfer by calling the `executeTransfer()` function. This sends the requested amount to the recipient and updates the wallet balance.

### 6. Check Wallet Balance
Anyone can call the `getWalletBalance()` function to check the current balance of the wallet.

## Security Considerations

- **Ownership control**: Only the owner can perform sensitive actions like deposits, approvals, and transfers.
- **Reverts on failures**: The contract reverts in case of transfer failure to prevent accidental loss of funds.
- **Access control**: The `onlyOwner` modifier ensures that only the designated wallet owner has control over the contract’s operations.

## Author

Henrick Brian m. Nadonga 
GitHub: [@nbrDenji](https://github.com/nrbDenji)
