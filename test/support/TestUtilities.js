
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme'


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

export const expect = chai.expect;
export {default as sinon} from 'sinon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
