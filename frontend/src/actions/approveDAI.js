import json from "./FlashLoanArbitrage.json";
const { ethers, toNumber } = require("ethers");

// this one is for FlashLoan.sol
const DEPLOYED_CONTRACT_ADDRESS = "0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04";

// for FlashLoanArbitrage.sol
// const DEPLOYED_CONTRACT_ADDRESS = '0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04';

// for Dex.sol
// const DEPLOYED_CONTRACT_ADDRESS = '0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d';

async function getAbi() {
	// const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
	const abi = json.abi;
	//console.log(abi);
	return abi;
}

async function approveDAI(signer, amount) {
	//  amount = amount * (10 ** 18);
	console.log(amount);
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
	let approveDAI = flashloancontract.connect(signer);
	let tx = await approveDAI.approveDAI(
		// amount dalna hai yahan DAI kitna manga
		amount
	);
	await tx.wait();
}

export default approveDAI;
