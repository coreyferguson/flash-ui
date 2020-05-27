
import React from 'react';
import TextAndHeroPage from '@bit/overattribution.growme.text-and-hero-page';
import Button from '@bit/overattribution.growme.button';
import { Link } from 'react-router-dom';
import config from 'appConfig';
import Navigation from '../Navigation';

const imageUrl = `${config.assets.domain}/walnut-xlarge-40.jpg`;

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <TextAndHeroPage
        navigation={<Navigation showLogo={false} />}
        main={
          <React.Fragment>
            <h1>learn in a flash</h1>
            <h2>learn with flashcards</h2>
            <h2>that learn with you</h2>
            <Button component={<Link className='button' to='/signin' style={{ width: '200px', marginTop: '50px' }}>try it</Link>} />
          </React.Fragment>
        }
        imageSource={imageUrl}
        imageCaption={<p>it's good for your <span className='pop'>walnut</span></p>}
      />
    );
  }

}
