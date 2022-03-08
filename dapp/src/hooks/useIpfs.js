import { useCallback } from 'react';

import { ipfsUrl } from 'config';

const useIpfs = () => useCallback(url => (url?.src || url)?.replace(/^ipfs:\/\/ipfs\//, ipfsUrl), []);

export default useIpfs;
