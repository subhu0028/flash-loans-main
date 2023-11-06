const hre = require("hardhat");

async function main() {
	console.log("deploying...");
	const FlashLoanArbitrage = await hre.ethers.getContractFactory(
		"FlashLoanArbitrage"
	);
	const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
        "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A"  //PoolAddressesProvider-Aave 
		//"0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D"
	);

	//await flashLoanArbitrage.deployed();

    await flashLoanArbitrage.waitForDeployment();

	console.log("Flash loan contract deployed: ", flashLoanArbitrage.target);
    // 0x54eCe15cd1681877c1a981D4Cb66cEF84BA5eD04
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
