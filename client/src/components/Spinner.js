
import { Blocks } from 'react-loader-spinner';
import './styles/index.css';

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <Blocks
          height="150"
          width="150"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
      />
    </div>
  );
};

export default Spinner;
