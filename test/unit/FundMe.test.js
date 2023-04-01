// Importing required dependencies from Hardhat
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

// Creating a new test suite named "FundMe"
describe("FundMe", async function () {
  // Defining variables to be used across the test cases
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  const sendValue = ethers.utils.parseEther("1"); // 1 ETH

  // Executed before each test case in the suite
  beforeEach(async function () {
    // Get the deployer account from named accounts
    const { deployer } = await getNamedAccounts();

    // Deploy the contract(s) using the deployment fixture
    await deployments.fixture(["all"]);

    // Get an instance of the FundMe contract
    fundMe = await ethers.getContract("FundMe", deployer);

    // Get an instance of the MockV3Aggregator contract
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  // Creating a new test suite for the constructor function of FundMe
  describe("constructor", async function () {
    // Creating a new test case to check if the constructor sets the aggregator address correctly
    it("sets the aggregator addresses correctly", async function () {
      // Get the address of the price feed used by the contract
      const response = await fundMe.priceFeed();

      // Check that the address matches the address of the MockV3Aggregator contract
      assert.equal(response, mockV3Aggregator.address);
    });
  });

  // Creating a new test suite for the fund function of FundMe
  describe("fund", async function () {
    // Creating a new test case to check if the function reverts when not enough ETH is sent
    it("fails when you dont send enough ETH", async function () {
      await expect(fundMe.fund()).to.be.revertedWith("You must spend more ETH");
    });

    // Creating a new test case to check if the amount funded data structure is updated correctly
    it("updates the amount funded data structure", async function () {
      // Fund the contract with 1 ETH
      await fundMe.fund({ value: sendValue });

      // Check if the amount funded for the deployer address is 1 ETH
      const response = await fundMe.addressToAmountFunded(deployer);
      assert.equal(response.toString(), sendValue.toString());
    });

    // Creating a new test case to check if the funder address is added to the array of funders correctly
    it("Adds funder to array of funders", async function () {
      // Fund the contract with 1 ETH
      await fundMe.fund({ value: sendValue });

      // Get the first funder address from the array of funders
      const funder = await fundMe.funders(0);

      // Check if the funder address matches the deployer address
      assert.equal(funder, deployer);
    });
  });
});
