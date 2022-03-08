import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
/* import ERC20Balance from 'components/ERC20Balance';
import ERC20Transfers from 'components/ERC20Transfers'; */
import Header from 'containers/Header/Header';
import NFTCollection from 'pages/NFTCollection';
import Homepage from 'pages/Homepage/Homepage';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Contract from 'pages/Contract/Contract';
import Text from 'antd/lib/typography/Text';

const { Footer } = Layout;

const App = () => {
  const {
    isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isAuthenticated, isWeb3Enabled ]);

  return (
    <div>
      <Router>
        <Header />

        <main id="main-content">
          { !isAuthenticated ? (
            <>Please login using the Authenticate button</>
          ) : (
            <Switch>
              <Route path="/home">
                <Homepage />
              </Route>
              { /*  <Route path="/wallet">
                <ERC20Balance />
                <ERC20Transfers />
              </Route> */ }
              <Route path="/collection">
                <NFTCollection />
              </Route>
              <Route path="/contract">
                <Contract />
              </Route>
              <Route path="/nonauthenticated">
                <>Please login using the Authenticate button</>
              </Route>
            </Switch>
          ) }
        </main>
      </Router>
      <Footer style={ { textAlign: 'center' } }>
        <Text style={ { display: 'block' } }>
          { process.env.REACT_APP_CONTRACT_ADDRESS }
        </Text>
      </Footer>
    </div>
  );
};

export default App;
