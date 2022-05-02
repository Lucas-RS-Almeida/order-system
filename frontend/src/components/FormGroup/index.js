import { Container } from './styles';

import PropTypes from 'prop-types';

export default function FormGroup({ children, error }) {
  return (
    <Container error={error}>
      { children }
      {error && <span>{error}</span>}
    </Container>
  )
}

FormGroup.propTypes = {
  childre: PropTypes.node,
  error: PropTypes.string,
}

FormGroup.defaultProps = {
  error: '',
}
