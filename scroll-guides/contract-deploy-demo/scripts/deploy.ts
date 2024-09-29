import { ethers } from "hardhat";

async function main() {
    // Deploy the AssetBridge contract
    const AssetBridge = await ethers.getContractFactory("AssetBridge");
    const assetBridge = await AssetBridge.deploy();

    // Wait for the deployment to be confirmed
    await assetBridge.deployed();

    // Log the deployed contract address
    console.log(`AssetBridge deployed to: ${assetBridge.address}`);
    console.log(`Block explorer URL: https://blockscout.scroll.io/address/${assetBridge.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});