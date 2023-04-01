const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async (hre) => {
  //HRE,the hardhat runtime environment is an object containing all the functionality the hardhat exposes when running a task,test or script.

  //getNamedAccounts is a function that returns a promise to an object whose keys are names and values are addresses.A Promise is an object that represents the eventual completion or failure of an asynchronous operation, such as a network request or a file I/O operation. In this case, the Promise returned by getNamedAccounts represents the eventual completion of retrieving the Ethereum addresses associated with the named accounts.When the Promise is resolved, it returns an object that maps the names of the named accounts to their associated Ethereum addresses

  //deployments is an object which contains functions to access past deployments or to save new ones, as well as helpers functions.
  const { getNamedAccounts, deployments } = hre; // Destructuring the required objects and functions from the hre object

  // Destructuring the deploy and log functions from the deployments object
  const { deploy, log } = deployments;

  // Retrieving the deployer account from the named accounts
  const { deployer } = await getNamedAccounts();

  // Retrieving the current chain ID of the Hardhat network being used for deployment
  const chainId = network.config.chainId;

  // Initializing a variable to store the address of the ETH/USD price feed contract
  let ethUsdPriceFeedAddress;

  // Checking if the current network is a development chain (i.e., one of the chains listed in the developmentChains array)
  if (developmentChains.includes(network.name)) {
    // If so, retrieving the address of the MockV3Aggregator contract from the deployments object
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");

    // If so, retrieving the address of the MockV3Aggregator contract from the deployments object
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    // If the current network is not a development chain, setting the ETH/USD price feed address variable to the address of the price feed contract for the current chain ID
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  // If the current network is not a development chain, setting the ETH/USD price feed address variable to the address of the price feed contract for the current chain ID
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  // Logging a separator string to the console for clarity
  log(".........................................................");
};

// Exporting the tags for this deployment script
module.exports.tags = ["all", "fundme"];
