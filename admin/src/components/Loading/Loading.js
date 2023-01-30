import { SyncLoader } from "react-spinners";
import './loading.scss';

const Loading = () => {
  return (
    <div className='loading-page'>
      <SyncLoader color="#497D3B" size={10} />
    </div>
  );
};

export default Loading;