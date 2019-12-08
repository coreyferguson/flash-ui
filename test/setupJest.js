import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure Enzyme
Enzyme.configure({ adapter: new Adapter() });

// mock globals
global.fetch = require('jest-fetch-mock');