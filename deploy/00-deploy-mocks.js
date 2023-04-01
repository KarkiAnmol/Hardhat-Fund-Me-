// This script deploys a mock Chainlink Aggregator contract to the local network.
// It uses the Hardhat network configuration to check if the current network is a development chain.
// If it is, it deploys the mock aggregator contract with the specified decimals and initial answer values.

const { network } = require("hardhat");
const {
  developmentChains, // An array of names of development chains
  DECIMALS, // The number of decimals for the mock aggregator contract
  INITIAL_ANSWER, // The initial answer value for the mock aggregator contract
} = require("../helper-hardhat-config"); // A helper file with configuration values

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  // Check if the current network is a development chain
  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");

    // Deploy the mock aggregator contract
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator", // The name of the contract to deploy
      from: deployer, // The address of the deployer
      log: true,
      args: [DECIMALS, INITIAL_ANSWER], // The constructor arguments for the contract
    });

    log("MOCKS DEPLOYED!!");
    log("/n-----------------------------------------/n");
  }
};

// Set the tags for the deployment script
//By including these tags in the code, it makes it easier to deploy only the mocks during testing, which can help speed up the testing process and reduce dependencies on external resources.
module.exports.tags = ["all", "mocks"];
