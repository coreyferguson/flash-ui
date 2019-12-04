
import Card from '../../crud/Card';
import React from 'react';
import styled from './PracticeStyle';
import PropTypes from 'prop-types';
import Button from '@bit/overattribution.growme.button';

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
        <Button className='remind-often' onClick={props.onRemindOften}>often</Button>
        <Button className='remind-sometimes' onClick={props.onRemindSometimes}>sometimes</Button>
        <Button className='remind-never' onClick={props.onRemindNever}>never</Button>
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
