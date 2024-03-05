//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./mocks/MinimalERC404.sol";

contract ERC404Factory {
    address[] public list;
    uint public id=0;
    function deploy(address _owner, string memory _name , string memory _symbol, uint8 _decimals) public {
        MinimalERC404 pc= new MinimalERC404(_owner, _name,_symbol, _decimals);
        list.push(address(pc));
        id++;
    }
}