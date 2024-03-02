//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./BaseERC404.sol";

contract ERC404Factory {
    address[] public list;
    uint public id=0;
    function deploy(address _owner, string memory _name , string memory _symbol, uint8 _decimals) public {
        BaseERC404 pc= new BaseERC404(_owner, _name,_symbol, _decimals);
        list.push(address(pc));
        id++;
    }
}