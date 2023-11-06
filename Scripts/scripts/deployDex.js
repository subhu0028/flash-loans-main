const hre = require("hardhat");

async function main() {
	console.log("deploying...");
	const Dex = await hre.ethers.getContractFactory("Dex");
	const dex = await Dex.deploy();

    await dex.waitForDeployment();

	//await dex.deployed();

	console.log("Dex contract deployed: ", dex.address);
    // undefined 
    console.log(dex.target);
    // 0x31904f5D0F5baB5aF2e2ebCE1c21Ae94bB55ab4d
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});


