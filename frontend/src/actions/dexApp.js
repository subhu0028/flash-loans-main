// Install web3 and other necessary dependencies
// npm install web3 react-bootstrap bootstrap

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Web3 from "web3";

import json from "./Dex.json";

const DexApp = () => {
	const [web3, setWeb3] = useState(null);
	const [accounts, setAccounts] = useState([]);
	const [dexContract, setDexContract] = useState(null);
	const [usdcAmount, setUsdcAmount] = useState(0);
	const [daiAmount, setDaiAmount] = useState(0);

	const contractAddress = "0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d";

	useEffect(() => {
		const initWeb3 = async () => {
			try {
				// Connect to the provider (MetaMask)
				const provider = window.ethereum;
				await provider.enable();
				const web3Instance = new Web3(provider);
				setWeb3(web3Instance);

				// Get the user's accounts
				const accs = await web3Instance.eth.getAccounts();
				setAccounts(accs);

				// Instantiate the contract
				const contract = new web3Instance.eth.Contract(
					// Your Dex contract ABI (Generated from your Solidity contract)
					json.abi,
					contractAddress
				);
				setDexContract(contract);
			} catch (error) {
				console.error("Error initializing web3: ", error);
			}
		};

		initWeb3();
	}, []);

	const handleDepositUSDC = async () => {
		try {
			// Deposit USDC
			await dexContract.methods
				.depositUSDC(usdcAmount)
				.send({ from: accounts[0] });

			// Deposit successful
			console.log("USDC deposited successfully!");
		} catch (error) {
			console.error("Error depositing USDC:", error);
		}
	};

	const handleDepositDAI = async () => {
		try {
			// Deposit DAI
			await dexContract.methods
				.depositDAI(daiAmount)
				.send({ from: accounts[0] });

			// Deposit successful
			console.log("DAI deposited successfully!");
		} catch (error) {
			console.error("Error depositing DAI:", error);
		}
	};

	const handleBuyDAI = async () => {
		try {
			// Buy DAI
			await dexContract.methods.buyDAI().send({ from: accounts[0] });

			// Buy successful
			console.log("DAI bought successfully!");
		} catch (error) {
			console.error("Error buying DAI:", error);
		}
	};

	const handleSellDAI = async () => {
		try {
			// Sell DAI
			await dexContract.methods.sellDAI().send({ from: accounts[0] });

			// Sell successful
			console.log("DAI sold successfully!");
		} catch (error) {
			console.error("Error selling DAI:", error);
		}
	};

	return (
		<div className="App">
			<h1>Dex App</h1>
			{web3 ? (
				<div>
					<p>Connected Account: {accounts[0]}</p>
					<Form>
						<Form.Group controlId="formUsdcAmount">
							<Form.Label>USDC Amount</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter USDC amount"
								onChange={(e) => setUsdcAmount(e.target.value)}
							/>
							<Button variant="primary" onClick={handleDepositUSDC}>
								Deposit USDC
							</Button>
						</Form.Group>

						<Form.Group controlId="formDaiAmount">
							<Form.Label>DAI Amount</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter DAI amount"
								onChange={(e) => setDaiAmount(e.target.value)}
							/>
							<Button variant="primary" onClick={handleDepositDAI}>
								Deposit DAI
							</Button>
						</Form.Group>

						<Button variant="success" onClick={handleBuyDAI}>
							Buy DAI
						</Button>

						<Button variant="danger" onClick={handleSellDAI}>
							Sell DAI
						</Button>
					</Form>
				</div>
			) : (
				<p>Loading web3...</p>
			)}
		</div>
	);
};

export default DexApp;
