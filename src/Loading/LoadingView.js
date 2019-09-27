
import config from 'config';

export default function LoadingView(props) {
  let className = props.className || '';
  return (
    <div className={className}>
      <div className='img'></div>
    </div>
  );
}
