
import './Loading.scss';
import config from 'config';

const imageUrl = `${config.assets.domain}/loading.jpg`;

export default props => (
  <img className='loading' src={imageUrl} />
);
