// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import  {Test} from  "../lib/forge-std/src/Test.sol";
import "../src/NFT.sol";

contract MetadataNFTTest is Test {
    MetadataNFT public nft;
    address public owner;
    address public user1;
    address public user2;

    // Set up addresses using makeAddr
    function setUp() public {
        // Create test addresses using makeAddr
        owner = makeAddr("owner");
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");

        // Deploy the contract
        nft = new MetadataNFT(owner);
    }

    // Test for minting NFT with metadata
    function testMintWithMetadata() public {
        string memory name = "NFT #1";
        string memory description = "First NFT";
        string memory imageURL = "https://example.com/nft1.png";

        // Mint NFT to user1
        vm.prank(owner); // Only the owner can mint NFTs
        nft.mintWithMetadata(user1, name, description, imageURL);

        // Check if the NFT count for user1 has increased to 1
        uint256 user1NFTCount = nft.getNFTCount(user1);
        assertEq(user1NFTCount, 1, "User1 should have 1 NFT");

        // Check if the metadata is correctly stored
        (string memory mintedName, string memory mintedDescription, string memory mintedImageURL) = nft.getMetadata(1);
        assertEq(mintedName, name, "NFT name should match");
        assertEq(mintedDescription, description, "NFT description should match");
        assertEq(mintedImageURL, imageURL, "NFT imageURL should match");
    }

    // Test for transferring vote (NFT transfer)
    function testTransferVote() public {
        string memory name = "NFT #2";
        string memory description = "Second NFT";
        string memory imageURL = "https://example.com/nft2.png";

        // Mint NFT to user1
        vm.prank(owner);
        nft.mintWithMetadata(user1, name, description, imageURL);

        // Check initial NFT counts
        uint256 user1NFTCountBefore = nft.getNFTCount(user1);
        uint256 user2NFTCountBefore = nft.getNFTCount(user2);

        // Transfer the NFT (vote) from user1 to user2
        vm.prank(user1); // Simulate that user1 is calling the transfer function
        nft.transfervote(user2);

        // Check NFT counts after transfer
        uint256 user1NFTCountAfter = nft.getNFTCount(user1);
        uint256 user2NFTCountAfter = nft.getNFTCount(user2);

        // User1 should have lost 1 NFT and User2 should have gained 1 NFT
        assertEq(user1NFTCountAfter, user1NFTCountBefore - 1, "User1 NFT count should decrease by 1");
        assertEq(user2NFTCountAfter, user2NFTCountBefore + 1, "User2 NFT count should increase by 1");
    }

    // Test minting by non-owner (should revert)
    function testMintByNonOwner() public {
        string memory name = "NFT #3";
        string memory description = "Third NFT";
        string memory imageURL = "https://example.com/nft3.png";

        vm.expectRevert("Ownable: caller is not the owner"); // Expect revert due to ownership restriction
        vm.prank(user1); // Simulate user1 trying to mint
        nft.mintWithMetadata(user1, name, description, imageURL);
    }

    // Test transferring NFT (vote) by non-owner (should revert)
    function testTransferVoteByNonOwner() public {
        string memory name = "NFT #4";
        string memory description = "Fourth NFT";
        string memory imageURL = "https://example.com/nft4.png";

        // Mint NFT to user1
        vm.prank(owner);
        nft.mintWithMetadata(user1, name, description, imageURL);

        // Expect revert when user2 tries to transfer the NFT from user1
        vm.expectRevert("Vote hasnt been transferred");
        vm.prank(user2); // Simulate user2 trying to transfer the vote
        nft.transfervote(user2);
    }
}
