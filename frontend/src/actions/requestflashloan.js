import json from "./FlashLoan.json";
const { ethers } = require("ethers");

const DEPLOYED_CONTRACT_ADDRESS = '0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E';
// 0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E
async function getAbi() {
  // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = json.abi;
  console.log(0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E)
  //console.log(abi);
  return abi;
}

async function requestflashloan(signer, amount) {
  amount = amount * 1000000;
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
  let requestflashloan = flashloancontract.connect(signer);
  let tx = await requestflashloan.requestFlashLoan(
    "0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E",
    amount
  ); //1000000 = 1 USDC
  await tx.wait();
}

export default requestflashloan;
