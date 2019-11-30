
import Card from '../../crud/Card';
import React from 'react';
import styled from './PracticeStyle';
import PropTypes from 'prop-types';

export function PracticeView(props) {
  const className = props.className || '';
  return (
    <div className={className}>
      <section className='card'>
        <Card card={props.card} />
      </section>
      <section className='controls'>
        <span>remind me</span>
        {
          props.canHandleImmediately &&
          <button className='remind-immediately' onClick={props.onRemindImmediately}>immediately</button>
        }
        <button className='remind-often' onClick={props.onRemindOften}>often</button>
        <button className='remind-sometimes' onClick={props.onRemindSometimes}>sometimes</button>
        <button className='remind-never' onClick={props.onRemindNever}>never</button>
      </section>
    </div>
  );
}

PracticeView.propTypes = {
  canHandleImmediately: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onRemindImmediately: PropTypes.func.isRequired,
  onRemindOften: PropTypes.func.isRequired,
  onRemindSometimes: PropTypes.func.isRequired,
  onRemindNever: PropTypes.func.isRequired,
}

export default styled(PracticeView);
