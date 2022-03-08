import { useEffect } from 'react';
import ButtonConnectWallet from 'components/Button/ConnectWallet';
import IconMetamask from 'components/Icon/Metamask/Metamask';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import Modal from 'components/Modal/Modal';

import useBepro, { updateConnection } from 'hooks/useBepro';
import useModal from 'hooks/useModal';

import ImgNetworkSwitch from './assets/binance-network-switch.svg';

const ModalConnectWallet = () => {
  const {
    connected, networkActive, networkWanted,
  } = useBepro();
  const { close, open, show } = useModal('connect-wallet');

  useEffect(() => {
    if (connected && show) {
      if (networkActive !== networkWanted) {
        if (!show.wrongNetwork) {
          open({
            ...show,
            wrongNetwork: true,
          });
        }
        return;
      }

      if (show.onClose) {
        show.onClose();
      }
      close();
    }
  }, [ close, connected, networkActive, networkWanted, open, show ]);

  useEffect(() => {
    if (show?.wrongNetwork) {
      const intervalId = setInterval(updateConnection, 250);
      return () => clearInterval(intervalId);
    }

    return () => {};
  }, [ show?.wrongNetwork ]);

  return (
    <Modal
      name="connect-wallet"
      onClose={ () => {
        if (show.onClose) {
          show.onClose();
        }
        close();
      } }
    >
      { show?.wrongNetwork && (
        <>
          <div className="popup--title">Your wallet is currently in the wrong network</div>
          <div className="popup--desc">
            <Image
              className="network-switch--img"
              src={ ImgNetworkSwitch }
            />
            <br />
            Please switch your wallet network to
            { ' ' }
            <strong>Binance Smart Chain</strong>
            .
            <br />
            { 'Learn how to ' }
            <a
              href="https://help.idex.io/en/articles/4852233-how-to-switch-networks-on-metamask"
              rel="noopener noreferrer"
              target="_blank"
            >
              change network in wallet
            </a>
            .
          </div>
        </>
      ) }

      { !show?.wrongNetwork && (
        <>
          <div className="popup--title">Connect your wallet</div>
          <div className="popup--desc">
            { 'By connecting your wallet, you agree to our ' }
            <Link to="/terms-conditions">Terms of Service</Link>
            { ' and our ' }
            <Link to="/privacy-policy">Privacy Policy</Link>
            .
          </div>

          <ul className="popup--actions wallet-actions">
            <li>
              <ButtonConnectWallet
                label="MetaMask"
                theme="orange-gradient"
                wallet="metamask"
              >
                <IconMetamask />
              </ButtonConnectWallet>
            </li>
          </ul>
        </>
      ) }
    </Modal>
  );
};

export default ModalConnectWallet;
