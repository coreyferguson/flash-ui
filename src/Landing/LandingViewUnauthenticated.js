
import React from 'react';
import PageContainer from '../PageContainer';

export default class LandingViewUnauthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <div>
          <div className='row'>
            <div className='col'>

              <span className='signin-arrow'><span>Try it!</span><i className='material-icons large'>arrow_upward</i></span>

              <h3 className='header'>What?</h3>
              <p>Study using <strong className='pop'>Flash</strong>, the online flashcards application.</p>

              <h3 className='header'>Why?</h3>
              <p>Because... <strong>Flashcards!</strong> Also...</p>
              <ul className='list'>
                {
                  [
                    'It\'s Free',
                    'In the Cloud',
                    'Adjusts frequency based on your familiarity',
                    'Signing up guarantees entry into heaven',
                    'Mobile friendly'
                  ].map(item => <li><i className='bullet tiny material-icons'>check_circle</i><span>{item}</span></li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

}
