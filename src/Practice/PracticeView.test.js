
import React from 'react';
import { expect, shallow, sinon } from '../../test/support/TestUtilities';
import { PracticeView } from './PracticeView';
import Card from '../cards/Card';

describe('PracticeView', () => {

  const newCard = () => ({
    "id": "20190929213514-87b0af58-3726-4f95-a154-056e5c3ec84b",
    "labels": [
      "one",
      "two"
    ],
    "sideAImageUrl": null,
    "sideAText": "front",
    "sideBImageUrl": null,
    "sideBText": "back"
  });

  const newView = props => {
    props = props || {};
    const card = props.card || newCard();
    const onFlip = props.onFlip || sinon.spy();
    const onRemindImmediately = props.onRemindImmediately || sinon.spy();
    const onRemindOften = props.onRemindOften || sinon.spy();
    const onRemindSometimes = props.onRemindSometimes || sinon.spy();
    const onRemindNever = props.onRemindNever || sinon.spy();
    return shallow(
      <PracticeView
        card={card}
        onFlip={onFlip}
        onRemindImmediately={onRemindImmediately}
        onRemindOften={onRemindOften}
        onRemindSometimes={onRemindSometimes}
        onRemindNever={onRemindNever} />
    );
  };

  it('renders card', () => {
    const wrapper = newView();
    expect(wrapper.find(Card)).to.exist;
    expect(wrapper.find(Card).prop('card')).to.eql(newCard());
  });

  it('flip card');

  it('remind me immediately', () => {
    const onRemindImmediately = sinon.spy();
    const wrapper = newView({ onRemindImmediately });
    wrapper.find('.remind-immediately').simulate('click');
    expect(onRemindImmediately).to.be.calledOnce;
  });

  it('remind me often', () => {
    const onRemindOften = sinon.spy();
    const wrapper = newView({ onRemindOften });
    wrapper.find('.remind-often').simulate('click');
    expect(onRemindOften).to.be.calledOnce;
  });

  it('remind me sometimes', () => {
    const onRemindSometimes = sinon.spy();
    const wrapper = newView({ onRemindSometimes });
    wrapper.find('.remind-sometimes').simulate('click');
    expect(onRemindSometimes).to.be.calledOnce;
  });

  it('remind me never', () => {
    const onRemindNever = sinon.spy();
    const wrapper = newView({ onRemindNever });
    wrapper.find('.remind-never').simulate('click');
    expect(onRemindNever).to.be.calledOnce;
  });

});
