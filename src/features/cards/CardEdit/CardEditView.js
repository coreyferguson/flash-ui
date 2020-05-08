import React from 'react';
import Style from './CardEditStyle';
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
  const labelsToString = labels => labels ? labels.join(' ').trim() : '';
  const labelsToArray = labels => labels.trim().split(' ');
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
      card: {
        id: props.id,
        userId: sessionService.getSignInUserSession().idToken.payload.sub,
        lastTestTime: new Date().toISOString(),
        sideAText: sideA.text,
        sideAImageUrl: sideA.imageUrl,
        sideBText: sideB.text,
        sideBImageUrl: sideB.imageUrl,
        labels: labelsToArray(labels)
      },
      cardImages: [ sideA.imageFile, sideB.imageFile ]
    });
    window.history.back();
  };
  const handleCancel = e => {
    if (e) e.preventDefault();
    const sideA = sideARef.current.getValues();
    const sideB = sideBRef.current.getValues();
    const propsCard = props.card || {};
    const hasChanged =
      ((sideA.text || "") !== (propsCard.sideAText || "")) ||
      ((sideB.text || "") !== (propsCard.sideBText || "")) ||
      ((sideA.imageUrl || "") !== (propsCard.sideAImageUrl || "")) ||
      (sideA.imageFile) ||
      ((sideB.imageUrl || "") !== (propsCard.sideBImageUrl || "")) ||
      (sideB.imageFile) ||
      ((labelsRef.current.value || "") !== labelsToString(propsCard.labels));
    if (!hasChanged) props.onCancel();
    else if (confirm('Your work will be lost if you cancel without saving. Are you sure?')) props.onCancel();
  };
  const sideAText = props.card && props.card.sideAText;
  const sideAImageIsLoading = props.cardImages && props.cardImages.A.isLoading;
  const sideAImageSource = props.cardImages && props.cardImages.A.source;
  const sideAImageUrl = props.card && props.card.sideAImageUrl;
  const sideBText = props.card && props.card.sideBText;
  const sideBImageIsLoading = props.cardImages && props.cardImages.B.isLoading;
  const sideBImageSource = props.cardImages && props.cardImages.B.source;
  const sideBImageUrl = props.card && props.card.sideBImageUrl;
  const labels = props.card && props.card.labels;
  const handleFetchImage = (side, imageUrl) => props.onFetchImage(props.id, side, imageUrl);
  return (
    <Style>
      <form onSubmit={handleSave}>
        <HotkeyShortcut combination='ctrl+enter' callback={handleSave} />
        <HotkeyShortcut combination='escape' callback={handleCancel} />
        <div className='sides'>
          <div className='side'>
            <CardEditSide
                key={sideAImageSource}
                focusOnMount={true}
                imageSource={sideAImageSource}
                imageUrl={sideAImageUrl}
                isImageLoading={sideAImageIsLoading}
                onFetchImage={handleFetchImage}
                ref={sideARef}
                sideName='A'
                text={sideAText} />
          </div>
          <div className='side'>
            <CardEditSide
                key={sideBImageSource}
                focusOnMount={false}
                imageSource={sideBImageSource}
                imageUrl={sideBImageUrl}
                isImageLoading={sideBImageIsLoading}
                onFetchImage={handleFetchImage}
                ref={sideBRef}
                sideName='B'
                text={sideBText} />
          </div>
        </div>
        <div className='labels'>
          <span>labels</span>
          <input ref={labelsRef} type='text' defaultValue={labelsToString(labels)} className='mousetrap' />
        </div>
        <menu className='controls'>
          <Button className='control' onClick={handleCancel} data-name='cancel'>cancel</Button>
          <Button className='control' onClick={handleDelete} data-name='delete'>delete</Button>
          <Button className='control' isCta={true} onClick={handleSave} data-name='save'>save</Button>
        </menu>
      </form>
    </Style>
  );
}

CardEditView.propTypes = {
  card: PropTypes.object,
  cardImages: PropTypes.object,
  id: PropTypes.string,
  isFetchNeeded: PropTypes.bool,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onFetchImage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

CardEditView.defaultProps = {
  isFetchNeeded: true,
  onCancel: () => window.history.back()
};