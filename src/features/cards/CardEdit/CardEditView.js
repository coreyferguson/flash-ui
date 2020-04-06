import React from 'react';
import { LabelsStyle, MenuStyle, SidesStyle, SideStyle } from './CardEditStyle';
import CardEditSide from './CardEditSide';
import PropTypes from 'prop-types';
import Button from '@bit/overattribution.growme.button';
import sessionService from '../../../context/authentication/sessionService';
import { useHistory } from 'react-router-dom';
import HotkeyShortcut from '../../shortcuts/Shortcuts/HotkeyShortcut';

export default function CardEditView(props) {
  const sideARef = React.useRef();
  const sideBRef = React.useRef();
  const labelsRef = React.useRef();
  const history = useHistory();
  if (props.isFetchNeeded) {
    props.onFetch(props.id);
    return <h2>loading</h2>;
  }
  const labelsToString = labels => labels ? labels.join(' ') : '';
  const labelsToArray = labels => labels.split(' ');
  const handleDelete = e => {
    if (e) e.preventDefault();
    if (confirm('Are you sure you want to delete this card? This cannot be undone.')) {
      props.onDelete({
        id: props.id,
        userId: sessionService.getSignInUserSession().idToken.payload.sub
      });
      history.goBack();
    }
  };
  const handleSave = e => {
    if (e) e.preventDefault();
    const sideA = sideARef.current.getValues();
    const sideB = sideBRef.current.getValues();
    const labels = labelsRef.current.value;
    props.onSave({
      id: props.id,
      userId: sessionService.getSignInUserSession().idToken.payload.sub,
      lastTestTime: new Date().toISOString(),
      sideAText: sideA.text,
      sideBText: sideB.text,
      labels: labelsToArray(labels)
    });
    window.history.back();
  };
  const handleCancel = e => {
    if (e) e.preventDefault();
    props.onCancel();
  };
  const sideAText = props.card && props.card.sideAText;
  const sideBText = props.card && props.card.sideBText;
  const labels = props.card && props.card.labels;
  return (
    <form onSubmit={handleSave}>
      <HotkeyShortcut combination='ctrl+enter' callback={handleSave} />
      <SidesStyle>
        <SideStyle><CardEditSide ref={sideARef} sideName='A' text={sideAText} /></SideStyle>
        <SideStyle><CardEditSide ref={sideBRef} sideName='B' text={sideBText} /></SideStyle>
      </SidesStyle>
      <LabelsStyle>
        <span>labels</span>
        <input ref={labelsRef} type='text' defaultValue={labelsToString(labels)} className='mousetrap' />
      </LabelsStyle>
      <MenuStyle>
        <Button onClick={handleCancel} data-name='cancel'>cancel</Button>
        <Button onClick={handleDelete} data-name='delete'>delete</Button>
        <Button isCta={true} onClick={handleSave} data-name='save'>save</Button>
      </MenuStyle>
    </form>
  );
}

CardEditView.propTypes = {
  card: PropTypes.object,
  id: PropTypes.string,
  isFetchNeeded: PropTypes.bool,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

CardEditView.defaultProps = {
  isFetchNeeded: true,
  onCancel: () => window.history.back()
};