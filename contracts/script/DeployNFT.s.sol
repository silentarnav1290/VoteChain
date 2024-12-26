// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import {Script} from "../lib/forge-std/src/Script.sol";
import {MetadataNFT} from "../src/NFT.sol";

contract DeployNFT is Script{

    function run() external returns(MetadataNFT){
        vm.startBroadcast();
        MetadataNFT metaNFT = new MetadataNFT(msg.sender);
        vm.stopBroadcast();
        return metaNFT;
    }
}


