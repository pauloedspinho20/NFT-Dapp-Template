import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import useNativeTransactions from 'hooks/useNativeTransactions';
import 'antd/dist/antd.css';
import { Skeleton, Table } from 'antd';
import { getEllipsisTxt } from '../../helpers/formatters';
import styles from './styles';

function NativeTransactions() {
  const { nativeTransactions, chainId } = useNativeTransactions();
  const { Moralis } = useMoralis();
  let blockchainScanner = '';

  if (chainId === '0x1') {
    blockchainScanner = 'https://etherscan.io/tx/';
  }
  else if (chainId === '0x38') {
    blockchainScanner = 'https://bscscan.com/tx/';
  }
  else if (chainId === '0x89') {
    blockchainScanner = 'https://polygonscan.com/tx/';
  }
  else {
    blockchainScanner = 'https://explorer.avax.network/search?query=';
  }

  useEffect(() => {
    console.log(nativeTransactions);
  }, [ nativeTransactions ]);
  const columns = [
    {
      title: 'From',
      dataIndex: 'from_address',
      key: 'from_address',
      render: from => (
        getEllipsisTxt(from, 5)
      ),
    },
    {
      title: 'To',
      dataIndex: 'to_address',
      key: 'to_address',
      render: to => (
        getEllipsisTxt(to, 5)
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: value => (
        // missing second argument in FromWei, decimals
        parseFloat(Moralis.Units.FromWei(value).toFixed(6))
      ),
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: hash => (
        <a
          href={ blockchainScanner + hash }
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      ),
    },
  ];

  let key = 0;
  return (
    <div>
      <h1 style={ styles.title }>💸Native Transactions</h1>
      <Skeleton loading={ !nativeTransactions || nativeTransactions.length === 0 }>
        <Table
          dataSource={ nativeTransactions }
          columns={ columns }
          rowKey={ record => {
            key++;
            return `${record.transaction_hash}-${key}`;
          } }
        />
      </Skeleton>
    </div>
  );
}

export default NativeTransactions;
