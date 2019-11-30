
import React from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import { EditCardView } from './EditCardView';

describe('EditCardView', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('card without id should show "create" title', () => {
    const wrapper = shallow(<EditCardView onSave={sinon.spy()} />);
    expect(wrapper.find('form h1').text()).to.equal('create a card');
  });

  it('card with id should show "edit" title', () => {
    const card = { id: 'idValue' };
    const wrapper = shallow(<EditCardView card={card} onSave={sinon.spy()} />);
    expect(wrapper.find('form h1').text()).to.equal('edit card');
  });

  it('should throw error when onSave is not provided', () => {
    sandbox.stub(console, 'error');
    expect(() => shallow(<EditCardView />)).to.throw;
  });

  it('onSave called after some updates', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<EditCardView onSave={spy} />);
    const onChangeOfSide1 = wrapper.find({ sideName: '1' }).props().onChange;
    const onChangeOfSide2 = wrapper.find({ sideName: '2' }).props().onChange;
    const side1 = { text: 'side A text value', imageUrl: 'side A image value' };
    const side2 = { text: 'side B text value', imageUrl: 'side B image value' };
    onChangeOfSide1(side1);
    onChangeOfSide2(side2);
    const onSubmit = wrapper.find('form').props().onSubmit;
    onSubmit({ preventDefault: () => {} });
    expect(spy).to.be.calledWith({
      sideAImageUrl: 'side A image value',
      sideAText: 'side A text value',
      sideBImageUrl: 'side B image value',
      sideBText: 'side B text value'
    });
  });

});
