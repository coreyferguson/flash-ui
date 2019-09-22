
import React from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import CardView from './CardView';
import SideView from './CardSideView';

describe('CardView', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('missing card property', () => {
    sandbox.stub(console, 'error');
    const image = 'https://mydomain.com/image.jpg';
    expect(() => shallow(<CardView image={image} />)).to.throw('invalid prop types');
  });

  it('translates properties to CardSideView', () => {
    const card = {
      id: 'idValue',
      sideAText: 'sideATextValue',
      sideAImageUrl: 'sideAImageUrlValue'
    };
    const image = 'https://mydomain.com/image.jpg';
    const wrapper = shallow(<CardView card={card} image={image} />);
    const sideView = wrapper.find(SideView);
    expect(sideView, 'expected SideView to exist').to.exist;
    expect(sideView.get(0).props.text).to.equal('sideATextValue');
    expect(sideView.get(0).props.imageUrl).to.equal('sideAImageUrlValue');
    expect(sideView.get(0).props.image).to.equal('https://mydomain.com/image.jpg');
  });

});
