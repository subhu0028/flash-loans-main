// Dex.js

import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

import Web3 from "web3";
import dexJSON from "./Dex.json";
import flashLoanArbitrageJSON from "./FlashLoanArbitrage.json";
import "../App.css";

import requestfla from "./requestfla";
import approveUSDC from "./approveUSDC";
import approveDAI from "./approveDAI";
import depositUSDC from "./depositUSDC";
import depositDAI from "./depositDAI";
import buyDAI from "./buyDAI";
import sellDAI from "./sellDAI";

import getbalanceDEX from "./getbalanceDEX";
import withdrawDEX from "./withdrawDEX";

import allowanceDAI from "./allowanceDAI";
import allowanceUSDC from "./allowanceUSDC";

const { ethers } = require("ethers");

const Dex = () => {
	const owneraddress = "0x255C7648b6F03C802F09d6bD9226228e2a83f9F";
	let provider;
	const [web3, setWeb3] = useState(null);
	const [flashLoanArbitrage, setFlashLoanArbitrage] = useState(null);
	const [dexContract, setDexContract] = useState(null);

	const [address, setAddress] = useState("");
	const [isAddress, setIsAddress] = useState(false);

	const [usdcAmount, setUsdcAmount] = useState(1500); // Example USDC amount
	const [daiAmount, setDaiAmount] = useState(1500); // Example DAI amount

	const [usdcAmountApprove, setUsdcAmountApprove] = useState(1000);
	const [daiAmountApprove, setDaiAmountApprove] = useState(1200);

	const [usdcLoanAmount, setUsdcLoanAmount] = useState(1000);

	const [formDetails, setFormDetails] = useState({ amount: 1 });

	const [Balance, setBalance] = useState("0");
	const [BalanceString, setBalancestring] = useState("");

	const changeHandler = (event) => {
		let name = event.target.name;
		setFormDetails((prev) => {
			return {
				...prev,
				[name]: event.target.value,
			};
		});
	};

	const detectCurrentProvider = () => {
		if (window.ethereum) {
			provider = window.ethereum;
			return provider;
		} else if (window.web3) {
			provider = window.web3.currentProvider;
			return provider;
		} else {
			console.log("Non-ethereum browser detected. You should install Metamask");
		}
	};

	useEffect(() => {
		const onConnect = async () => {
			try {
				const currentProvider = detectCurrentProvider();
				if (currentProvider) {
					await currentProvider.request({
						method: "eth_requestAccounts",
					});

					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = provider.getSigner();

					const web3 = new Web3(currentProvider);
					const userAccount = await web3.eth.getAccounts();
					setAddress(userAccount[0]);
					console.log(address);

					// console.log(provider);
					// console.log(signer);
					setWeb3({ provider, signer, address });

					const flashLoanArbitrage = new ethers.Contract(
						"0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04",
						flashLoanArbitrageJSON.abi,
						signer
					);
					console.log("FlashLoanArbitrage Contract:", flashLoanArbitrage);
					setFlashLoanArbitrage(flashLoanArbitrage);

					const dexContract = new ethers.Contract(
						"0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d",
						dexJSON.abi,
						signer
					);
					setDexContract(dexContract);
					console.log("Dex Contract: ", dexContract);
				}
			} catch (err) {
				console.log(err);
			}
			return address;
		};
		onConnect();
	}, []);

	const handleDeposit = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		try {
			depositUSDC(signer, usdcAmount);
			depositDAI(signer, daiAmount);
		} catch (error) {
			console.error("Error during depositing to DEX contract:", error);
		}
	};

	const handleApproval = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		try {
			approveUSDC(signer, usdcAmountApprove);
			approveDAI(signer, daiAmountApprove);
		} catch (error) {
			console.error("Error during depositing to DEX contract:", error);
		}
	};

	const handleFlashLoanArbitrage = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		requestfla(signer, formDetails.amount);
	};

	const getbalHandler = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const balance = await getbalanceDEX(signer);
		console.log(balance);
		setBalance(balance);
	};

	useEffect(() => {
		if (Balance != 0) {
			setBalancestring("Balance is: " + Balance + " USDC");
		} else {
			setBalancestring(false);
		}
	}, [Balance]);

	const WithdrawHandler = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		withdrawDEX(signer);
	};

	const getAllowanceUSDC = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const allowUSDC = await allowanceUSDC(signer);
		console.log(allowUSDC)
	}

	const getAllowanceDAI = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		allowanceDAI(signer);
	}

	return (
		<div className="App">
			{/* <div>
				<button onClick={getbalHandler}>get balance</button>
				<text>{BalanceString}</text>
				<div>
					<button onClick={WithdrawHandler}>Withdraw</button>
				</div>
			</div> */}
			<div>
				<h1>DEX</h1>
				<div className="input-box">
					<span className="details">Deposit USDC amount</span>
					<input
						type="number"
						value={usdcAmount}
						onChange={(e) => setUsdcAmount(e.target.value)}
					/>
				</div>
				<div className="input-box">
					<span className="details">Deposit DAI amount</span>
					<input
						type="number"
						value={daiAmount}
						onChange={(e) => setDaiAmount(e.target.value)}
					/>
				</div>
				<button onClick={handleDeposit}>
					Depositing to DEX Smart Contract
				</button>
			</div>
			<div>
				<button onClick={getAllowanceUSDC}>Allowance UDSC</button>
				<div>
					<button onClick={getAllowanceDAI}>Allowance DAI</button>
				</div>
			</div>
			<div>
				<div className="input-box">
					<span className="details">Approve USDC amount</span>
					<input
						type="number"
						value={usdcAmountApprove}
						onChange={(e) => setUsdcAmountApprove(e.target.value)}
					/>
				</div>
				<div className="input-box">
					<span className="details">Approve DAI amount</span>
					<input
						type="number"
						value={daiAmountApprove}
						onChange={(e) => setDaiAmountApprove(e.target.value)}
					/>
				</div>
				<button onClick={handleApproval}>Approval of the amounts</button>
			</div>
			{/* <div>
				<div className="input-box">
					<span className="details">USDC Amount for FlashLoan</span>
					<input
						// type="number"
						// value={usdcLoanAmount}
						// onChange={(e) => setUsdcLoanAmount(e.target.value)}
						onChange={changeHandler}
						name="amount"
						type="text"
						value={formDetails.amount}
						placeholder="Enter the Amount to be loaned"
						required
					/>
				</div>
				<button onClick={handleFlashLoanArbitrage}>Flash Loan Arbitrage</button>
			</div> */}
		</div>
	);
};

export default Dex;
