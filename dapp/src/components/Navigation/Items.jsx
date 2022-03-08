import { useState } from 'react';
import { bool } from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import { menuLinks } from 'config';

// import useConfig from 'hooks/useConfig';

const NavigationItems = ({ expanded }) => {
  // const { features, howto } = useConfig();
  const [ isShown, setIsShown ] = useState(expanded);

  return menuLinks?.map(
    ({
      label, link, submenu,
    }) => (
      <li key={ label } className={ classnames('nav-item-li', { 'nav-item-has-submenu': submenu }) }>
        { !submenu ? (
          <NavLink
            activeClassName="nav-item--current_page"
            className="nav-item"
            to={ link }
          >
            { label }
          </NavLink>
        ) : (
          <a
            className="nav-item"
            href="/"
            onClick={ e => e.preventDefault() }
            onMouseEnter={ () => submenu && setIsShown(true) }
            onMouseLeave={ () => submenu && setIsShown(expanded) }
          >
            { label }
          </a>
        ) }
        { isShown && submenu && (
          <ul
            className="nav-item-submenu"
          /*   onMouseEnter={ () => submenu && setIsShown(true) }
            onMouseLeave={ () => submenu && setIsShown(expanded) } */
          >
            { submenu.map(item => (
              <li key={ item.label }>
                <NavLink className="nav-item" to={ item.link } activeClassName="active">
                  { item.label }
                </NavLink>
              </li>
            )) }
          </ul>
        ) }
      </li>
    ),
  );
};

NavigationItems.propTypes = {
  expanded: bool,
};

NavigationItems.defaultProps = {
  expanded: false,
};

export default NavigationItems;
