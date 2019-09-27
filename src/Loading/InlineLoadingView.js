
import style from './InlineLoadingStyle';

export function InlineLoadingView(props) {
  const className = props.className || '';
  return (
    <div className={className}>
      <div className='img'></div>
    </div>
  );
}

export default style(InlineLoadingView);
