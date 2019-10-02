
import { useMemo, useState } from 'react';
import EditCardView from './EditCardView';
import ErrorMessage from '../../ErrorMessage';
import Interim from '../../Interim';
import mediaService from '../../media/mediaService';
import PageContainer from '../../PageContainer';
import PropTypes from 'prop-types';
import useCardDeleter from '../graphql/useCardDeleter';
import useCardFetcher from '../graphql/useCardFetcher';
import useCardSaver from '../graphql/useCardSaver';
import useImageFetcher from '../../media/useImageFetcher';
import sessionService from '../../authentication/sessionService';

export default function EditCardController({ cardId, redirectAfterSave }) {
  redirectAfterSave = redirectAfterSave || (() => window.history.back());

  const isUpdatingCard = !!cardId;
  const isCreatingCard = !cardId;
  const userId = sessionService.getSignInUserSession().idToken.payload.sub;

  // card state
  const [ sideAImageUrl, setSideAImageUrl ] = useState();
  const [ sideAText, setSideAText ] = useState();
  const [ sideBImageUrl, setSideBImageUrl ] = useState();
  const [ sideBText, setSideBText ] = useState();
  const [ labels, setLabels ] = useState();

  // card CRUD hooks
  const getCardState = useCardFetcher({ cardId, skip: isCreatingCard });
  const [ saveCard, saveCardState ] = useCardSaver(isCreatingCard);
  const [ deleteCard, deleteCardState ] = useCardDeleter();

  const card = getCardState.data ? getCardState.data.me.card : {};

  // set default values in state
  useMemo(() => setSideAImageUrl(card.sideAImageUrl), [card.sideAImageUrl]);
  useMemo(() => setSideAText(card.sideAText), [card.sideAText]);
  useMemo(() => setSideBImageUrl(card.sideBImageUrl), [card.sideBImageUrl]);
  useMemo(() => setSideBText(card.sideBText), [card.sideBText]);
  useMemo(() => setLabels(card.labels), [card.labels]);
  const finishedSaving = saveCardState.called && !saveCardState.loading && !saveCardState.error;
  const finishedDelete = deleteCardState.called && !deleteCardState.loading && !deleteCardState.error;
  useMemo(() => {
    if (finishedSaving || finishedDelete) redirectAfterSave()
  }, [ finishedSaving, finishedDelete ]);

  // images
  const [ sideAImage, setSideAImage ] = useImageFetcher(sideAImageUrl);
  const [ sideAImageLoading, setSideAImageLoading ] = useState();
  const [ sideBImage, setSideBImage ] = useImageFetcher(sideBImageUrl);
  const [ sideBImageLoading, setSideBImageLoading ] = useState();

  if (saveCardState.loading || getCardState.loading || deleteCardState.loading)
    return <Interim />

  // redirect after successful save or delete
  if (finishedSaving || finishedDelete) return <Interim />;

  function handleCancel() {
    redirectAfterSave();
    return <Interim />;
  }

  function handleDelete() {
    const card = { userId, id: cardId };
    if (window.confirm('This operation cannot be undone. Are you sure you want to delete?')) {
      deleteCard({ variables: card });
    }
  }

  function handleLabelsChange(labels) {
    setLabels(labels);
  }

  const handleSave = () => {
    const card = {
      id: cardId,
      userId,
      labels: labels.filter(label => label !== ''),
      sideAText,
      sideAImageUrl,
      sideBText,
      sideBImageUrl
    };
    saveCard({ variables: card });
  }

  function handleImageChange(file, setImageUrl, setImage, setImageLoading) {
    if (!file) {
      setImageUrl();
      setImage();
      return;
    }
    setImageLoading(true);
    // show image immediately in current view
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
    // save the image
    mediaService.upload(file).then(newImageUrl => {
      setImageUrl(newImageUrl);
      setImageLoading(false);
    });
  }

  function handleSideAImageChange(file) {
    return handleImageChange(file, setSideAImageUrl, setSideAImage, setSideAImageLoading);
  }

  function handleSideATextChange(text) {
    setSideAText(text);
  }

  function handleSideBImageChange(file) {
    return handleImageChange(file, setSideBImageUrl, setSideBImage, setSideBImageLoading);
  }

  function handleSideBTextChange(text) {
    setSideBText(text);
  }

  return (
    <React.Fragment>
      {saveCardState.error && <ErrorMessage>
        <h2>Unknown error when saving card. Please try again.</h2>
        <h3>{saveCardState.error.message}</h3>
      </ErrorMessage> }
      {getCardState.error && <ErrorMessage>
        <h2>Unknown error when retrieving cards. Please try again.</h2>
        <h3>{getCardState.error.message}</h3>
      </ErrorMessage> }
      { saveCardState.loading && <Interim />}
      { getCardState.loading && <Interim />}
      {
        !saveCardState.loading && !getCardState.loading &&
        <PageContainer>
          <EditCardView
            isUpdating={isUpdatingCard}
            labels={labels}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onLabelsChange={handleLabelsChange}
            onSave={handleSave}
            onSideAImageChange={handleSideAImageChange}
            onSideATextChange={handleSideATextChange}
            onSideBImageChange={handleSideBImageChange}
            onSideBTextChange={handleSideBTextChange}
            sideAImage={sideAImage}
            sideAImageLoading={sideAImageLoading}
            sideAText={sideAText}
            sideBImage={sideBImage}
            sideBImageLoading={sideBImageLoading}
            sideBText={sideBText} />
        </PageContainer>
      }
    </React.Fragment>
  );
}

EditCardController.propTypes = {
  cardId: PropTypes.string,
  redirectAfterSave: PropTypes.func
};
