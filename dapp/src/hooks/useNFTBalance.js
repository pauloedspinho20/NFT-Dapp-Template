import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import { useEffect, useState } from 'react';
import { /* useMoralis, */ useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis';
import useIpfs from 'hooks/useIpfs';

const useNFTBalance = options => {
  const { account } = useMoralisWeb3Api();
  // const { walletAddress } = useMoralis();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIpfs();
  const [ NFTCollection, setNFTBalance ] = useState([]);
  const {
    fetch: getNFTBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTs, { chain: chainId, ...{ ...options } });

  useEffect(() => {
    if (data?.result) {
      const NFTs = data.result;

      NFTs.map(nft => {
        if (nft?.metadata) {
          nft.metadata = JSON.parse(nft.metadata);
          // metadata is a string type
          nft.image = resolveLink(nft.metadata?.image);
        }
        return null;
      });
      setNFTBalance(NFTs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ]);

  return {
    getNFTBalance, NFTCollection, error, isLoading,
  };
};

export default useNFTBalance;
