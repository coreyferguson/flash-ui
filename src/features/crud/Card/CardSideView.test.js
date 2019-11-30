
import React from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import { CardSideView } from './CardSideView';
import Loading from '../../Loading/InlineLoadingView';

describe('CardSideView', () => {

  it('loading', () => {
    const wrapper = shallow(
      <CardSideView
        text='textValue'
        imageUrl='imageUrlValue'
        side='front'
        onShowFront={sinon.spy()}
        onShowBack={sinon.spy()} />
    );
    expect(wrapper.find('.text')).to.exist;
    expect(wrapper.find(Loading)).to.exist;
    expect(wrapper.find('.image')).to.not.exist;
  });

  it('image available / no longer loading', () => {
    const wrapper = shallow(
      <CardSideView
        text='textValue'
        imageUrl='imageUrlValue'
        image='imageValue'
        side='front'
        onShowFront={sinon.spy()}
        onShowBack={sinon.spy()} />
    );
    expect(wrapper.find('.text')).to.exist;
    expect(wrapper.find(Loading)).to.not.exist;
    expect(wrapper.find('.image')).to.exist;
  });

  it('no text', () => {
    const wrapper = shallow(
      <CardSideView
        imageUrl='imageUrlValue'
        image='imageValue'
        side='front'
        onShowFront={sinon.spy()}
        onShowBack={sinon.spy()} />
    );
    expect(wrapper.find('.text')).to.not.exist;
  });

  it('onShowFront when back is currently shown', () => {
    const onShowBack = sinon.spy();
    const onShowFront = sinon.spy();
    const wrapper = shallow(
      <CardSideView
        imageUrl='imageUrlValue'
        image='imageValue'
        side='front'
        onShowFront={onShowFront}
        onShowBack={onShowBack} />
    );
    wrapper.prop('onClick')(); // click anywhere in card
    expect(onShowFront).to.not.be.called;
    expect(onShowBack).to.be.calledOnce;
  });

  it('onShowBack when front is currently shown', () => {
    const onShowBack = sinon.spy();
    const onShowFront = sinon.spy();
    const wrapper = shallow(
      <CardSideView
        imageUrl='imageUrlValue'
        image='imageValue'
        side='back'
        onShowFront={onShowFront}
        onShowBack={onShowBack} />
    );
    wrapper.prop('onClick')(); // click anywhere in card
    expect(onShowFront).to.be.calledOnce;
    expect(onShowBack).to.not.be.called;
  });

});
