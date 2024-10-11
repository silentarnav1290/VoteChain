// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetadataNFT is ERC721, Ownable{

    struct NFTMetadata {
        string name;
        string description;
        string imageURL;
    }

    // Mapping to store metadata hashes to tokenIds
    mapping(bytes32 => uint256) public metadataToTokenId;
    mapping(uint256 => NFTMetadata) public tokenIdToMetadata;

    uint256 private _currentTokenId = 0;
    address _owner;
    // Constructor that passes name and symbol to the ERC721 base constructor
    constructor(address initialOwner) Ownable(initialOwner) ERC721("SimpleNFT", "SNFT") {
        _owner = initialOwner;
        // Initialization logic
    }

    // Function to mint an NFT with metadata and assign a unique ID based on the metadata
    function mintWithMetadata(address to, string memory name, string memory description, string memory imageURL) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");

        // Create metadata struct
        NFTMetadata memory metadata = NFTMetadata(name, description, imageURL);

        // Generate a unique hash (ID) from the metadata
        bytes32 metadataHash = keccak256(abi.encode(metadata.name, metadata.description, metadata.imageURL));

        // Ensure that the metadata is unique
        require(metadataToTokenId[metadataHash] == 0, "NFT with this metadata already exists");

        // Increment tokenId
        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;

        // Store the metadata hash and associate it with the new tokenId
        metadataToTokenId[metadataHash] = newTokenId;
        tokenIdToMetadata[newTokenId] = metadata;

        // Mint the NFT to the given address
        _safeMint(to, newTokenId);
    }

    // Optional: Retrieve metadata associated with a specific tokenId
    function getMetadata(uint256 tokenId) public view returns (string memory, string memory, string memory) {
        NFTMetadata memory metadata = tokenIdToMetadata[tokenId];
        return (metadata.name, metadata.description, metadata.imageURL);
    }
}
