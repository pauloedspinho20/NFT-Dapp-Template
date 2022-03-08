import { node } from 'prop-types';

import './Description.scss';

const PageDescription = ({ children }) => (
  <h4 className="page-main-description">{ children }</h4>
);

PageDescription.propTypes = {
  children: node,
};

PageDescription.defaultProps = {
  children: null,
};

export default PageDescription;
