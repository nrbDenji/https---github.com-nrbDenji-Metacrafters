// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public dailyWithdrawalLimit = 10000 ether;  // Set a daily limit if required
    uint256 public totalWithdrawnToday;
    uint256 public lastWithdrawalDay;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        lastWithdrawalDay = block.timestamp / 1 days;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        require(msg.sender == owner, "You are not the owner of this account");

        balance += _amount;
        assert(balance == _previousBalance + _amount);

        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);
    error DailyLimitExceeded(uint256 limit, uint256 requested);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 currentDay = block.timestamp / 1 days;
        if (currentDay != lastWithdrawalDay) {
            // Reset daily withdrawal tracker if it's a new day
            totalWithdrawnToday = 0;
            lastWithdrawalDay = currentDay;
        }

        if (balance < _withdrawAmount) {
            revert InsufficientBalance({ balance: balance, withdrawAmount: _withdrawAmount });
        }

        if (totalWithdrawnToday + _withdrawAmount > dailyWithdrawalLimit) {
            revert DailyLimitExceeded({ limit: dailyWithdrawalLimit, requested: _withdrawAmount });
        }

        uint _previousBalance = balance;
        balance -= _withdrawAmount;
        totalWithdrawnToday += _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function resetDailyWithdrawal() public {
        totalWithdrawnToday = 0;
    }
}
