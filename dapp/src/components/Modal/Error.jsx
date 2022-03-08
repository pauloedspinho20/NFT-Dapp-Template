import { useEffect } from 'react';

import Button from 'components/Button/Button';
import Image from 'components/Image';
import Modal from 'components/Modal/Modal';

import useConfig from 'hooks/useConfig';
import useErrors from 'hooks/useErrors';
import useModal from 'hooks/useModal';

import promptBNB from './assets/bnb-prompt-coins.png';
import promptFevr from './assets/fevrtoken-prompt-coins.png';

const getTitle = message => {
  switch (message) {
    case 'not approved':
      return 'Transactions Not Approved';
    case 'no fevr':
    case 'no bnb':
      return 'No Balance in Wallet';
    case 'insufficient fevr':
      return 'Not Enough $FEVR Tokens';
    case 'insufficient bnb':
      return 'Not Enough BNB';
    case 'subscribe cancelled':
      return 'Stake Cancelled';
    case 'withdraw cancelled':
      return 'Withdraw Cancelled';
    default:
      return 'Something went wrong';
  }
};

const getMessage = message => {
  switch (message) {
    case 'not approved':
      return 'In order to make purchases on this site, you must approve its transactions in MetaMask.';
    case 'no fevr':
      return 'Please add tokens to your wallet.';
    case 'no bnb':
      return 'Please add BNB to your wallet.';
    case 'insufficient fevr':
      return 'Please add more FEVR tokens to your wallet.';
    case 'insufficient bnb':
      return 'Please add more BNB tokens to your wallet.';
    case 'subscribe cancelled':
      return 'You must confirm the transaction in order to stake.';
    case 'withdraw cancelled':
      return 'You must confirm the transaction in order to withdraw.';
    default:
      return message;
  }
};

const getActionLabel = message => {
  switch (message) {
    case 'no fevr':
      return 'Buy $FEVR Tokens';
    case 'insufficient fevr':
      return 'Buy More $FEVR Tokens';
    case 'no bnb':
      return 'Buy BNB';
    case 'insufficient bnb':
      return 'Buy More BNB';
    default:
      return 'Try Again';
  }
};

const ModalError = () => {
  const { clear, errors } = useErrors();
  const { close, open, show } = useModal('error');
  const { pancakeswap_url: pancakeSwap } = useConfig();

  const getAction = message => {
    switch (message) {
      case 'no fevr':
      case 'insufficient fevr':
        return () => window.open(pancakeSwap);
      case 'no bnb':
      case 'insufficient bnb':
        return () => window.open('https://www.binance.com/en/buy-sell-crypto?channel=hzBankcard&fiat=USD&crypto=BNB');
      default:
        return null;
    }
  };

  useEffect(() => {
    if (errors.length) {
      open();
    }
    else {
      close();
    }
  }, [ close, errors, open, show ]);

  const { message: first } = errors[0] || {};

  return (
    <Modal
      name="error"
      onClose={ clear }
    >
      <div className="popup--title">{ getTitle(first) }</div>

      { errors.map(({ message }, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={ `error-${idx}` }
          className="popup--desc"
        >
          { getMessage(message) }
          { [ 'no fevr', 'insufficient fevr' ].includes(message) && (
            <Image
              alt={ getMessage(message) }
              className="tokens--img"
              src={ promptFevr }
            />
          ) }
          { [ 'no bnb', 'insufficient bnb' ].includes(message) && (
            <Image
              alt={ getMessage(message) }
              className="tokens--img"
              src={ promptBNB }
            />
          ) }
        </div>
      )) }

      <ul className="popup--actions">
        <li>
          <Button
            className="btn-primary"
            onClick={ getAction(first) || clear }
            size="m"
            theme="blue-gradient"
          >
            { getActionLabel(first) }
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default ModalError;
