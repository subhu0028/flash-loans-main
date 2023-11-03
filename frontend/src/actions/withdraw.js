import json from "./FlashLoan.json";
const { ethers } = require("ethers");

const DEPLOYED_CONTRACT_ADDRESS = '0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E';
async function getAbi() {
  // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = json.abi;
  //console.log(abi);
  return abi;
}

async function withdraw(signer) {
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
  let useraction = flashloancontract.connect(signer);
  let tx = await useraction.withdraw(
    "0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E"
  );
  console.log(tx);
}

export default withdraw;
