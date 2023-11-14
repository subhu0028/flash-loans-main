// Install web3 and other necessary dependencies
// npm install web3 react-bootstrap bootstrap

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Web3 from "web3";

import json from "./FlashLoan.json";

const FlashLoanArbitrageApp = () => {
	const [web3, setWeb3] = useState(null);
	const [accounts, setAccounts] = useState([]);
	const [flashLoanArbitrageContract, setFlashLoanArbitrageContract] =
		useState(null);
	const [usdcAmount, setUsdcAmount] = useState(0);

	const contractAddress = "0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04";

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
					// Your FlashLoanArbitrage contract ABI (Generated from your Solidity contract)
					json.abi,
					contractAddress
				);
				setFlashLoanArbitrageContract(contract);
			} catch (error) {
				console.error("Error initializing web3: ", error);
			}
		};

		initWeb3();
	}, []);

	const handleFlashLoan = async () => {
		try {
			// Request flash loan
			await flashLoanArbitrageContract.methods
				.requestFlashLoan("0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d", usdcAmount)
				.send({ from: accounts[0] });

			// Flash loan successful
			console.log("Flash loan successful!");
		} catch (error) {
			console.error("Error executing flash loan:", error);
		}
	};

	return (
		<div className="App">
			<h1>Flash Loan Arbitrage App</h1>
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
						</Form.Group>

						<Button variant="primary" onClick={handleFlashLoan}>
							Execute Flash Loan Arbitrage
						</Button>
					</Form>
				</div>
			) : (
				<p>Loading web3...</p>
			)}
		</div>
	);
};

export default FlashLoanArbitrageApp;
