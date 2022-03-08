import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from 'helpers/formatters';
import { Card, Modal } from 'antd';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { SelectOutlined } from '@ant-design/icons';
import { getExplorer } from 'helpers/networks';
import { NavLink } from 'react-router-dom';
import Address from './Address/Address';
import Blockie from './Blockie';

const styles = {
  account: {
    height: '42px',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: '12px',
    backgroundColor: 'rgb(244, 244, 244)',
    cursor: 'pointer',
  },
  text: {
    color: '#21BF96',
  },
};

function Account() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  const signingMessage = `Welcome to ${process.env.REACT_APP_SITE_NAME}`;
  if (!isAuthenticated) {
    return (
      <div
        style={ styles.account }
        onClick={ () => authenticate({ signingMessage }) }
        aria-hidden="true"
      >
        <p style={ styles.text }>Authenticate</p>
      </div>
    );
  }

  return (
    <>
      <div style={ styles.account } onClick={ () => setIsModalVisible(true) } aria-hidden="true">
        <div>
          { getEllipsisTxt(walletAddress, 6) }
        </div>
        <Blockie currentWallet scale={ 3 } />
      </div>
      <Modal
        visible={ isModalVisible }
        footer={ null }
        onCancel={ () => setIsModalVisible(false) }
        bodyStyle={ {
          padding: '15px',
          fontSize: '17px',
          fontWeight: '500',
        } }
        style={ { fontSize: '16px', fontWeight: '500' } }
        width="400px"
      >
        Account
        <Card
          style={ {
            marginTop: '10px',
            borderRadius: '1rem',
          } }
          bodyStyle={ { padding: '15px' } }
        >
          <Address
            avatar="left"
            size="6"
            copyable
            style={ { fontSize: '20px' } }
          />
          <div style={ { marginTop: '10px', padding: '0 10px' } }>
            <a
              href={ `${getExplorer(chainId)}/address/${walletAddress}` }
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={ { marginRight: '5px' } } />
              View on Explorer
            </a>
          </div>

          <NavLink to="/erc20balance">💰 Balances </NavLink>
          <NavLink to="/collection">🖼 NFTs </NavLink>
          <NavLink to="/erc20transfers">💸 Transfers </NavLink>
        </Card>
        <Button
          theme="blue"
          size="s"
          onClick={ () => {
            logout();
            setIsModalVisible(false);
          } }
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
