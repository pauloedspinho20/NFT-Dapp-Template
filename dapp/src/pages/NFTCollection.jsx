import React from 'react';
import { useNFTBalances } from 'react-moralis';
import PageContainer from 'components/Page/Container';
import NFTCard from 'components/NFT/Card';

// import AddressInput from '../components/AddressInput';

function NFTCollection() {
  const { data: NFTBalances } = useNFTBalances();
  const tokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS.toLowerCase() || '';

  return (
    <>
      <PageContainer>
        <div className="row">
          <h2 className="page-main-title">Collection</h2>
        </div>
      </PageContainer>

      <section className="section--collection">
        <PageContainer>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            { NFTBalances?.result && NFTBalances.result.map(nft => {
              if (nft.token_address.toLowerCase() === tokenAddress) {
                return (
                  <NFTCard nft={ nft } />
                );
              }
              return null;
            }) }
          </div>
        </PageContainer>
      </section>

      { /*  <Modal
        title={ `Transfer ${nftToSend?.name || 'NFT'}` }
        visible={ visible }
        onCancel={ () => setVisibility(false) }
        onOk={ () => transfer(nftToSend, amountToSend, receiverToSend) }
        confirmLoading={ isPending }
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={ setReceiver } />
        { nftToSend && nftToSend.contract_type === 'erc1155' && (
          <Input placeholder="amount to send" onChange={ e => handleChange(e) } />
        ) }
      </Modal> */ }
    </>
  );
}

export default NFTCollection;
