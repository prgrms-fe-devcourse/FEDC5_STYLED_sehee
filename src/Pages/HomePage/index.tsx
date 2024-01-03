import { Link } from 'react-router-dom';
import ImageUpload from '@/Components/Common/ImageUpload';

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <Link to="/detail">Detail</Link>
      <ImageUpload
        width="50rem"
        height="50rem"
        fontSize={2}
      />
    </>
  );
};

export default HomePage;
