import json from "./FlashLoanArbitrage.json";
const { ethers, toNumber } = require("ethers");

// this one is for FlashLoan.sol
// const DEPLOYED_CONTRACT_ADDRESS = "0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E";

// for FlashLoanArbitrage.sol
const DEPLOYED_CONTRACT_ADDRESS = '0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04';

// for Dex.sol
// const DEPLOYED_CONTRACT_ADDRESS = '0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d';

async function getAbi() {
	// const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
	const abi = json.abi;
	//console.log(abi);
	return abi;
}

async function allowanceDAI(signer) {
	const abi = await getAbi();
	//   let provider = new ethers.providers.JsonRpcProvider(
	//     `https://rpc.sepolia.org`
	//   );
	// const provider = new ethers.BrowserProvider(window.ethereum);
	// const signer = await provider.getSigner();

	const flashloancontract = new ethers.Contract(
		DEPLOYED_CONTRACT_ADDRESS,
		abi,
		signer
	);
	let getbalance = flashloancontract.connect(signer);
	let tx = await getbalance.getBalance(
		"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
	);
}

export default allowanceDAI;
