// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract MultiPurposeWallet {
    address payable public owner;
    uint256 public walletBalance;

    struct TransferRequest {
        uint256 amount;
        address payable recipient;
        bool approved;
    }

    TransferRequest public currentTransferRequest;

    // Events for logging
    event TransferRequested(uint256 amount, address recipient);
    event TransferApproved(uint256 amount, address recipient);
    event TransferExecuted(uint256 amount, address recipient);

    // Constructor to set the owner and initial balance
    constructor() payable {
        owner = payable(msg.sender);
        walletBalance = msg.value;
    }

    // Modifier to ensure only the owner can perform certain actions
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Function to deposit funds into the wallet
    function deposit() public payable onlyOwner {
        require(msg.value > 0, "Deposit amount must be greater than zero"); // Ensure a positive deposit
        walletBalance += msg.value;
    }

    // Function to submit a transfer request
    function submitTransferRequest(uint256 _amount, address payable _recipient) public onlyOwner {
        require(_amount <= walletBalance, "Insufficient wallet balance");
        require(_recipient != address(0), "Invalid recipient address"); // Check for valid recipient
        
        currentTransferRequest = TransferRequest({
            amount: _amount,
            recipient: _recipient,
            approved: false
        });

        emit TransferRequested(_amount, _recipient);
    }

    // Function to approve the transfer request
    function approveTransfer() public onlyOwner {
        require(currentTransferRequest.amount > 0, "No transfer request available");
        
        currentTransferRequest.approved = true;
        emit TransferApproved(currentTransferRequest.amount, currentTransferRequest.recipient);
    }

    // Function to execute the transfer after approval
    function executeTransfer() public onlyOwner {
        require(currentTransferRequest.approved, "Transfer not approved yet");
        require(currentTransferRequest.amount <= walletBalance, "Insufficient funds in wallet");

        uint256 previousBalance = walletBalance;

        // Perform the transfer
        walletBalance -= currentTransferRequest.amount;
        (bool success, ) = currentTransferRequest.recipient.call{value: currentTransferRequest.amount}("");
        
        // Using revert to handle transfer failure
        if (!success) {
            revert("Transfer failed"); // Revert if transfer fails
        }

        // Assert the wallet balance is correctly updated
        assert(walletBalance == previousBalance - currentTransferRequest.amount);

        emit TransferExecuted(currentTransferRequest.amount, currentTransferRequest.recipient);

        // Reset the transfer request
        delete currentTransferRequest;
    }

    // Function to check the wallet balance
    function getWalletBalance() public view returns (uint256) {
        return walletBalance;
    }
}
