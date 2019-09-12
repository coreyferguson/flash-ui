
import React from 'react';
import PageContainer from '../PageContainer';
import './LandingViewUnauthenticated.scss';
import Image from './walnut-xlarge-40.jpg';
import Button from '../Button';

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer className='landing-view-unauthenticated-wrapper'>
        <div className='landing-view-unauthenticated'>
          <div className='content'>
            <h1>learn in a flash</h1>
            <h2>learn with flashcards</h2>
            <h2>that learn with you</h2>
            <Button to='/signin'>try it</Button>
          </div>
          <div className='imagery'>
            <img src={Image} alt='' />
            <span>it's good for your <span className='pop'>walnut</span></span>
          </div>
        </div>
      </PageContainer>
    );
  }

}
