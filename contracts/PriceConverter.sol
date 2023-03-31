// SPDX-License-Identifier: MIT
// Specifies the license that applies to this code.
// SPDX is a standard format for recording SPDX License Identifiers.

pragma solidity ^0.8.9;

// Import the interface of the Chainlink Aggregator contract.
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// A library in Solidity is a reusable set of functions that can be called
// by other contracts or libraries. This library is used to convert an Ethereum
// amount to an equivalent amount in US dollars based on the current ETH/USD price.
// The functions in this library are not meant to be deployed as a standalone contract,
// but can be called by other contracts or libraries that import it.

library PriceConverter {
    // This function is marked as internal, which means it can only be called by
    // other functions within this library or by contracts that inherit from this library.
    // It retrieves the current ETH/USD price from the Chainlink Aggregator contract.
    // The price is returned as a uint256 value representing the price in 18 decimal places.
    // For example, if the ETH/USD price is 3000, the function will return 3000000000000000000.
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // Create a new instance of the Aggregator contract interface, passing in the address
        // of the Aggregator contract for the Sepolia ETH/USD price feed on the testnet.
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        // Call the latestRoundData function on the Aggregator contract to retrieve the latest
        // ETH/USD price data. The function returns a tuple of values, but we're only interested
        // in the second value, which is the current price in 18 decimal places.
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        // Convert the price to a uint256 value by multiplying it by 10^10.
        // This removes the 18 decimal places from the price, making it a whole number.
        return uint256(answer * 10000000000);
        // Alternatively, we could use scientific notation to write 10^10 as 1e10:
        // return uint256(answer * 1e10);
    }

    // This function is marked as internal, which means it can only be called by
    // other functions within this library or by contracts that inherit from this library.
    // It takes an Ethereum amount in wei as input and returns an equivalent amount in US dollars.
    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // Retrieve the current ETH/USD price by calling the getPrice function defined above.
        uint256 ethPrice = getPrice(priceFeed);
        // Convert the input Ethereum amount to an equivalent amount in US dollars by multiplying
        // it by the current ETH/USD price and dividing by 10^18.
        // This assumes that the input Ethereum amount is in wei (the smallest unit of Ethereum).
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        // Alternatively, we could use scientific notation to write 10^18 as 1e18:
        // uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        // Return the equivalent amount in US dollars as a uint256 value.
        return ethAmountInUsd;
    }
}
