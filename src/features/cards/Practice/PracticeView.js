import React from 'react';
import PropTypes from 'prop-types';
import CardView from '../CardView';
import Style from './PracticeStyle';
import Button from '@bit/overattribution.growme.button';

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
  return <h1>loading</h1>;
}

function showPracticeCardsCreationNotPossible(props) {
  if (props.isCreationOfPracticeCardsPossible) return;
  if (props.isLoading) return;
  return <h1>practice cards could not be created</h1>;
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
