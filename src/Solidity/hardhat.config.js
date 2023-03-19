require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "ekTjwBQsPRukcbYocs1U4kuXzsNW_crN";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
  });

const GOERLI_PRIVATE_KEY = "0b58142f55192cc62cc8adfd1c5b47dfbdcdf058e22a3f6092f7209af6a5ebf3";

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};