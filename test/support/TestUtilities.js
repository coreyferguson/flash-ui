
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme'
import React from 'react';
import sinonChai from 'sinon-chai';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

export const expect = chai.expect;
export {default as sinon} from 'sinon';

import Enzyme, { shallow as enzymeShallow, mount as enzymeMount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
export const shallow = enzymeShallow;
export const mount = enzymeMount;

export const shallowRouter = ({ component, instance }) =>
  enzymeShallow(<MemoryRouter>{instance}</MemoryRouter>).find(component).dive();
export const mountRouter = ({ component, instance }) =>
  enzymeMount(<MemoryRouter>{instance}</MemoryRouter>);

export const mountGraphqlProvider = ({ component, instance, mocks }) =>
  enzymeMount(<MockedProvider mocks={mocks} addTypename={false}>{instance}</MockedProvider>);
