import {
  string, bool,
} from 'prop-types';
import Blockies from 'react-blockies';
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider';

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie({ ...props }) {
  const { walletAddress } = useMoralisDapp();
  if ((!props.address && !props.currentWallet) || !walletAddress) return null;

  return (
    <Blockies
      seed={ props.currentWallet ? walletAddress.toLowerCase() : props.address.toLowerCase() }
      className="identicon"
      { ...props }
    />
  );
}

Blockie.propTypes = {
  address: string,
  currentWallet: bool,

};

Blockie.defaultProps = {
  address: '',
  currentWallet: false,
};

export default Blockie;
