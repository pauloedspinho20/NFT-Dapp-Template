import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "TheSpades",
  tokenName: "TheSpades",
  tokenSymbol: "SPADE",
  hiddenMetadataUri:
    "ipfs://Qmb5Pb2z6CEh89trbBns9wArULxTFQBNeic7vDiqiiD6YA/hidden.json",
  maxSupply: 25,
  whitelistSale: {
    price: 0.01,
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 0.02,
    maxMintAmountPerTx: 2,
  },
  publicSale: {
    price: 0.05,
    maxMintAmountPerTx: 5,
  },
  contractAddress: "0xd7b8230432D23b1Efa8C3e83031061506b0010BB",
  openSeaSlug: "thespades",
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
