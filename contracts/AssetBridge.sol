// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetBridge is Ownable {
    struct Asset {
        address owner;
        address contractAddress;
        uint256 tokenId;
        uint256 collateralValue;
        bool isCollateralized;
    }

    struct Rental {
        address renter;
        uint256 rentalPeriod;
        uint256 rentalStart;
        bool isActive;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public assetCount;

    mapping(uint256 => Rental) public rentals;

    event AssetBridged(
        uint256 indexed assetId,
        address indexed user,
        address contractAddress,
        uint256 tokenId
    );

    event AssetCollateralized(
        uint256 indexed assetId,
        address indexed user,
        uint256 collateralValue
    );

    event AssetRentalStarted(
        uint256 indexed assetId,
        address indexed renter,
        uint256 rentalPeriod
    );

    event AssetRentalEnded(
        uint256 indexed assetId,
        address indexed renter
    );

    // Constructor that sets the initial owner
    constructor() Ownable(msg.sender) {
    }

    function bridgeAsset(address _contractAddress, uint256 _tokenId) external {
        IERC721(_contractAddress).transferFrom(msg.sender, address(this), _tokenId);
        assets[assetCount] = Asset({
            owner: msg.sender,
            contractAddress: _contractAddress,
            tokenId: _tokenId,
            collateralValue: 0,
            isCollateralized: false
        });
        emit AssetBridged(assetCount, msg.sender, _contractAddress, _tokenId);
        assetCount++;
    }

    function collateralizeAsset(uint256 _assetId, uint256 _value) external {
        Asset storage asset = assets[_assetId];
        require(asset.owner == msg.sender, "Not the asset owner");
        require(!asset.isCollateralized, "Asset already collateralized");

        asset.collateralValue = _value;
        asset.isCollateralized = true;

        emit AssetCollateralized(_assetId, msg.sender, _value);
    }

    function rentAsset(uint256 _assetId, uint256 _rentalPeriod) external payable {
        Asset storage asset = assets[_assetId];
        require(asset.owner != msg.sender, "Owner cannot rent their own asset");
        require(asset.isCollateralized, "Asset not collateralized");
        require(msg.value > 0, "Rental payment required");

        Rental storage currentRental = rentals[_assetId];
        require(!currentRental.isActive, "Asset already rented");

        rentals[_assetId] = Rental({
            renter: msg.sender,
            rentalPeriod: _rentalPeriod,
            rentalStart: block.timestamp,
            isActive: true
        });

        emit AssetRentalStarted(_assetId, msg.sender, _rentalPeriod);
    }

    function endRental(uint256 _assetId) external {
        Rental storage rental = rentals[_assetId];
        Asset storage asset = assets[_assetId];

        require(rental.isActive, "No active rental for this asset");
        require(
            msg.sender == rental.renter || msg.sender == asset.owner,
            "Only renter or owner can end the rental"
        );

        rental.isActive = false;

        emit AssetRentalEnded(_assetId, rental.renter);
    }

    function withdrawAsset(uint256 _assetId) external onlyOwner {
        Asset storage asset = assets[_assetId];
        require(asset.owner != address(0), "Asset does not exist");

        IERC721(asset.contractAddress).transferFrom(address(this), asset.owner, asset.tokenId);

        // Reset asset details
        asset.owner = address(0);
        asset.contractAddress = address(0);
        asset.tokenId = 0;
        asset.collateralValue = 0;
        asset.isCollateralized = false;

        Rental storage rental = rentals[_assetId];
        if (rental.isActive) {
            rental.isActive = false;
            emit AssetRentalEnded(_assetId, rental.renter);
        }
    }
}