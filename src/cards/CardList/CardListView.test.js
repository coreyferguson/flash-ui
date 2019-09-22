
import React from 'react';
import View from './CardListView';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import CardView from '../CardView';
import Button from '../../Button/Button';

describe('CardListView', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('error thrown when cards is undefined', () => {
    sandbox.stub(console, 'error');
    expect(() => shallow(<View />)).to.throw();
    expect(console.error).to.be.calledOnce;
  });

  it('error thrown when items is undefined', () => {
    sandbox.stub(console, 'error');
    const cards = { items: undefined };
    expect(() => shallow(<View cards={cards} />)).to.throw();
    expect(console.error).to.be.calledOnce;
  });

  it('no cards are rendered when items array is empty', () => {
    const cards = { items: [] };
    const wrapper = shallow(<View cards={cards} />);
    expect(wrapper.find(CardView).length).to.equal(0);
  });

  it('all cards are rendered', () => {
    const cards = {
      items: [
        { id: '1', sideAText: 'sideATextValue1' },
        { id: '2', sideAText: 'sideATextValue2' }
      ]
    };
    const wrapper = shallow(<View cards={cards} />);
    expect(wrapper.find(CardView).length).to.equal(2);
  });

});
