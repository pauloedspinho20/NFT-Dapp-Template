import { useNativeBalance } from 'react-moralis';

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);

  return <div className="d-flex align-items-center justify-content-center me-4">{ balance.formatted }</div>;
}

export default NativeBalance;
