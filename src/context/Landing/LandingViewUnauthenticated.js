
import React from 'react';
import Button from '@bit/overattribution.growme.button';
import { Link } from 'react-router-dom';
import config from 'appConfig';
import Style from './LandingViewUnauthenticatedStyle';
import Navigation from '../Navigation';

const imageUrl = `${config.assets.domain}/walnut-xlarge-40.jpg`;

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <Style>
        <Navigation showLogo={false} />
        <div className='landing-view-unauthenticated'>
          <div className='content'>
            <h1>learn in a flash</h1>
            <h2>learn with flashcards</h2>
            <h2>that learn with you</h2>
            <Button component={<Link to='/signin'>try it</Link>} className='button' />
          </div>
          <div className='imagery'>
            <img src={imageUrl} alt='' />
            <span>it's good for your <span className='pop'>walnut</span></span>
          </div>
        </div>
      </Style>
    );
  }

}
