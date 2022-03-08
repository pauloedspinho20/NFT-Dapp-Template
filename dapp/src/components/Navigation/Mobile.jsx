import PageContainer from 'components/Page/Container';
import Wallet from 'components/Wallet/Wallet';

import NavigationItems from './Items';

import './Navigation.scss';

const NavigationMobile = () => (
  <div id="mobile-nav">
    <PageContainer>
      <div className="row">
        <div className="col">
          <nav>
            <ul>
              <NavigationItems expanded />
              <li>
                <Wallet />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </PageContainer>
  </div>
);

export default NavigationMobile;
