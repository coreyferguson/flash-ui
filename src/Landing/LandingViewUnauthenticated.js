
import React from 'react';
import PageContainer from '../PageContainer';

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <div>
          <span className='signin-arrow'><span>Try it!</span><i className='material-icons large'>arrow_upward</i></span>

          <h1 className='header'>What?</h1>
          <p>Study using <strong className='pop'>Flash</strong>, the online flashcards application.</p>

          <h1 className='header'>Why?</h1>
          <p>Because... <strong>Flashcards!</strong> Also...</p>
          <ul className='list'>
            {
              [
                'It\'s Free',
                'In the Cloud',
                'Adjusts frequency based on your familiarity',
                'Signing up guarantees entry into heaven',
                'Mobile friendly'
              ].map(item => <li><span>{item}</span></li>)
            }
          </ul>
        </div>
      </PageContainer>
    );
  }

}
