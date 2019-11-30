
import CardController from './CardController';
import CardView from './CardSideView';
import mediaService from '../../media/mediaService';
import React, * as react from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';

describe('CardController', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('no image to load', () => {
    const stub = sandbox.stub(react, 'useState');
    stub.onCall(0).returns([ 'front', () => {} ]);
    stub.onCall(1).returns([ {}, () => {} ]);
    sandbox.stub(mediaService, 'getUrl');
    const wrapper = shallow(<CardController card={{ id: 'idValue' }} />);
    expect(wrapper.first(CardView).prop('id')).to.equal('idValue');
    expect(wrapper.first(CardView).prop('imageUrl')).to.be.undefined;
    expect(wrapper.first(CardView).prop('image')).to.be.undefined;
  });

  it('loading image', () => {
    const stub = sandbox.stub(react, 'useState');
    stub.onCall(0).returns([ 'front', () => {} ]);
    stub.onCall(1).returns([ {}, () => {} ]);
    sandbox.stub(mediaService, 'getUrl').returns(Promise.resolve());
    const wrapper = shallow(<CardController card={{ id: 'idValue', sideAImageUrl: 'sideAImageUrlValue' }} />);
    expect(wrapper.first(CardView).prop('id')).to.equal('idValue');
    expect(wrapper.first(CardView).prop('imageUrl')).to.not.be.undefined;
    expect(wrapper.first(CardView).prop('image')).to.be.undefined;
  });

  it('finished loading image', () => {
    const stub = sandbox.stub(react, 'useState');
    stub.onCall(0).returns([ 'front', () => {} ]);
    stub.onCall(1).returns([ { sideA: 'sideAImageHref' }, () => {} ]);
    sandbox.stub(mediaService, 'getUrl').returns(Promise.resolve());
    const wrapper = shallow(<CardController card={{ id: 'idValue', sideAImageUrl: 'sideAImageUrlValue' }} />);
    expect(wrapper.first(CardView).prop('id')).to.equal('idValue');
    expect(wrapper.first(CardView).prop('imageUrl')).to.equal('sideAImageUrlValue');
    expect(wrapper.first(CardView).prop('image')).to.equal('sideAImageHref');
  });

});

