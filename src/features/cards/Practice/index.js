import View from './PracticeView';
import connect from './PracticeReduxConnector';

export { default as PracticePage } from './PracticePage';
export const PracticeView = View;
export default connect(View);