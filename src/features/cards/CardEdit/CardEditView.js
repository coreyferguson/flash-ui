import React from 'react';
import { LabelsStyle, MenuStyle, SidesStyle, SideStyle } from './CardEditStyle';
import CardEditSide from './CardEditSide';
import PropTypes from 'prop-types';
import Button from '@bit/overattribution.growme.button';

export default function CardEditView(props) {
  const sideARef = React.useRef();
  const sideBRef = React.useRef();
  const labelsRef = React.useRef();
  if (props.isFetchNeeded) {
    props.onFetch(props.id);
    return <h2>loading</h2>;
  }
  const labelsToString = labels => labels ? labels.join(' ') : '';
  const labelsToArray = labels => labels.split(' ');
  const handleSave = e => {
    e.preventDefault();
    const sideA = sideARef.current.getValues();
    const sideB = sideBRef.current.getValues();
    const labels = labelsRef.current.value;
    props.onSave({
      id: props.id,
      lastTestTime: new Date().toISOString(),
      sideAText: sideA.text,
      sideBText: sideB.text,
      labels: labelsToArray(labels)
    });
  };
  return (
    <form onSubmit={handleSave}>
      <SidesStyle>
        <SideStyle><CardEditSide ref={sideARef} sideName='A' text={props.item.sideAText} /></SideStyle>
        <SideStyle><CardEditSide ref={sideBRef} sideName='B' text={props.item.sideBText} /></SideStyle>
      </SidesStyle>
      <LabelsStyle>
        <span>labels</span>
        <input ref={labelsRef} type='text' defaultValue={labelsToString(props.labels)} className='mousetrap' />
      </LabelsStyle>
      <MenuStyle>
        <Button>cancel</Button>
        <Button isCta={true} onClick={handleSave}>save</Button>
      </MenuStyle>
    </form>
  );
}

CardEditView.propTypes = {
  isFetchNeeded: PropTypes.bool,
  onFetch: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

CardEditView.defaultProps = {
  isFetchNeeded: false
};