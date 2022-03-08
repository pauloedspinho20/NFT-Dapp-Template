import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import useGTag from 'hooks/useGTag';
import useModal from 'hooks/useModal';

const ModalConfirmPurchase = () => {
  const { track } = useGTag();

  const confirm = useModal('confirm-purchase');
  const follow = useModal('follow-metamask');

  const { onConfirm, purchase, title } = confirm.show || {};

  const onClose = () => {
    track('cancel_purchase', { purchase });
    confirm.close();
  };

  return (
    <Modal
      name="confirm-purchase"
      onClose={ onClose }
    >
      <div className="popup--title">{ `Confirm ${title} Purchase` }</div>
      <div className="popup--desc">
        { `Are you sure you want to purchase ${purchase}?` }
        <br />
        The transaction may take a couple of minutes to process.
      </div>

      <ul className="popup--actions">
        <li>
          <Button
            className="btn-primary"
            onClick={ async () => {
              track('confirm_purchase', { purchase });

              confirm.close();
              follow.open({ title: `Confirm ${title} Purchase` });
              await onConfirm();
              follow.close();
            } }
            size="m"
            theme="blue-gradient"
          >
            Confirm
          </Button>
        </li>
        <li>
          <Button
            className="btn-secondary"
            onClick={ onClose }
            size="m"
          >
            Cancel
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default ModalConfirmPurchase;
