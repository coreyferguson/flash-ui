import React from 'react';
import PropTypes from 'prop-types';
import CardView from '../CardView';
import Style from './PracticeStyle';
import Button from '@bit/overattribution.growme.button';
import LoadingPage from '@bit/overattribution.growme.loading-page';

export default function PracticeView(props) {
  React.useEffect(() => {
    if (!props.cardId) props.onLoad();
  }, [props.cardId]);
  return (
    <div>
      {showLoading(props)}
      {showPracticeCardsCreationNotPossible(props)}
      {showPracticeView(props)}
    </div>
  );
}

function showLoading(props) {
  if (!props.isLoading) return;
  return <LoadingPage style={{ height: '100%' }} />;
}

function showPracticeCardsCreationNotPossible(props) {
  if (props.isCreationOfPracticeCardsPossible) return;
  if (props.isLoading) return;
  return (
    <React.Fragment>
      <h1>uh oh</h1>
      <h2>practice deck could not be created</h2>
      <p>This may because you have chosen to "never" be reminded on all your cards.</p>
      <p>Set frequency labels on those cards you'd like to practice again.</p>
      <p>frequency labels</p>
      <ul>
        <li>frequency-often</li>
        <li>frequency-sometimes</li>
      </ul>
    </React.Fragment>
  );
}

function showPracticeView(props) {
  if (props.isLoading) return;
  if (!props.isCreationOfPracticeCardsPossible) return;
  if (!props.cardId) return;
  return (
    <Style>
      <div className='card-container'>
        <CardView id={props.cardId} />
      </div>
      <div className='controls'>
        <span>remind me</span>
        <Button className='control' onClick={() => props.onRemindImmediately(props.cardId)}>immediately</Button>
        <Button className='control' onClick={() => props.onRemindOften(props.cardId)}>often</Button>
        <Button className='control' onClick={() => props.onRemindSometimes(props.cardId)}>sometimes</Button>
        <Button className='control' onClick={() => props.onRemindNever(props.cardId)}>never</Button>
      </div>
    </Style>
  );
}

PracticeView.propTypes = {
  cardId: PropTypes.string,
  isLoading: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  onRemindImmediately: PropTypes.func.isRequired,
  onRemindOften: PropTypes.func.isRequired,
  onRemindSometimes: PropTypes.func.isRequired,
  onRemindNever: PropTypes.func.isRequired,
};
