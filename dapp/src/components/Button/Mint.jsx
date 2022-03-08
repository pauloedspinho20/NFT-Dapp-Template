// import startMint from 'hooks/startMint';
import { useEffect } from 'react';
import {
  arrayOf, number, shape, string,
} from 'prop-types';

import { useWeb3Contract } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
// import { Web3Storage, File } from 'web3.storage/dist/bundle.esm.min';
import abi from 'abis/NFTv2.json';
import Button from './Button';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ButtonMint = ({
  amount,
  imgData,
  imgAttributes,
  name,
  description,
}) => {
  const { walletAddress } = useMoralisDapp();

  console.log('imgData', imgData, ' imgAttributes', imgAttributes, 'name', name, 'description', description);

  const {
    data, error, runContractFunction, isFetching, isLoading,
  } = useWeb3Contract();

  const options = {
    abi,
    contractAddress,
    functionName: 'mint',
    params: {
      _to: walletAddress,
      _mintAmount: amount,
    },
  };

  useEffect(() => {
    if (data) {
      console.log('Receipt: ', data);
    }
  }, [ data ]);

  useEffect(() => {
    if (error) {
      console.log('Error: ', error);
    }
  }, [ error ]);

  /*   const startMint = () => {
    //  const ipfs = uploadImageToIPFS(_name, _des, _imgData, _attributes);

  }; */
  return (
    <div>
      <Button
        theme="orange"
        size="s"
        onClick={ () => runContractFunction({ params: options }) }
        disabled={ isFetching }
      >
        { isLoading ? 'Minting...' : 'Mint' }
      </Button>
      { data && <pre>{ JSON.stringify(data) }</pre> }
    </div>
  );
};

ButtonMint.propTypes = {
  amount: number,
  imgData: shape(),
  imgAttributes: arrayOf(shape({
    trait_type: string,
    value: string,
  })),
  name: string,
  description: string,
};

ButtonMint.defaultProps = {
  amount: 1,
  imgData: null,
  imgAttributes: null,
  name: '',
  description: '',
};

export default ButtonMint;
