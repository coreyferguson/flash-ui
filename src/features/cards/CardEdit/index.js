import View from './CardEditView';
import connect from './CardEditReduxConnector';

export { default as CardEditPage } from './CardEditPage';
export const CardEditView = View;
export default connect(View);