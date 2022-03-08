import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';

const useERC20Balance = params => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  const [ assets, setAssets ] = useState();

  const fetchERC20Balance = () => account
    .getTokenBalances({ address: walletAddress, chain: params?.chain || chainId })
    .then(result => result);

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance()
        .then(balance => setAssets(balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isInitialized, chainId, walletAddress ]);

  return { fetchERC20Balance, assets };
};

export default useERC20Balance;
