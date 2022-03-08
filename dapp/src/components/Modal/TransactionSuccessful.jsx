import { useHistory } from 'react-router-dom';

import Button from 'components/Button/Button';
import ButtonViewTransaction from 'components/Button/ViewTransaction';
import Image from 'components/Image';
import Modal from 'components/Modal/Modal';

import useModal from 'hooks/useModal';

const ModalTransactionSuccessful = () => {
  const { close, open, show } = useModal('transaction-successful');
  const history = useHistory();

  const top = show?.length ? show[0] : {};

  const {
    image, imageClassName, message, title, transactionHash,
  } = top;

  const onClose = () => {
    if (show?.length > 1) {
      open(show.slice(1));
    }
    else {
      close();
    }
  };

  return (
    <Modal
      name="transaction-successful"
      onClose={ onClose }
    >
      <div className="popup--title">{ title }</div>
      <div className="popup--desc">
        { message }
        { (!!image) && (
          <Image
            alt={ title }
            className={ imageClassName }
            src={ image }
          />
        ) }
      </div>

      <ul className="popup--actions">
        <li>
          <ButtonViewTransaction transactionHash={ transactionHash } />
        </li>
        <li>
          <Button
            className="btn-secondary"
            onClick={ () => {
              onClose();
              history.push('/my-colleciton');
            } }
            size="m"
            to="/my-collection"
          >
            Go To My Collection
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default ModalTransactionSuccessful;
