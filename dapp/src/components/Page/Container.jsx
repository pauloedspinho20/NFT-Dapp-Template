import { node, string } from 'prop-types';
import classnames from 'classnames';

import './Container.scss';

const PageContainer = ({ className, children }) => (
  <div className={ classnames('container', className) }>
    { children }
  </div>
);

PageContainer.propTypes = {
  children: node,
  className: string,
};

PageContainer.defaultProps = {
  children: null,
  className: '',
};

export default PageContainer;
