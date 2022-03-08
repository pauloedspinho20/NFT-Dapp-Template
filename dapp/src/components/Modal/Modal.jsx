import { useEffect } from 'react';
import { func, node, string } from 'prop-types';
import BootstrapModal from 'react-bootstrap/Modal';

import useModal from 'hooks/useModal';

import './Modal.scss';

const Modal = ({
  children, className, name, onClose,
}) => {
  const { close, show } = useModal(name);
  const modalShown = !!show;

  useEffect(() => {
    document.documentElement.classList[modalShown ? 'add' : 'remove']('overlay-is-visible');
  }, [ modalShown ]);

  return (
    <BootstrapModal
      animation={ false }
      className={ className }
      contentClassName="ti"
      dialogClassName="tw"
      onHide={ onClose || close }
      show={ modalShown }
    >
      <div className={ `${className}--container` }>
        <button
          className={ `${className}--close-btn` }
          label="close"
          onClick={ onClose || close }
          type="button"
        />
        <BootstrapModal.Body className={ `${className}--wrapper` }>
          { children }
        </BootstrapModal.Body>
      </div>
    </BootstrapModal>
  );
};

Modal.propTypes = {
  children: node,
  className: string,
  name: string.isRequired,
  onClose: func,
};

Modal.defaultProps = {
  children: null,
  className: 'popup',
  onClose: null,
};

export default Modal;
