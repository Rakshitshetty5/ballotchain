const main = async() => {
    const contractFactory = await ethers.getContractFactory('ElectionContract');
    const contract = await contractFactory.deploy();
    await contract.deployed();
  
    console.log("Contract deployed to: ", contract.address);
}
  
const runMain = async() => {
    try {
      await main();
      process.exit(0);
    } catch(error) {
      console.log(error);
      process.exit(1);
    }
}
  
runMain();

// npx hardhat run scripts/deploy.js --network goerli

//npx hardhat compile
