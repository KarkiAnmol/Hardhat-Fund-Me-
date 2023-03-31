module.exports = async (hre) => {
  //HRE,the hardhat runtime environment is an object containing all the functionality the hardhat exposes when running a task,test or script.

  //getNamedAccounts is a function that returns a promise to an object whose keys are names and values are addresses.A Promise is an object that represents the eventual completion or failure of an asynchronous operation, such as a network request or a file I/O operation. In this case, the Promise returned by getNamedAccounts represents the eventual completion of retrieving the Ethereum addresses associated with the named accounts.When the Promise is resolved, it returns an object that maps the names of the named accounts to their associated Ethereum addresses

  //deployments is an object which contains functions to access past deployments or to save new ones, as well as helpers functions.
  const { getNamedAccounts, deployments } = hre;

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  //attempting to retrieve the current chain ID of the Hardhat network being used for deployment.
  const chainId = network.config.chainId;
};
