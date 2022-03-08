import { useEffect, useState } from 'react';
import { useChain } from 'react-moralis';
import Select from 'react-select';
import {
  AvaxLogo, PolygonLogo, BSCLogo, ETHLogo,
} from './Logos';

const menuItems = [
  {
    value: '0x1',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Ethereum
      </div>
    ),
  },
  {
    value: '0x539',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Local Chain
      </div>
    ),
  },
  {
    value: '0x3',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Ropsten Testnet
      </div>
    ),
  },
  {
    value: '0x4',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Rinkeby Testnet
      </div>
    ),
  },
  {
    value: '0x2a',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Kovan Testnet
      </div>
    ),
  },
  {
    value: '0x5',
    label: (
      <div>
        <ETHLogo />
        { ' ' }
        Goerli Testnet
      </div>
    ),
  },
  {
    value: '0x38',
    label: (
      <div>
        <BSCLogo />
        { ' ' }
        Binance
      </div>
    ),
  },
  {
    value: '0x61',
    label: (
      <div>
        <BSCLogo />
        { ' ' }
        Smart Chain Testnet
      </div>
    ),
  },
  {
    value: '0x89',
    label: (
      <div>
        <PolygonLogo />
        { ' ' }
        Polygon
      </div>
    ),
  },
  {
    value: '0x13881',
    label: (
      <div>
        <PolygonLogo />
        { ' ' }
        Mumbai
      </div>
    ),
  },
  {
    value: '0xa86a',
    label: (
      <div>
        <AvaxLogo />
        Avalanche
      </div>
    ),
  },
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const [ selected, setSelected ] = useState(null);

  const handleChange = option => {
    setSelected(option.value);
    switchNetwork(option.value);
  };

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find(item => item.value === chainId);
    setSelected(newSelected);
    return () => {};
  }, [ chainId, chain ]);

  return (
    <Select
      isSearchable={ false }
      value={ selected }
      onChange={ handleChange }
      options={ menuItems }
    />
  );
}

export default Chains;
