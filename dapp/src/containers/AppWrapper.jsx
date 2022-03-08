import { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import ModalConnectWallet from 'components/Modal/ConnectWallet';
import ModalError from 'components/Modal/Error';
import ModalFollowMetamask from 'components/Modal/FollowMetamask';
import ModalStake from 'components/Modal/Stake';
import ModalTransactionSuccessful from 'components/Modal/TransactionSuccessful';
import ModalNoNFT from 'components/Modal/NoNFT';
import ModalWithdraw from 'components/Modal/Withdraw';

import useModal from 'hooks/useModal';

import { maintenanceMessage } from 'config';

const getPageSuffix = pathname => {
  const path = pathname.match(/^\/([a-zA-Z/_-]+)/)?.[1];
  if (!path) {
    return 'staking';
  }

  switch (path) {
    default:
      return path;
  }
};

const AppWrapper = ({ children }) => {
  const [ appClassName, setAppClassName ] = useState('');
  const { pathname } = useLocation();
  const { close: closeCollectible } = useModal('collectible');
  const { close: closePack } = useModal('pack');
  const suffix = getPageSuffix(pathname);

  useEffect(() => {
    setAppClassName(`pg-${suffix}`);

    closeCollectible();
    closePack();

    // Always close the mobile menu on route switch
    document.body.classList.remove('mobile-nav-is-active');
  }, [ closeCollectible, closePack, pathname, suffix ]);

  return (
    <>
      <ModalConnectWallet />
      <ModalError />
      <ModalFollowMetamask />
      <ModalStake />
      <ModalTransactionSuccessful />
      <ModalNoNFT />
      <ModalWithdraw />

      <div className={ classnames('App', appClassName, {
        maintenance: maintenanceMessage !== '',
      }) }
      >
        { children }
      </div>
    </>
  );
};

AppWrapper.propTypes = {
  children: node,
};

AppWrapper.defaultProps = {
  children: null,
};

export default AppWrapper;
