// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Verification {

    struct Record {
        string hash;
        uint256 timestamp;
    }

    mapping(string => Record) public records;

    function storeHash(
        string memory verificationId,
        string memory hash
    ) public {

        records[verificationId] = Record(
            hash,
            block.timestamp
        );
    }

    function getRecord(
        string memory verificationId
    )
        public
        view
        returns (
            string memory,
            uint256
        )
    {
        Record memory r = records[verificationId];

        return (
            r.hash,
            r.timestamp
        );
    }
}
