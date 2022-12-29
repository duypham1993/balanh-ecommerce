import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className='p-5 text-center'>
      <SyncLoader color="#497D3B" size={10} />
    </div>
  );
};

export default Loading;