import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({ children, visible, closeFunction }) {
  if (!visible) {
    return false;
  }

  return ReactDOM.createPortal(
    <Container onClick={closeFunction}>
      {children}
    </Container>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  closeFunction: PropTypes.func,
}
