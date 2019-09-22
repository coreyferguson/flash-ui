
import CardController from './CardController';
import CardView from './CardView';
import mediaService from '../../media/mediaService';
import React, * as react from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';

describe('CardController', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('no image to load', () => {
    sandbox.stub(react, 'useState').callsFake(() => [undefined,() => {}]);
    sandbox.stub(mediaService, 'getUrl');
    const wrapper = shallow(<CardController card={{ id: 'idValue' }} />);
    expect(wrapper.first(CardView).prop('card').id).to.equal('idValue');
    expect(wrapper.first(CardView).prop('image')).to.be.undefined;
  });

  it('loading image', () => {
    sandbox.stub(react, 'useState').callsFake(() => [undefined,() => {}]);
    sandbox.stub(mediaService, 'getUrl').returns(Promise.resolve());
    const wrapper = shallow(<CardController card={{ id: 'idValue', sideAImageUrl: 'sideAImageUrlValue' }} />);
    expect(wrapper.first(CardView).prop('card').id).to.equal('idValue');
    expect(wrapper.first(CardView).prop('image')).to.be.undefined;
  });

  it('finished loading image', () => {
    sandbox.stub(react, 'useState').callsFake(() => ['imageValue',() => {}]);
    sandbox.stub(mediaService, 'getUrl').returns(Promise.resolve());
    const wrapper = shallow(
      <CardController card={{ id: 'idValue', sideAImageUrl: 'sideAImageUrlValue' }} />
    );
    expect(wrapper.first(CardView).prop('card').id).to.equal('idValue');
    expect(wrapper.first(CardView).prop('image')).to.not.be.undefined;
  });

});

