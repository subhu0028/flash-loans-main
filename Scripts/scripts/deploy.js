const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy(
    "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A" //PoolAddressesProvider-Aave 
  );

  await flashLoan.waitForDeployment();

  console.log("Flash loan contract deployed: ", flashLoan.target);
  // 0xb4b0Af2d96E2859E8413b7937E3E9eB29CC4Df4E
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});