// types/AssetBridge.ts
import { BigNumber, ContractTransaction, Event } from 'ethers';

export interface Asset {
  owner: string;
  contractAddress: string;
  tokenId: BigNumber;
  collateralValue: BigNumber;
  isCollateralized: boolean;
}

export interface Rental {
  renter: string;
  rentalPeriod: BigNumber;
  rentalStart: BigNumber;
  isActive: boolean;
}

export interface AssetBridge extends ethers.Contract {
  // Functions
  bridgeAsset(_contractAddress: string, _tokenId: BigNumber): Promise<ContractTransaction>;
  collateralizeAsset(_assetId: BigNumber, _value: BigNumber): Promise<ContractTransaction>;
  rentAsset(_assetId: BigNumber, _rentalPeriod: BigNumber, overrides?: { value: BigNumber }): Promise<ContractTransaction>;
  endRental(_assetId: BigNumber): Promise<ContractTransaction>;
  withdrawAsset(_assetId: BigNumber): Promise<ContractTransaction>;

  // Read-only functions
  assets(arg0: BigNumber): Promise<Asset>;
  assetCount(): Promise<BigNumber>;
  rentals(arg0: BigNumber): Promise<Rental>;

  // Events
  on(eventName: 'AssetBridged', listener: (assetId: BigNumber, user: string, contractAddress: string, tokenId: BigNumber) => void): this;
  on(eventName: 'AssetCollateralized', listener: (assetId: BigNumber, user: string, collateralValue: BigNumber) => void): this;
  on(eventName: 'AssetRentalStarted', listener: (assetId: BigNumber, renter: string, rentalPeriod: BigNumber) => void): this;
  on(eventName: 'AssetRentalEnded', listener: (assetId: BigNumber, renter: string) => void): this;
}
