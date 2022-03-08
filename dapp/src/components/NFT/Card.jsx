import {
  shape,
} from 'prop-types';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { getExplorer } from 'helpers/networks';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
// import { useMoralis } from 'react-moralis';

// const { Meta } = Card;

const NFTCard = ({ ...props }) => {
  // const { Moralis } = useMoralis();
  const { chainId } = useMoralisDapp();
  // const [ visible, setVisibility ] = useState(false);
  // const [ receiverToSend, setReceiver ] = useState(null);
  // const [ amountToSend, setAmount ] = useState(null);
  // const [ nftToSend, setNftToSend ] = useState(null);
  // const [ isPending, setIsPending ] = useState(false);
  /* const handleTransferClick = nft => {
    setNftToSend(nft);0
    setVisibility(true);
  }; */
  const { nft } = props;
  console.log(nft);
  return (

  /*     <Card
      hoverable
      actions={ [
        <Tooltip title="View On Blockexplorer">
          <FileSearchOutlined
            onClick={ () => window.open(`${getExplorer(chainId)}address/${nft?.token_address}`, '_blank') }
          />
        </Tooltip>,
        <Tooltip title="Transfer NFT">
          <SendOutlined onClick={ () => handleTransferClick(nft) } />
        </Tooltip>,
        <Tooltip title="Sell On OpenSea">
          <ShoppingCartOutlined onClick={ () => console.log('OPENSEA INTEGRATION COMING!') } />
        </Tooltip>,
      ] }
      cover={ (
        <Image
          src={ nft?.token_uri || 'error' }
          alt={ nft?.name }
        />
    ) }
      key={ nft.name + nft.token_address + nft.token_id }
    >
      <Meta title={ nft.name } description={ `#${nft.token_id} ${nft.token_address}` } />
    </Card> */

    <div className="col">
      <div className="card">
        <Image
          src={ nft?.token_uri || 'error' }
          alt={ nft?.name }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">
            { ' ' }
            { nft?.name }
          </h5>
          <p className="card-text">
            { `#${nft.token_id} ${nft.token_address}` }
          </p>

          { /*    <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a> */ }
        </div>
        <div className="card-footer">
          <Button
            size="s"
            title="View On Blockexplorer"
            onClick={ () => window.open(`${getExplorer(chainId)}address/${nft?.token_address}`, '_blank') }
          >
            View on explorer
          </Button>

          <Button
            size="s"
            title="Transfer NFT"
            onClick={ () => console.log(nft) /* handleTransferClick(nft) */ }
          >
            Transfer
          </Button>

          <Button
            size="s"
            title="Sell On OpenSea"
            onClick={ () => console.log('OPENSEA INTEGRATION COMING!') }
          >
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
};

NFTCard.propTypes = {
  nft: shape({}),
};

NFTCard.defaultProps = {
  nft: null,
};

export default NFTCard;
