import { useRef, useState, useEffect } from 'react';
import { getRandomColor } from 'helpers/functions';
// import { useWeb3Contract } from 'react-moralis';

// import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
// import { Web3Storage, File } from 'web3.storage/dist/bundle.esm.min';
// import useMint from 'hooks/useMint';
import Button from 'components/Button/Button';
import ButtonMint from 'components/Button/Mint';
// import abi from 'abis/NFTv2.json';
import Canvas from './Canvas';

// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
// const ipfsBaseUrl = process.env.REACT_APP_IPFS_URL;
// const { walletAddress } = useMoralisDapp();
// const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_API_TOKEN });

const MintCanvas = () => {
  const elementRef = useRef();

  const backgroundColor = getRandomColor();

  const penColor = '#37393a';

  const [ name, setName ] = useState('New NFT');
  const [ description, setDescription ] = useState('Test NFT minting!');
  const [ imgData, setImgData ] = useState(null);
  const [ imgAttributes, setImgAttributes ] = useState(null);

  /*
  * Clear all drawings on canvas
  */
  const clearCanvas = () => {
    const canvasEl = elementRef.current;
    canvasEl.clear();
  };

  /*
* Upload iamge to IPFS
*/
  /* const uploadImageToIPFS = async (_name, _des, _imgData, _attributes) => {
    const imgFilename = 'test.jpg';
    const imgFiles = [
      new File([ _imgData ], imgFilename),
    ];
    const imgCID = await client.put(imgFiles);

    const imgURL = `${ipfsBaseUrl}/${imgCID}/${imgFilename}`;
    const metadataObj = {
      name: _name,
      description: _des,
      image: imgURL,
      animation_url: imgURL,
      external_url: 'https://site.com',
      attributes: _attributes,
    };

    const metadataFiles = [
      new File([ JSON.stringify(metadataObj) ], 'test.json'),
    ];

    const metadataCID = await client.put(metadataFiles);
    return metadataCID;
  }; */
  /*
  * Start minting process
  */

  useEffect(() => {
    console.log('wefwefwefwefwef');
    setImgAttributes([
      {
        trait_type: 'Background Color',
        value: backgroundColor,
      },
      {
        trait_type: 'Pencil Color',
        value: penColor,
      },
    ]);
  }, [ backgroundColor, penColor ]);

  return (
    <div className="canvas">
      <div className="d-flex justify-content-center mb-4">
        { backgroundColor && penColor && (
        <Canvas
          elementRef={ elementRef }
          backgroundColor={ backgroundColor }
          penColor={ penColor }
          canvasImgData={ data => {
            console.log('IMGEEEEEEE', data);
            setImgData(data);
          } }
        />
        ) }
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <label htmlFor="nft-name" className="form-label">NFT Name</label>
          <div className="input-group mb-3">
            <input
              id="nft-name"
              type="text"
              value={ name }
              className="form-control"
              placeholder="NFT name"
              aria-label="NFT name"
              onChange={ ({ target: { value } }) => {
                setName(value);
              } }

            />
          </div>

          <label htmlFor="nft-description" className="form-label">NFT Description</label>
          <div className="input-group mb-3">
            <input
              id="nft-description"
              type="text"
              value={ description }
              className="form-control"
              placeholder="NFT description"
              aria-label="NFT description"
              onChange={ ({ target: { value } }) => {
                setDescription(value);
              } }

            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <Button
          theme="blue"
          size="s"
          onClick={ e => {
            e.preventDefault();
            clearCanvas();
          } }
          className="me-4"
        >
          Clear
        </Button>

        <ButtonMint
          amount={ 1 }
          imgData={ imgData }
          imgAttributes={ imgAttributes }
          name={ name }
          description={ description }
        />
      </div>
    </div>

  );
};

export default MintCanvas;
