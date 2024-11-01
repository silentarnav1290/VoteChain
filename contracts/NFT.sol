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
    address private mintedAddress;
    uint256 private lastMintedTokenId;
    address _owner;
    // Constructor that passes name and symbol to the ERC721 base constructor
    constructor(address initialOwner) Ownable(initialOwner) ERC721("SimpleNFT", "SNFT") {
        _owner = initialOwner;
        // Initialization logic
    }
    event NftMinted(address indexed to , uint256 indexed tokenid, NFTMetadata metadata);
    event VoteTransferred(address indexed from, address indexed to , uint256 tokenID);
    event voteBurned(uint256 tokenID);
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
        mintedAddress=to;
        lastMintedTokenId=newTokenId;

         emit NftMinted(to,newTokenId,metadata);
        _safeMint(to, newTokenId);

    }
     function getMetadata(uint256 tokenId) public view returns (string memory, string memory, string memory) {
        NFTMetadata memory metadata = tokenIdToMetadata[tokenId];
        return (metadata.name, metadata.description, metadata.imageURL);
    }
    // function burnVote() public {
    //     require(ownerOf(lastMintedTokenId)== mintedAddress,"not owner");
    //     _burn(lastMintedTokenId);
    //     emit voteBurned(lastMintedTokenId);


    // }
    function transfervote( address to  ) public  {
        require(mintedAddress!=address(0),"vote hasnt been transferred");
        require(to!=address(0),"no addresss provided");
        _transfer(mintedAddress, to, lastMintedTokenId);
        emit VoteTransferred(mintedAddress, to, lastMintedTokenId);
    



    }
}