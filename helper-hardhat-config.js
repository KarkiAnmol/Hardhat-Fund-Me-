// This module exports an object containing network configuration values that are used by other scripts.
// It includes a dictionary of network configurations, an array of development chain names,
// and constants for the number of decimals and initial answer value for the mock Chainlink Aggregator contract.

const networkConfig = {
  // A dictionary of network configurations with keys as chain IDs and values as objects containing name and ethUsdPriceFeed properties
  11155111: {
    name: "sepolia", // The name of the network
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // The address of the ETH/USD price feed contract on the network
  },
};

const developmentChains = ["hardhat", "localhost"]; // An array of names of development chains
const DECIMALS = 8; // The number of decimals for the mock Chainlink Aggregator contract
const INITIAL_ANSWER = 200000000; // The initial answer value for the mock Chainlink Aggregator contract

// Export the network configuration values as an object
module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
};
