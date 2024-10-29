import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [dailyWithdrawn, setDailyWithdrawn] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance(ethers.utils.formatEther(await atm.getBalance()));
    }
  };

  const getDailyWithdrawalInfo = async () => {
    if (atm) {
      setDailyWithdrawn(ethers.utils.formatEther(await atm.totalWithdrawnToday()));
      setDailyLimit(ethers.utils.formatEther(await atm.dailyWithdrawalLimit()));
    }
  };

  const deposit = async () => {
    if (atm && depositAmount) {
      let tx = await atm.deposit(ethers.utils.parseEther(depositAmount));
      await tx.wait();
      getBalance();
      setDepositAmount("");
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount) {
      try {
        let tx = await atm.withdraw(ethers.utils.parseEther(withdrawAmount));
        await tx.wait();
        getBalance();
        getDailyWithdrawalInfo();
        setWithdrawAmount("");
      } catch (error) {
        if (error.message.includes("DailyLimitExceeded")) {
          alert("Withdrawal exceeds daily limit.");
        } else if (error.message.includes("InsufficientBalance")) {
          alert("Insufficient balance.");
        } else {
          console.error(error);
        }
      }
    }
  };

  const resetDailyWithdrawal = async () => {
    if (atm) {
      try {
        let tx = await atm.resetDailyWithdrawal();
        await tx.wait();
        getDailyWithdrawalInfo();
        alert("Daily withdrawal total has been reset.");
      } catch (error) {
        console.error("Failed to reset daily withdrawal:", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button className="btn-connect" onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }
    if (dailyWithdrawn === 0 && dailyLimit === 0) {
      getDailyWithdrawalInfo();
    }

    return (
        <div className="atm-container">
          <p><strong>Your Account:</strong> {account}</p>
          <p><strong>Your Balance:</strong> {balance} ETH</p>
          <p><strong>Daily Withdrawn Today:</strong> {dailyWithdrawn} ETH</p>
          <p><strong>Daily Withdrawal Limit:</strong> {dailyLimit} ETH</p>
          <input
              type="text"
              placeholder="Amount to Deposit (ETH)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="input-field"
          />
          <button className="btn" onClick={deposit}>Deposit</button>
          <br />
          <input
              type="text"
              placeholder="Amount to Withdraw (ETH)"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="input-field"
          />
          <button className="btn" onClick={withdraw}>Withdraw</button>
          <br />
          <button className="btn-reset" onClick={resetDailyWithdrawal}>Reset Daily Withdrawal Total</button>
        </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
      <main className="container">
        <header>
          <h1>Welcome to the Brian's ATM with withdrawal limit!</h1>
        </header>
        {initUser()}
        <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .
        h1 {
          font-size: 2em;
          color: #333;
        }
      `}</style>
      </main>
  );
}
