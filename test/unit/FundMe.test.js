const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", async function () {
  let fundMe;
  beforeEach(async function () {
    // Get the deployer account
    const { deployer } = await getNamedAccounts();

    // Deploy the contract(s) using the deployment fixture
    await deployments.fixture(["all"]);

    // Get an instance of the FundMe contract
    fundMe = await ethers.getContract("FundMe", deployer);

    // Get an instance of the MockV3Aggregator contract
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async function () {
    it(
      // Test that the constructor sets the aggregator address correctly
      ("sets the aggregator addresses correctly",
      async function () {
        // Get the address of the price feed used by the contract
        const response = await fundMe.priceFeed();

        // Check that the address matches the address of the MockV3Aggregator contract
        assert.equal(response, mockV3Aggregator.address);
      })
    );
  });
});
