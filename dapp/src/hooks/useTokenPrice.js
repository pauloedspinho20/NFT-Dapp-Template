import { getWrappedNative } from 'helpers/networks';
import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { c2, tokenValueTxt } from '../helpers/formatters';

const IsNative = address => address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const useTokenPrice = options => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const [ tokenPrice, setTokenPrice ] = useState();

  const fetchTokenPrice = async opts => {
    const { chain, address } = opts;
    const tokenAddress = IsNative(address) ? getWrappedNative(chain) : address;
    console.log('chain', chain, 'address', address, 'tokenAddress', tokenAddress);
    return token
      .getTokenPrice({ chain, address: tokenAddress })
      .then(result => result);
  };
  useEffect(() => {
    if (!options || !isInitialized) return null;
    fetchTokenPrice(options).then(price => {
      price.usdPrice = c2.format(price.usdPrice);
      const { value, decimals, symbol } = price.nativePrice;
      price.nativePrice = tokenValueTxt(value, decimals, symbol);
      setTokenPrice(price);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isInitialized, options ]);

  return { fetchTokenPrice, tokenPrice };
};

export default useTokenPrice;
