// import json from "./FlashLoanArbitrage.json";
// const { ethers } = require("ethers");

// // this one is for FlashLoan.sol
// const DEPLOYED_CONTRACT_ADDRESS = "0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04";

// // for FlashLoanArbitrage.sol
// //const DEPLOYED_CONTRACT_ADDRESS = '0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04';

// // for Dex.sol
// // const DEPLOYED_CONTRACT_ADDRESS = '0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d';

// async function getAbi() {
// 	// const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
// 	const abi = json.abi;
// 	console.log(0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04);
// 	//console.log(abi);
// 	return abi;
// }

// async function requestfla(signer, amount) {
// 	amount = amount * 1000000;
// 	console.log(amount);
// 	const abi = await getAbi();
// 	console.log(abi);
// 	//   let provider = new ethers.providers.JsonRpcProvider(
// 	//     `https://rpc.sepolia.org`
// 	//   );
// 	// const provider = new ethers.BrowserProvider(window.ethereum);
// 	// const signer = await provider.getSigner();

// 	const flashloancontract = new ethers.Contract(
// 		DEPLOYED_CONTRACT_ADDRESS,
// 		abi,
// 		signer
// 	);
// 	let requestfla = flashloancontract.connect(signer);
// 	console.log(requestfla);
// 	let tx = await requestfla.requestFlashLoan(
// 		"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
// 		// 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8
// 		amount
// 	); //1000000 = 1 USDC
// 	console.log(tx);
// 	await tx.wait();
// }

// export default requestfla;

import json from "./FlashLoanArbitrage.json";
const { ethers } = require("ethers");

// this one is for FlashLoan.sol
const DEPLOYED_CONTRACT_ADDRESS = "0x0f82571D0B64d19f0D1B31b0A4d47a83815c9B64";

// for FlashLoanArbitrage.sol
//const DEPLOYED_CONTRACT_ADDRESS = '0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04';

// for Dex.sol
// const DEPLOYED_CONTRACT_ADDRESS = '0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d';

async function getAbi() {
	const abi = json.abi;
	return abi;
}

async function requestfla(signer, amount) {
	amount = amount * 1000000;
	console.log(amount);
	const abi = await getAbi();
	console.log(abi);
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
	let requestfla = flashloancontract.connect(signer);
	console.log(requestfla);
    let USDCallowance = await requestfla.approveUSDC("10000000");
    let DAIallowance = await requestfla.approveDAI("12000000000000000000");
    await USDCallowance.wait();
    await DAIallowance.wait();
	let tx = await requestfla.requestFlashLoan("0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", "10000000",{
        gasLimit: 30000000,
      }); //1000000 = 1 USDC
	console.log(tx);
	await tx.wait();
}

export default requestfla;