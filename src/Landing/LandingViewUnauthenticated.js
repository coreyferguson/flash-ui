
import React from 'react';
import PageContainer from '../PageContainer';
import './LandingViewUnauthenticated.scss';
import Image from './walnut-xlarge-40.jpg';
import { Link } from 'react-router-dom';

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer flex={true}>
        <div className='landing-view-unauthenticated'>
          <div className='content'>
            <h1>learn in a flash</h1>
            <h2>learn with flashcards</h2>
            <h2>that learn with you</h2>
            <Link className='button' to='/signin'>try it</Link>
          </div>
          <div className='imagery'>
            <img src={Image} alt='' />
            <p>it's good for your <span className='pop'>walnut</span></p>
          </div>
        </div>
      </PageContainer>
    );
  }

}
