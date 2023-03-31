// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Importing the Chainlink Aggregator Interface to fetch price data from the Oracle
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Importing the PriceConverter library which includes two internal functions
import "./PriceConverter.sol";

// Custom error message when a function call is not made by the owner of the contract
error NotOwner();

// FundMe smart contract, which allows users to fund the contract in Ether and tracks the amounts funded by each address
contract FundMe {
    // Using the PriceConverter library on uint256, so that we can call its functions on uint256 types
    using PriceConverter for uint256;

    // Mapping that tracks the amount funded by each address
    mapping(address => uint256) public addressToAmountFunded;

    // Array that keeps track of all funders
    address[] public funders;

    // Address of the owner of the contract. This address is immutable, and set in the constructor
    address public /* immutable */ i_owner;

    // Minimum amount of USD equivalent Ether required to fund the contract. This is a constant value
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    AggregatorV3Interface public priceFeed;

    // Constructor function that is called when the contract is deployed. The address of the Chainlink price feed is passed as a parameter
    constructor(address priceFeedAddress) {
        // Set the owner of the contract to the address of the person who deploys the contract
        i_owner = msg.sender;
        priceFeed=AggregatorV3Interface(priceFeedAddress);
    }

    // Function that allows users to fund the contract by sending Ether to the contract
    function fund() public payable {
        // Check if the amount of Ether being sent is enough to meet the minimum USD equivalent
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        
        // Update the mapping to track the amount funded by the sender
        addressToAmountFunded[msg.sender] += msg.value;
        
        // Add the sender to the array of funders
        funders.push(msg.sender);
    }
    
    // Function that fetches the version of the Chainlink price feed
    function getVersion() public view returns (uint256){
        // Create an instance of the Chainlink price feed using the Sepolia Network ETH/USD address
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        
        // Return the version of the price feed
        return priceFeed.version();
    }
    
    // Modifier that only allows the owner of the contract to call certain functions
    modifier onlyOwner {
        // Check if the function is called by the owner
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
    
    // Function that allows the owner of the contract to withdraw all funds from the contract
    function withdraw() public onlyOwner {
        // Iterate through all funders, and set their amounts to 0
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        
        // Reset the array of funders to an empty array
        funders = new address[](0);
        
        // Send all funds in the contract to the owner of the contract
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        // require
    }}